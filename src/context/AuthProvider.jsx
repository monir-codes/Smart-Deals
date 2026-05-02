import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const AuthProvider = ({children}) => {

    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    
    }

    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUser = ()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (current)=>{
            setUser(current);
            if(current){
                const loggedUser = {email: current.email}
                fetch('http://localhost:3000/getToken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(loggedUser)
                }).then(res=> res.json()).then(data=> {
                    console.log(data)
                localStorage.setItem('accessToken', data.token)}
                )
            }
            else{
                localStorage.removeItem('accessToken');
            }
            setLoading(false);
        });
        return ()=> unSubscribe();
    },[])

    const authInfo = {
        createUser,
        signIn,
        user,
        loading,
        signInWithGoogle,
        signOutUser

    }

    return (
        <AuthContext value={authInfo}>
         {children}
        </AuthContext>
    );
};

export default AuthProvider;