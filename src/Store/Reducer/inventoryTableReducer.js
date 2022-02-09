const initialState = {
    tableData: [
        {
            id: 1,
            item: null,
            quantity: 0,
            rate: 0,
            totalPrice: 0
        }
    ]
}


const InventoryTableReducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD_ROW":
            return {
                ...state,
                tableData: [...state.tableData, action.value]
            }

        case "DELETE_ROW":
            const updatedArray = [...state.tableData]
            if(updatedArray.length > 1){
                updatedArray.pop()
            }
            return {
                ...state,
                tableData: updatedArray
            }

        case "UPDATE_ITEM":
            const itemArray = [...state.tableData]
            itemArray[action.index].item = action.value
            return{
                ...state,
                tableData: itemArray
            }

        case "UPDATE_QUANTITY":
            const quantityArray = [...state.tableData]
            quantityArray[action.index].quantity = action.value
            quantityArray[action.index].totalPrice = quantityArray[action.index].quantity * quantityArray[action.index].rate
            return{
                ...state,
                tableData: quantityArray,
            }

        case "UPDATE_RATE":
            const rateArray = [...state.tableData]
            rateArray[action.index].rate = action.value
            rateArray[action.index].totalPrice = rateArray[action.index].quantity * rateArray[action.index].rate
            return{
                ...state,
                tableData: rateArray,
            }

        default:
            return state
    }
}

export default InventoryTableReducer;