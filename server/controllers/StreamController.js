module.exports = {
    createStream: async (req, res) => {
        const db = req.app.get('db');
        const {name} = req.body;
        db.stream.create_stream({name})
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(console.log(err)))
        
    },
    
}