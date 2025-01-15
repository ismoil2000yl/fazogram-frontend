import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://fazogram-backend-production.up.railway.app"
        baseUrl: "https://fazogram-backend.onrender.com"
    }),

    endpoints: (bulider) => ({
        // Creating User
        signupUser: bulider.mutation({
            query: (user) => ({
                url: "/users/register",
                method: "POST",
                body: user
            })
        }),

        // Login
        loginUser: bulider.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // Logout
        logoutUser: bulider.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload
            })
        })
    })
})

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;
export default appApi;