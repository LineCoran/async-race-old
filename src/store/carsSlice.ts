import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Car = {
    id: number;
    name: string;
    color: string;
}

type carListParams = {
    _page: number;
    _limit: number;
}

type CarsState = {
    cars: Car[];
    raceStatus: boolean;
    updateCarId: number | null;
    carListParams: carListParams;
}

const initialState: CarsState = {
    cars: [],
    raceStatus: false,
    updateCarId: null,
    carListParams: {
        _limit: 7,
        _page: 1,
    }
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
        },
        addIdUpdatedCarSlice(state, action: PayloadAction<number | null>) {
            state.updateCarId = action.payload;
        }
    }
})

export const { addCar, changeRaceStatus, addIdUpdatedCarSlice } = carsSLice.actions;
export default carsSLice.reducer;
