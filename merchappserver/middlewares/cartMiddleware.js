import redis from '../rd.js'
export const cartMiddleware = async(req,res,next)=>{
    let user = await redis.get("user")
    if(!user) return res.status(500).json({msg:"error fetching user details"})
    user = JSON.parse(user)
    res.locals.user=user
    next()
}