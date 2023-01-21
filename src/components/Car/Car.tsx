import { Button } from "@mui/material"
import { useCheckEngineMutation, useDeleteCarMutation, useStartCarMutation } from '../../features/apiSlice';
import CarIcon from '../CarIcon/CarIcon';
import { useState } from 'react';
import { startAnimation, stopAnimation, calcTime } from "../../utils/helpers";
import { ICarProps } from "../../interfaces/interfaces";
import { useAppSelector } from "../../hooks";
import './Car.css';

function Car({ car } : ICarProps) {

    const [startButtonStatus, setStartButtonStatus] = useState(false);
    const [deleteCar] = useDeleteCarMutation();
    const [startCar] = useStartCarMutation();
    const [checkEngine] = useCheckEngineMutation();
    const isRace = useAppSelector((state) => state.carsReducer.raceStatus);

    async function handleMoveCar(id: number, status: string) {
        const {distance, velocity} = await startCar({id, status}).unwrap();
        const time = calcTime(distance, velocity);
        setStartButtonStatus(!startButtonStatus);
        startAnimation(id, time);
        if (status === 'started') {
            try {
                await checkEngine({id, status: 'drive'}).unwrap();
            } catch(err) {
                stopAnimation(id);
                setStartButtonStatus(!startButtonStatus);
            }
        } else {
            setStartButtonStatus(!startButtonStatus);
        }
    }

    return(
        <div className="car-wrapper" id={`${car.id}`}>
            <h3>{car.id}. {car.name}</h3>
            <div className='track'>
                <div className='car-icon' id={'car'+String(car.id)}>
                    <CarIcon color={car.color}/>
                </div>
            </div>
            <Button disabled={startButtonStatus || isRace} onClick={() => handleMoveCar(car.id, 'started')}>A</Button>
            <Button disabled={!startButtonStatus && !isRace} onClick={() => handleMoveCar(car.id, 'stopped')}>B</Button>
            <Button onClick={() => deleteCar(car.id)}>Delete Car</Button>
        </div>
    )
}

export default Car;