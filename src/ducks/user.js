export const UPDATE_USER = 'UPDATE_USER';

const initialState = {
    user: {
        id: 0,
        email: '',
        admin: false
    }
}

export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type) {
        case UPDATE_USER:
        const { id, email, admin } = payload;
        return {...state, id, email, admin }
        default:
        return state;
    }
    
}

export function updateUser(userObj){
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}
