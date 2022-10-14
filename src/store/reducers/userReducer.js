const INITIAL_STATE = {
    name: 'Luat',
    age: 18,
    info: { "email": 'kinh can' }

};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                info: action.info
            }

        default:
            return state
    }
}
export default userReducer