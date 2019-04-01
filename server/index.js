const express = require('express')
const sessions = require('express-session')
require('dotenv').config()
const massive = require('massive')
const OpenTok = require('opentok')
const authc = require('./controllers/AuthController')
const ctrlm = require('./controllers/MerchantController')
const streamc= require('./controllers/StreamController.js')
const MoltinGateway = require('@moltin/sdk').gateway
const Twilio = require('twilio')
const chance = new require('chance')()
const { OT_API_KEY, OT_API_SECRET, DB_CONNECTION, SERVER_PORT, SESSION_SECRET, CLIENT_ID, CLIENT_SECRET, TWILIO_CHAT_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET } = process.env

const Moltin = MoltinGateway({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
})

const AccessToken = Twilio.jwt.AccessToken
const ChatGrant = AccessToken.ChatGrant

const app = express()

//initializing socket 

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

var http = require('http').Server(app);

//Setting up sessions / middleware

app.use(
    sessions({
        secret: SESSION_SECRET, 
        resave: false,
        saveUninitialized: false,
        maxAge: null
    })
);

app.use(express.json())
const opentok = new OpenTok(OT_API_KEY, OT_API_SECRET) 


massive(DB_CONNECTION).then(db => {
    app.set('db', db)
    http.listen(SERVER_PORT, () => console.log(`The ship is sailing from port ${SERVER_PORT}`))
})


//moltin
app.get('/products', (req, res) => {
    Moltin.Products.All()
    .then(products => {
        res.status(200).send(products)
    })
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    Moltin.Products.Get(id)
    .then(product => {
        res.status(200).send(product)
    })
})

app.post('/products', (req, res) => {
    const { name, slug, sku, description, amount } = req.body
    const product = {
        name: name, //string
        slug: slug, //string
        sku: sku, //string
        description: description, //string
        manage_stock: true,
        price: [
          {
            amount: amount, //integer
            currency: 'USD',
            includes_tax: true
          }
        ],
        status: 'live',
        commodity_type: 'physical'
      }
      
      Moltin.Products.Create(product)
      .then(product => {
        res.status(200).send(product)
      })
})




//opentok
app.get('/createSession', (req, res) => {
    opentok.createSession({mediaMode:"routed"}, function(error, session) {
    if (error) {
        console.log("Error creating session:", error)
    } else {
        console.log(session)
        const sessionId = session.sessionId;
        res.status(200).send(sessionId);
    }
    });
})

app.get('/generateToken/:sid', (req, res) => {
    const sessionId = req.params.sid
    const token = opentok.generateToken(sessionId)
    console.log(token)
    res.status(200).send(token)
})

app.get('/startPublish', (req, res) => {
    opentok.createSession({mediaMode:"routed"}, function(error, session) {
        if (error) {
            console.log("Error creating session:", error)
        } else {
            console.log(session)
            const sessionId = session.sessionId;
            const token = opentok.generateToken(sessionId)
            const apiKey = OT_API_KEY
            res.status(200).send({apiKey, sessionId, token});
        }
        });
})

app.get('/getKey', (req, res) => {
    res.status(200).send(OT_API_KEY)
})

app.get('/startBroadcast/:sid', (req, res) => {
    const sessionId = req.params.sid
    const broadcastOptions = {
        outputs: {
            hls: {},
            rtmp: [
                {
                    id: 'Facebook',
                    serverUrl: 'rtmp://live-api-s.facebook.com:80/rtmp/',
                    streamName: '10219365127618398?s_ps=1&s_sw=0&s_vt=api-s&a=AbyTQYUbsuYUhy66'
                },
                {
                    id: 'Youtube',
                    serverUrl: 'rtmp://a.rtmp.youtube.com/live2',
                    streamName: '5x7r-sv7j-qjyb-2cc6'
                }
            ]
        },
        maxDuration: 120,
        resolution: '1280x720'
    }
    opentok.startBroadcast(sessionId, broadcastOptions, (error, broadcast) => {
        if (error) {
            console.log('Error starting broadcast', error)
            res.status(500).send('There was an error')
        } else {
            app.set('broadcastID', broadcast.id)
            console.log('broadcast object from startBroadcast', broadcast)
            res.json(broadcast)
        }
    })
})

app.get('/stopBroadcast', (req, res) => {
    const broadcastID = app.get('broadcastID')
    opentok.stopBroadcast(broadcastID, (error, broadcast) => {
        if (error) {
            console.log('Error stopping broadcast', error)
            res.status(500).send('There was an error stopping the broadcast')
        } else {
            app.set('broadcastID', null)
            console.log('broadcast object from stopBroadcast', broadcast)

            res.json(broadcast)
        }
    })
})

app.post('/startArchive', (req, res) => {
    const { sessionId, resolution, outputMode } = req.body
    opentok.startArchive(sessionId, {resolution, outputMode}, (error, archive) => {
        if(error){
            return res.status(400).send('there was an error starting the archive')
        } else {
            console.log('start archive', archive)
            res.json(archive)
        }
    })
})

app.put('/saveArchive', streamc.saveArchive)
app.put('/updateStreamStatus', streamc.updateStreamStatus)

app.get('/stopArchive', (req, res) => {
    const { archiveId } = req.query;
    opentok.stopArchive(archiveId, (error, archive) => {
        if(error){
            return res.status(400).send('there was an error stopping the archive')
        } else {
            console.log('stop archive', archive)
            res.json(archive)
        }
    })
})


app.post('/user/register', authc.register) 
app.post('/user/login', authc.login)
app.post('/user/logout', authc.logout)
app.get('/user/fetchuser', authc.getUser)

//Adding Merchants 
app.post('/admin/register', ctrlm.addMerchant)

//Creating Stream
app.post('/admin/newStream', streamc.createStream)
app.get('/homeStreams', streamc.getHomeStreams)

//moltin
app.get('/products', (req, res) => {
    Moltin.Products.All()
    .then(products => {
        res.status(200).send(products)
    })
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    Moltin.Products.Get(id)
    .then(product => {
        res.status(200).send(product)
    })
})

app.post('/products', (req, res) => {
    const { name, slug, sku, description, amount } = req.body
    const product = {
        name: name, //string
        slug: slug, //string
        sku: sku, //string
        description: description, //string
        manage_stock: true,
        price: [
          {
            amount: amount, //integer
            currency: 'USD',
            includes_tax: true
          }
        ],
        status: 'live',
        commodity_type: 'physical'
      }
      
      Moltin.Products.Create(product)
      .then(product => {
        res.status(200).send(product)
      })
})
//Twilio Chat
app.get('/token', function (req, res) {
    const token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET,
    )

    token.identity = chance.name()
    token.addGrant(new ChatGrant({
        serviceSid: TWILIO_CHAT_SERVICE_SID
    }))

    res.send({
        identity: token.identity,
        jwt: token.toJwt()
    })
})
