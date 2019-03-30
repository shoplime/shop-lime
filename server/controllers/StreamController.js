module.exports = {
    createStream: async (req, res) => {
        const db = req.app.get('db');
        
        const {name, session_id, product_id, hls} = req.body;
        console.log("req", req.body)
        db.stream.create_stream({name, session_id, product_id, hls})
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(console.log(err)))
        
    },
    addProduct: async (req, res) => {
        const db = req.app.get('db');
        const {merchant_name} = req.body;
        db.merchant.add_merchant([merchant_name])
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send('Error adding merchant'))
    },
    getLivestream: async (req, res) => {
        const db = req.app.get('db')
        db.stream.get_livestream()
        .then((stream) => res.status(200).send(stream))
        .catch((err) => res.status(500).send(err))
    }
    
}