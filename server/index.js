const express = require('express')
require('dotenv').config()
const massive = require('massive')
const { OT_API_KEY, OT_API_SECRET, DB_CONNECTION, SERVER_PORT } = process.env
const OpenTok = require('opentok')

const app = express();
app.use(express.json())
const opentok = new OpenTok(OT_API_KEY, OT_API_SECRET)

massive(DB_CONNECTION).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`The ship is sailing from port ${SERVER_PORT}`))
})

//Broadcast Object Sent Back after Start Broadcast
// Broadcast {
//     id: 'ae36ba45-a029-4d63-bfc6-64462fcde157',
//     sessionId:
//      '2_MX40NjI4NjMwMn5-MTU1Mjk0MTc3MTU2NH4yZFhxWitaUWIxRW9CMi90SnR6U0t6V05-fg',
//     projectId: 46286302,
//     createdAt: 1552943802923,
//     broadcastUrls:
//      { rtmp: [ [Object] ],
//        hls:
//         'https://cdn-broadcast002-pdx.tokbox.com/15449/15449_ae36ba45-a029-4d63-bfc6-64462fcde157.smil/playlist.m3u8' },
//     updatedAt: 1552943803299,
//     status: 'started',
//     maxDuration: 600,
//     resolution: '1280x720',
//     stop: [Function] }

//Broadcast Object Sent Back after Stop Broadcast
// Broadcast {
//     id: 'fe837e82-9fe3-4a1d-bb80-d94cba7fde8d',
//     sessionId:
//      '2_MX40NjI4NjMwMn5-MTU1Mjk0MTc3MTU2NH4yZFhxWitaUWIxRW9CMi90SnR6U0t6V05-fg',
//     projectId: 46286302,
//     createdAt: 1552944802470,
//     broadcastUrls: null,
//     updatedAt: 1552944802470,
//     status: 'stopped',
//     maxDuration: 600,
//     resolution: '1280x720',
//     stop: [Function] }

//note opentok broadcast function does not like rtmps url

app.get('/startBroadcast', (req, res) => {
    const sessionId = '2_MX40NjI4NjMwMn5-MTU1Mjk0MTc3MTU2NH4yZFhxWitaUWIxRW9CMi90SnR6U0t6V05-fg'
    const broadcastOptions = {
        outputs: {
            hls: {},
            rtmp: [
                {
                    id: 'Facebook',
                    serverUrl: 'rtmp://live-api-s.facebook.com:80/rtmp/',
                    streamName: '312029836036601?s_ps=1&s_sw=0&s_vt=api-s&a=AbyJ8Q7RZsS7thbL'
                }
                // {
                //     id: 'Youtube',
                //     serverUrl: '',
                //     streamName: ''
                // }
            ]
        },
        maxDuration: 600,
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
            res.status(500).send('There was an error')
        } else {
            app.set('broadcastID', null)
            console.log('broadcast object from stopBroadcast', broadcast)
            res.json(broadcast)
        }
    })
})