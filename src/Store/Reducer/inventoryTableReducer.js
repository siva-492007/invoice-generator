

const initialState = {
    tableData: [
        {
            id: 1,
            item: null,
            quantity: null,
            rate: null,
            totalPrice: null
        }
    ]
}



const InventoryTableReducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_INDEX":
            return{
                ...state,
                id: action.value
            }
        case "UPDATE_ITEM":
            return{
                ...state,
                item: action.value
            }
        case "UPDATE_QUANTITY":
            return{
                ...state,
                quantity: action.value
            }
        case "UPDATE_RATE":
            return{
                ...state,
                rate: action.value
            }
        case "UPDATE_TOTAL_PRICE":
            return{
                ...state,
                totalPrice: state.quantity * state.rate
            }
        default:
            return state
    }
}

export default InventoryTableReducer;