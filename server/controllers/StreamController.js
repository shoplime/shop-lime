module.exports = {
    createStream: async (req, res) => {
        const db = req.app.get('db');
        const {name, session_id, product_id, hls, broadcast_id, status, created_at, url} = req.body;
        console.log("test", url)
        db.stream.create_stream({name, session_id, product_id, hls, broadcast_id, status, created_at, url})
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
    getHomeStreams: async (req, res) => {
        const db = req.app.get('db')
        db.stream.get_home_streams()
        .then((streams) => res.status(200).send(streams))
        .catch((err) => res.status(500).send(err))
    },
    saveArchive: async (req, res) => {
        const db = req.app.get('db')
        const {session_id, archive_id} = req.body
        db.stream.save_archive({session_id, archive_id})
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err))
    },
    updateStreamStatus: async (req, res) => {
        const db = req.app.get('db')
        const {session_id, status} = req.body
        db.stream.update_stream_status({session_id, status})
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err))

    }
    
}