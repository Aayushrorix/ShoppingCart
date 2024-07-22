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
        logoutUser: builder.mutation<any,any>({
            query: (header) => ({
                url: '/auth/logout',
                method: 'POST',
                headers: header,
            }),
            invalidatesTags: ["User"],
        }),
        getCartCount: builder.query<any,any>({
            query: (header) => ({
                url: '/cart/get_cart_count',
                method: "GET",
                headers: header,
            }),
            providesTags: ["Cart"],
        }),
        getProducts: builder.query<any,any>({
            query: (header) => ({
                url: '/product/all_products',
                method: 'GET',
                headers: header,
            }),
            providesTags: ["Products"],
        }),
        addToCart: builder.mutation<any,any>({
            query: (body:any) => ({
                url: '/cart/add_to_cart',
                method: 'POST',
                body: body.productDetail,
                headers: body.header,
            }),
            invalidatesTags: ["Cart"],
        }),
        removeFromCart: builder.mutation<any,any>({
            query: (body:any) => ({
                url: '/cart/remove_from_cart',
                method: 'POST',
                body: body.productDetail,
                headers: body.header,
            }),
            invalidatesTags: ["Cart"],
        }),
        getCartProducts: builder.query<any,any>({
            query: (header) => ({
                url: '/cart/get_cart_products',
                method: 'GET',
                headers: header,
            }),
            providesTags: ["Cart"],
        }),
        reduceFromCart: builder.mutation<any,any>({
            query: (body:any) => ({
                url: '/cart/reduce_from_cart',
                method: 'POST',
                body: body.productDetail,
                headers: body.header,
            }),
            invalidatesTags: ["Cart"],
        }),

    })
})

export const { useSignUpUserMutation , useLoginUserMutation, useLogoutUserMutation, useGetCartCountQuery, useGetProductsQuery, useAddToCartMutation, useRemoveFromCartMutation, useGetCartProductsQuery, useReduceFromCartMutation } = shoppingApi as any;