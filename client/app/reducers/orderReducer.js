export default (state,{ type,item,orders })=>{
    switch (type) {
        case "UPDATE":
            return {
                orders
            }    
        case "ADD":
            return {
                orders:[...state,item]
            }
        default:
            return {
                orders:[]
            }
    }
}