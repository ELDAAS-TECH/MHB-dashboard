import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
        baseQuery: fetchBaseQuery({baseUrl:process.env.REACT_APP_BASE_URL}),
        reducerPath:"adminApi",
        tagTypes:["Users","User","userlist","Geography"],
        endpoints:(build)=>({
            getUsers:build.query({
                query:()=>"api/v1/users/getUsers",
                providesTags:["Users"]
            }),
            getUser:build.query({
                query:(id)=>`user/user/${id}`,
                providesTags:["User"]
            }),
            getUserList:build.query({
                query:()=>"userlist/userlist",
                providesTags:["userlist"],
            }),
            getGeography:build.query({
                query:()=>"/geo/geography",
                providesTags:["Geography"],
            }),
        }),
})

export const {
    useGetUserQuery,
    useGetUserListQuery,
    useGetGeographyQuery,
    useGetUsersQuery
} = api;