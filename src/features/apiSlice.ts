import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type productAPI ={ 
    id: number,
    title: string,
    description: string,
}
interface IProductsAPI {
    limit: number,
    products: productAPI[],
    skip: number,
    total: number
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProductsAPI, string>({
            query: () => ({
                url: '/products'
            }), 
        })
    })
})

export const { useGetAllProductsQuery } = productsApi;
