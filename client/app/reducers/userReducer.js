export default (_,{ type,user })=>{
    switch(type){
        case "SIGNUP":
            return {
                user,
                auth:true
            }
        case "SIGNIN":
            return {
                user,
                auth:true
            }
        case "LOGOUT":
            return {
                user:null,
                auth:false
            }
        default:{
            return {
                user:null,
                auth:true
            }
        }
    }
}