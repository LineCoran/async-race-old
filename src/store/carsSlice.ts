import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Car = {
    id: number;
    name: string;
    color: string;
}

type CarsState = {
    cars: Car[];
}

const initialState: CarsState = {
    cars: [],
}

const carsSLice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        addCar(state, action: PayloadAction<Car>) {
            state.cars.push({
                id: 33,
                name: action.payload.name,
                color: action.payload.color,
            })
        }
    }
})

export const { addCar } = carsSLice.actions;
export default carsSLice.reducer;
