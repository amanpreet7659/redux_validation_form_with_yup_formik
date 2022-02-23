// Action File Where we define Actions

import { REGISTER_DATA } from "../Store/types"

export const registerData = (data) => dispatch => {
    dispatch({
        type: REGISTER_DATA,
        payload: data
    })
}