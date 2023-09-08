const jwt= require("jsonwebtoken");
const JWT_SECRET= process.env.JWT_SECRET
exports.verifyToken=(req,res,next)=>{
  const {token}= req.cookies;
  console.log(token);
  if (!token) {
    return res.status(401).json({
        message:"Unauthorized"
    })
    
  } else {
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if (err) {
            return res.status(401).json({
                message:"Forbidden"
            })
        } else {
            req.responce=decoded;
            next()
        }
    })
  }
}