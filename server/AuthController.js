const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        let { email, password } = req.body
        const { session } = req
        const db = req.app.get('db')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const validate = (email) => {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return expression.test(String(email).toLowerCase())
        }
        console.log(validate(email))

        if(!validate(email)){
            res.status(500).send(errormsg1)
        }

        email = email.toLowerCase()

        let found = await db.login({email})
        found = found[0]

        if(found){
            res.status(418).send(errormsg2)
        }else{
            let newUser = await db.register({ email, password: hash })
            newUser = newUser[0]
    
            session.user = { ...newUser } 
            res.status(201).send(session.user)
            console.log('Session User', session.user)
        }  
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const { session } = req

        let user = await db.login({ email })
        user = user[0]

        if (!user) {
            res.status(418).send('No user found!')  
        }

        let foundUser = bcrypt.compareSync(password, user.password)

        if (foundUser) {
            delete user.password
            session.user = user
            res.status(200).send(session.user)
            console.log('Logged in!')
            
        } else {
            res.status(401).send('Unauthorized')
        }
    },
    logout: () => {
        req.session.destroy();
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        const { user } = req.session
        
        if (user) {
            res.status(200).send(user)
        } else {
            res.sendStatus(401);
        }
    }


}