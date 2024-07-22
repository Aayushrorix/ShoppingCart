import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginUser, SignUpUser } from "../../models/shoppingModels";


type SignUpResponse = {
    "status":number,
    "message":string,
    "data":SignUpUser,
};

type LoginData = {
    "email":string,
    "token":string,
}

type LoginResponse = {
    "status":number,
    "message":string,
    "data": LoginData,
}

export const shoppingApi = createApi({
    baseQuery : fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/',
    }),
    tagTypes: ["User","Products","Cart"],
    endpoints: (builder) => ({
        signUpUser: builder.mutation<SignUpResponse,SignUpUser>({
            query: (userData:SignUpUser) => ({
                url: '/auth/signup',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        loginUser: builder.mutation<LoginResponse,LoginUser>({
            query: (loginData:LoginUser) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData,
            }),
            invalidatesTags: ["User"],
        }),
        logoutUser: builder.mutation<any,void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            invalidatesTags: ["User"],
        }),

    })
})

export const { useSignUpUserMutation , useLoginUserMutation, useLogoutUserMutation } = shoppingApi as any;