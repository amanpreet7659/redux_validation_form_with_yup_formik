//  Reducer file 

import { REGISTER_DATA } from "../Store/types"

const initialValues = {
    data: ""
}
const reducer = (state = initialValues, actions) => {
    const { type, payload } = actions
    switch (type) {
        case REGISTER_DATA:{
            return{
                ...state,
                data:payload
            }
        }
        default: {
            return state
        }
    }

}

export default reducer