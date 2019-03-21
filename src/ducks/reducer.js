const initialState = {
    user: {
        id: 0,
        username: '',
        email: ''
    }
};

const UPDATE_USER = 'UPDATE_USER'


export default function reducer(state = initialState, action){
    const { type, payload } = action;
    switch(type) {
        case UPDATE_USER:
        const { id, username, email } = payload;
        return {...state, id, username, email }
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