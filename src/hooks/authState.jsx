import { createContext, useContext, useEffect, useReducer } from "react";
import { deleteDataAsync, getDataAsync, storeDataAsync } from "../store/asyncStorage/handler";

const AuthContext = createContext()

const getAuthStorage = async () => {
    try {
        const authStorage = await getDataAsync("authentication")
        if (authStorage === null) {
            return {
                isAuthenticated: false,
                user: null
            }
        } else {
            const { isAuthenticated, user } = JSON.parse(authStorage)
            return {
                isAuthenticated,
                user,
            }
        }

    } catch (error) {
        console.error(error);
    }

}

const saveAuthStorage = async (isAuthenticated, user) => {
    const authentication = { isAuthenticated, user }
    try {
        await storeDataAsync("authentication", JSON.stringify(authentication))
    } catch (error) {
        console.error(error);
    }
}

const removeAuthStorage = async () => {
    try {
        await deleteDataAsync("authentication")
    } catch (error) {
        console.error(error);
    }
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            saveAuthStorage(true, action.payload)
            return {
                isAuthenticated: true,
                user: action.payload
            }
        case "LOGOUT":
            removeAuthStorage()
            return {
                isAuthenticated: false,
                user: null
            }
        default:
            return state
    }
}

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null
    })

    const fetchData = async () => {
        const authData = await getAuthStorage()
        dispatch({ type: "INITIALIZE", payload: authData })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth }
