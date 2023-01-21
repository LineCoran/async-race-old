import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Car = {
    id: number;
    name: string;
    color: string;
}

type CarsState = {
    cars: Car[];
    raceStatus: boolean;
}

const initialState: CarsState = {
    cars: [],
    raceStatus: false,
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
        },
        changeRaceStatus(state, action: PayloadAction<boolean>) {
            state.raceStatus = action.payload;
        }
    }
})

export const { addCar, changeRaceStatus } = carsSLice.actions;
export default carsSLice.reducer;
