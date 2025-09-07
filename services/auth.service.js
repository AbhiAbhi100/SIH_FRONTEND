//services -> auth.service.js
//file sirf backend ke auth related endpoints ko call karegi

const { apiFetch } = require("@/lib/apiClient");


export const registerUser = async (payload)=>{

    //api fetch calling
    return apiFetch("/auth/register",{
        method:"POST",
        body:payload,
    });
};

//login user

export const loginUser = async (payload)=>{
    return apiFetch("/auth/register",{
        method:"POST",
        body:payload,
    });
};

//ABHI LOGOUT AND GETPROFILE WALA PATH DEKHNA HAI
/*
export const logout = async ()=>{
    return apiFetch("/auth/logout",{
        method:"POST",
    });
};

export const getProfile = async()=>{
    //ye endpoint backend se current user details dega (token ke base par)
    return apiFetch("/auth/me",{
        method:"GET",
    })
}
*/






