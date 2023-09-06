export default (state,{ type,address,addresses })=>{
    switch (type) {
        case "UPDATE":
            return {
                addresses
            }    
        case "ADD":{
            return {
                addresses:[...state,address]
            }
        }
        default:
            return {
                addresses:[]
            }
    }
}