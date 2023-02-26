const jwt = require('jsonwebtoken')

module.exports.ensureToken = function(req, res, next) {
    let bearerHeader = req.headers["authorization"];

    if(typeof(bearerHeader) !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, "secretkey", (err, resul) => {
            if(err) { res.sendStatus(403) }
            else { next() }
        })
    }

    else {
        res.sendStatus(403)
    }
}

module.exports.generateToken = function (username, email) {
    return jwt.sign(
        {
            username: username,
            email: email
        },
        "secretkey"
    )
}