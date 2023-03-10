import { createContext, useReducer } from 'react'

export const AuthContext = createContext({ email: '', password: '' })

export const authReducer = (state, action) => {
    switch (action) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //console.log('AuthContext State: ', state)
}