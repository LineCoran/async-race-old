import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICar } from '../interfaces/interfaces';

type carAPI = { 
    name: string,
    color: string,
    id: number,
}

type ICarStatus = {
    id: number;
    status: string;
}

type ICarSuccessResponse = {
    velocity: number;
    distance: number;
  }

type ICheckDriver = {
    success: boolean;
}

export const garageApi = createApi({
    reducerPath: 'Cars',
    tagTypes: ['Cars'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:3000'}),
    endpoints: (builder) => ({
        getAllCars: builder.query<carAPI[], string>({
            query: () => ({
                url: '/garage'
            }),
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'Cars' as const, id })),
                  { type: 'Cars', id: 'LIST' },
                ]
              : [{ type: 'Cars', id: 'LIST' }],
        }),
        addCar: builder.mutation<ICar, Partial<ICar>>({
            query: (body) => ({
                url: '/garage',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
        }),
        deleteCar: builder.mutation({
            query: (id: number) => ({
                url: `/garage/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
        }),
        startCar: builder.mutation<ICarSuccessResponse, ICarStatus>({
            query(data) {
              const { id, status } = data;
              return {
                url: `/engine`,
                method: 'PATCH',
                params: {
                    id,
                    status,
                }
              }
            }
        }),
        checkEngine: builder.mutation<ICheckDriver, ICarStatus>({
            query(data) {
              const { id, status } = data;
              return {
                url: `/engine`,
                method: 'PATCH',
                params: {
                    id,
                    status,
                }
              }
            }
        }),
    })
})

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useStartCarMutation,
  useCheckEngineMutation,
} = garageApi;
