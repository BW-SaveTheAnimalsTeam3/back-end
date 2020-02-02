const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js')



module.exports = function restricted(req, res, next){
    const { username, password } = req.headers;

    if(username && password) {
        Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } else {
        res.status(400).json({message: 'Please provide valid credentials'})
    }   
};