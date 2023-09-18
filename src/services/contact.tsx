// import {createApi ,fetchBaseQuery}from "@reduxjs/toolkit/query/react"
// import{IcontactType} from "./contactType"
// export const contact = createApi({
//     reducerPath:"",
//     baseQuery:fetchBaseQuery({baseUrl:"https://easyinvoicingapi.azurewebsites.net/api"}),
//     endpoints:(builder)=>({
//         contact:builder.query<IcontactType,void>({
//             query:()=>"/Login"
          
//         })
//     })
// })
// export const { useContactQuery } = contact


// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 interface Post {
    applicationId: number;
    businessId: number;
    emailId?: string;
    ipAddress: null;
    password?: string;
    refreshToken: null;
    rememberMe: boolean;
    id?:any
  }
 
const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ=="
// const getApiUrlpath = 'https://easyinvoicingapi.azurewebsites.net/api'


// const a = "https://easyinvoicingapi.azurewebsites.net/api/Login?Code=tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ%3D%3D"
type PostsResponse = Post[]

export const postApi:any = createApi({
 
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://easyinvoicingapi.azurewebsites.net/api` }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    addPost: build.mutation<PostsResponse, Partial<Post>>({
      query({applicationId,
        businessId,
        emailId,
        ipAddress,
        password,
        refreshToken,
        rememberMe}) {
            
        return {
        //   url: `https://easyinvoicingapi.azurewebsites.net/api/Login?Code=tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ%3D%3D`,
          method: 'POST',
         url: `/Login?Code=${Code}&applicationId=${applicationId}&businessId=${businessId}&emailId=${emailId}&ipAddress=${ipAddress}&password=${password}&refreshToken=${refreshToken}&rememberMe=${rememberMe}`,
        //   method: 'POST',
        body:{applicationId,
            businessId,
            emailId,
            ipAddress,
            password,
            refreshToken,
            rememberMe},
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        
        
          
        }
       
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})

export const {
  useAddPostMutation
} = postApi

// export default postApi.endpoints;



// const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ=="
// const getApiUrlpath = 'https://easyinvoicingapi.azurewebsites.net/api'
// const completeUrl = getApiUrlpath+`?Code=${Code}`


// export const productApi=createApi({
//     reducerPath :"productApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl:getApiUrlpath

//     }),
//     endpoints:(builder)=>({
//         products:builder.query({
//             query:({BusinessId,BusinessLocationId})=>`/Business/GetBusinessProfile?Code=${Code}&BusinessId=${BusinessId}&BusinessLocationId=${BusinessLocationId}`}),
//     }),


// });
// export const {useProductsQuery}=productApi;
