let auth = require('../controllers/auth');

function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    } else {
        resp.status(400);
        resp.send('Não autorizado');
    }
}

module.exports = checkAuth;