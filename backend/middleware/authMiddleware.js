const jwt = require('jsonwebtoken');
const authMiddleware = (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split('')[1];
            const decoded = jwt.verifiy(token , process.env.JWT_SECRET);
            req.user = decoded.id;
            next();
        } catch(error){
            res.status(401).json({message : "Not authorized", token : error.message});
        }
    }
}

module.exports = authMiddleware;