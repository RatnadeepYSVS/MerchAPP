export default (state,{ type,item,cart })=>{
    switch (type) {
        case "UPDATE":
            return {
                cart
            }
        case "ADD":
            return {
                cart:[...state,item]
            }    
        default:
            return {
                cart:[]
            }
    }
}