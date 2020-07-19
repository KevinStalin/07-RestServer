//===================================
//Verificar Token
//===================================

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    res.json({
        token
    });
}


module.exports = {
    verificaToken
}