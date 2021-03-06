const bcrypt = require('bcryptjs')

module.exports = {
    
    register: async (req, res) => {
        
        try{
            
            let { email, password } = req.body
            const { session } = req
            const db = req.app.get('db')
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
    
                email = email.toLowerCase()
        
                let found = await db.login({email})
                found = found[0]
    
            if(found){
                res.sendStatus(418)
            }
                let newUser = await db.register({ email, password: hash })
                newUser = newUser[0]
        
                session.user = { ...newUser } 
                res.status(201).send(session.user)
        } 
        catch(err){
            console.log(err)
        }      
    },
    login: async (req, res) => {

        try{
            
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
                console.log('Logged in!')
                res.status(200).send(session.user)
            } else {
                res.status(401).send('Unauthorized')
            }

        }
        catch(err){
            console.log(err)
        }
    },
    logout: (req, res) => {
        try{
            
            req.session.destroy();
            res.sendStatus(200)
        }
        catch(err){
            console.log(err)
        }
    },

    getUser: (req, res) => {
        try{
            const { user } = req.session 
            
            if (user) {
                res.status(200).send(user)
            } else {
                res.sendStatus(401);
            }
        }
        catch(err){
            console.log(err)
        }
    }
}