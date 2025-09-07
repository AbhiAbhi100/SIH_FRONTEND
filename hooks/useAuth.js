"use client"

import { useState,useEffect,createContext,useContext } from "react";

const AuthContext=createContext(null);

export function AuthProvider({children}){
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth=()=>useContext(AuthContext);


function useProvideAuth(){

    const[user,setUser]=useState(null);
    const[token,setToken]=useState(null);

    useEffect(()=>{
        const t = localStorage.getItem("token");
        const u = localStorage.getItem("user");
        if(t) setToken(t);
        if(u) setUser(JSON.parse(u));
    },[]);

    const login = (tokenValue,userObj)=>{
        localStorage.setItem("token",tokenValue);
        localStorage.setItem("user",JSON.stringify(userObj));
        setToken(tokenValue);
        setUser(userObj);
    };


    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };


    return {user,token,login,logout};

}