const UserModel = require('../Model/UserModel')
const jwt=require("jsonwebtoken")

const key = process.env.SECRETKEY


exports.auth = async (req, res, next) => {
    const istoken = req?.body?.token || req?.query?.token || req?.headers["authorization"]
    
    if (!istoken) {
        return res.status(409).json({ message: 'Unauthorized token not found' })
    }
    try {
    
        const decode = jwt.verify(istoken, key)
        const user = await UserModel.findOne({ _id: decode.id })
        req.user = user
        next()
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

exports.roleAuthorized = async (req, res, next) => {
    const { role } = req.user
    if (role === "admin") {
        next()
    } else {
        res.status(409).json({ message: 'You are not unauthorized' })
    }

}