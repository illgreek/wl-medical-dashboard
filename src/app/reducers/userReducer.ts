// reducers/userReducer.ts

interface UserState {
    name: string;
    email: string;
    dob: string;
    sex: string;
    height: string;
    weight: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    dob: '',
    sex: '',
    height: '',
    weight: '',
};

const userReducer = (state = initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default userReducer;
