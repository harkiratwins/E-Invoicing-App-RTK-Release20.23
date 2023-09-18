import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Post, Update } from "../model/model.type";
import { Post,Update } from "../pages/roles-permissions/model/role-type";
const Code = "tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ==";
const getApiUrlpath = "https://easyinvoicingapi.azurewebsites.net/api";
const completeUrl = getApiUrlpath + `?Code=${Code}`;

type popost = Post[];
type updatepost = Update[];
export const invoiceApi = createApi({
  reducerPath: "invoiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrlpath,
  }),
  //   tagTypes: ["Contact"],
  endpoints: (builder) => ({
    contacts: builder.query({
      query: ({
        pageNo,
        pageSize,
        sortArrow,
        sortColumn,
        searchValue,
        sortOrder,
        heading,
        hasMore,
        loadMoreData,
        roleId,
        BusinessId,
      }) =>
        `/Roles/GetRole?Code=${Code}&pageNo=${pageNo}&pageSize=${pageSize}&sortArrow=${sortArrow}&sortColumn=${sortColumn}&searchValue=${searchValue}&sortOrder=${sortOrder}
        &heading=${heading}&hasMore=${hasMore}&loadMoreData=${loadMoreData}&roleId=${roleId}&BusinessId=${BusinessId}`,
    }),
    // providesTags:['Contact']
    editrole: builder.query({
      query: ({ roleId, businessId }) =>
        `/Roles/GetRolesAndPermissions?Code=${Code}&roleId=${roleId}&businessId=${businessId}`,
    }),
    postrole: builder.mutation<popost, Partial<Post>>({
      query({
        businessId,
        data,
        descriptionFormLoading,
        oldRoleId,
        responseKeyId,
        roleDescription,
        roleId,
        roleName,
      }) {
        return {
          url: `/Roles/AddRole?Code=${Code}`,
          method: "post",
          body: {
            businessId,
            data,
            descriptionFormLoading,
            oldRoleId,
            responseKeyId,
            roleDescription,
            roleId,
            roleName,
          },
        };
      },
    }),
    updaterole: builder.mutation<updatepost, Partial<Update>>({
      query({ businessId, data, roleId, roleList }) {
        return {
          url: `/Roles/AddUpdateRolesAndPermissions?Code=tsxehwW980Q6yoO-A23XDjwd49wN8S7bVzYC7k-FDb3MAzFuJaZowQ%3D%3D`,
          method: "POST",
          body: {
            businessId,
            data,
            roleId,
            roleList,
          },
        };
      },
    }),
  }),
});

export const {
  useContactsQuery,
  useEditroleQuery,
  usePostroleMutation,
  useUpdateroleMutation,
} = invoiceApi;