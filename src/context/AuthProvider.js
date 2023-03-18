import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"

import app from '../firebase/firebase.config';

const auth = getAuth(app)
export const UserAuth = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoadinig] = useState(true)
    
    // crete user Accoutn with email 
    const createUserAccoutn = (email, password) => {
        setLoadinig(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin with email
    const loging = (email, password) => {
        setLoadinig(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    // user state ovserver
    useEffect(() => {
        const unsubscirbe = onAuthStateChanged(auth, (logedUser) => {
            setUser(logedUser)
            setLoadinig(false)
        })
        return () => {
            unsubscirbe()
        }
    }, [])


    //Update user name and photo
    const updateName =(name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        })
    }



    // Google Login & SignUp
    const googleAuthProvider = new GoogleAuthProvider()
    const goolgeLogin = () => {
        setLoadinig(true)
        return signInWithPopup(auth, googleAuthProvider)
    }
  

    // logout user
    const logout =()=>{
        setLoadinig(true)
        localStorage.removeItem("ph-resale-token")
        return signOut(auth)
    }




    const userInfo = {
        user,
        loading,
        createUserAccoutn,
        loging,
        updateName,
        goolgeLogin,
        logout
    }


    return (
        <UserAuth.Provider value={userInfo}>
            {children}
        </UserAuth.Provider>
    );
};

export default AuthProvider;