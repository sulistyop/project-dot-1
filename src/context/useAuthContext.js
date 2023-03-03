import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvicer')
    }

    return context
}