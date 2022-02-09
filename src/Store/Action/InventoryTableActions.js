export const AddRow = (newRowObj) => {
    return dispatch => {
        dispatch({type: "ADD_ROW", value: newRowObj})
    }
}

export const DeleteRow = () => {
    return dispatch => {
        dispatch({type: "DELETE_ROW"})
    }
}

export const UpdateItem = (index, value) => {
    return dispatch => {
        dispatch({type: "UPDATE_ITEM", index: index, value: value})
    }
}

export const UpdateQuantity = (index, value) => {
    return dispatch => {
        dispatch({type: "UPDATE_QUANTITY", index: index, value: value})
    }
}

export const UpdateRate = (index, value) => {
    return dispatch => {
        dispatch({type: "UPDATE_RATE", index: index, value: value})
    }
}

