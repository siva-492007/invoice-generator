

export const AddIndex = (id) => {
    return dispatch => {
        dispatch({type: "ADD_INDEX", value: id})
    }
}

export const UpdateItem = (value) => {
    return dispatch => {
        dispatch({type: "UPDATE_ITEM", value: value})
    }
}

export const UpdateQuantity = (value) => {
    console.log(typeof value)
    return dispatch => {
        dispatch({type: "UPDATE_QUANTITY", value: value})
    }
}

export const UpdateRate = (value) => {
    console.log(typeof value)
    return dispatch => {
        dispatch({type: "UPDATE_RATE", value: value})
    }
}

export const UpdateTotalPrice = () => {
    return dispatch => {
        dispatch({type: "UPDATE_TOTAL_PRICE"})
    }
}
