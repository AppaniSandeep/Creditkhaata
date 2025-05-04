const jwt = require("jsonwebtoken");

module.exports = function (request,response,next){
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) return response.status(401).json({error:"No token"});
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        request.userId = decoded.userId;
        next();
    }catch {
        response.status(401).json({error:"Invalid token"})
    }
}