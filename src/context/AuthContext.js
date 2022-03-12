import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail,
    updateEmail,
    updatePassword 
} from "firebase/auth"

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = function (email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = function (email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = function (email, password) {
        return signOut(auth)
    }
    const resetPass = function (email) {
        return sendPasswordResetEmail(auth, email)
    }
    const updateUserEmail = function (email) {
        return updateEmail(auth.currentUser, email)
    }
    const updateUserPass = function (email) {
        return updatePassword (auth.currentUser, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const providerValue = { currentUser, signup, login, logout, resetPass, updateUserEmail, updateUserPass }

    return (
        <AuthContext.Provider value={providerValue}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
