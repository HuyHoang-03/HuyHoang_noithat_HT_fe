import {
    LOGIN,
    LOGIN_FAILURE,
    LOGOUT,
    LOAD_USER_FROM_STORAGE
} from "../actions/actionLogin";

const initialState = {
    isAuthenticated: false,
    username: null,
    token: null,
    role: null,
    id: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                token: action.payload.token,
                role: action.payload.role,
                id: action.payload.id,
                loading: false,
                error: false,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOAD_USER_FROM_STORAGE:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                id: action.payload.id,
            };
        case LOGOUT:
            localStorage.removeItem("token"); // Xóa token khi logout
            return {
                ...state,
                isAuthenticated: false,
                username: null,
                token: null,
                role: null,
                id: null,
                cartItems: [],
            };

        default:
            return state;
    }
};

export default authReducer;