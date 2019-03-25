module.exports = {
    addMerchant: async (req, res) => {
        const db = req.app.get('db');
        const {merchant_name} = req.body;
        db.merchant.add_merchant([merchant_name])
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send('Error adding merchant'))
    },
    
}