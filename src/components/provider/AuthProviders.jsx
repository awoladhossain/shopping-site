import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const AuthContext = createContext(null);
import app from '../../firebase/firebase.config';

const AuthProviders = ({children}) => {
    const auth = getAuth(app);
        
    const[user,setUser]=useState(null);

    const[loading, setLoading] = useState(true);


//* 1.
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
// *2.
    const singIn =(email,password)=>
    {   setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
// *3.
    const loogeOut =()=>
    {
        return signOut(auth);
    }
// *4 observe user state change: rather he is singin or singout that should be observed:?
    
    useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })
        // * stop observing while unmounting 
        return()=>{
            return unsubscribe;
        }
    },[])

    const authInfo = {
        user,
        createUser,
        singIn,
        loogeOut,
        loading,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProviders;