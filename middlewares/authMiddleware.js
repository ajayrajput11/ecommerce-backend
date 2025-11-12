const User  = require("../models/userModels");
const jwt = require("jsonwebtoken")

const protect =  async(req,res,next)=>{
try {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return res.status(401).json({message:"not authoriszed,no token"})
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.finfById(decode.id).select("-password")

    if (!req.user) {
        return res.status(404).json({message:"user not found"})
    }

    next()
} catch (error) {
     console.error("Auth Middleware Error:", error)
  res.status(401).json({ message: "Token is invalid or expired" })
}
}

const adminOnly= (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
}


module.exports = { protect, adminOnly } 
