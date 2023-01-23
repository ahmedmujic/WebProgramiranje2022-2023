const { Users } = require('../models')
const { Roles } = require('../models')
const { verify } = require('jsonwebtoken');


exports.adminMiddleware = async (req, res, next) => {
    const token = req.header('access-token').split('Bearer ')[1];

    if (!token) return res.status(401).json();

    try {
        var payload = await verify(token, process.env.SECRET);
        let user = await Users.findOne({ where: { id: payload.id } })
        let role = await Roles.findOne({ where: { id: user.roleId } })
        if( role.name == "ADMIN"){
            next()
        }else{
            res.status(401).json();
        }
    } catch (err) {
        return res.status(401).json();
    }
}