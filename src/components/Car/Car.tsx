import { Button } from "@mui/material"
import { useCheckEngineMutation, useDeleteCarMutation, useStartCarMutation } from '../../features/apiSlice';
import CarIcon from '../CarIcon/CarIcon';
import { useState } from 'react';
import { startAnimation, stopAnimation, calcTime } from "../../utils/helpers";
import { ICarProps } from "../../interfaces/interfaces";
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";
import { addIdUpdatedCarSlice } from "../../store/carsSlice";
import ButtonGroup from '@mui/material/ButtonGroup';
import './Car.css';

function Car({ car, listId } : ICarProps) {

    const [startButtonStatus, setStartButtonStatus] = useState(false);
    const [deleteCar] = useDeleteCarMutation();
    const [startCar] = useStartCarMutation();
    const [checkEngine] = useCheckEngineMutation();
    const isRace = useAppSelector((state) => state.carsReducer.raceStatus);
    const dispatch = useAppDispatch();

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

    function handleSelectCar(carId: number, listId: number) {
        dispatch(addIdUpdatedCarSlice(carId));
        addStyleSelectedCar(listId);
    }

    function addStyleSelectedCar(listId: number) {
        const allCars = document.querySelectorAll('.car-wrapper');
        allCars.forEach((car) => {
            car.className = 'car-wrapper';
        })
        allCars[listId].classList.toggle('car-wrapper-active');
        console.log(allCars);
      }

    return(
        <div className="car-wrapper" id={`${car.id}`}>
            <h3>{listId + 1}. {car.name}</h3>
            <div className='track'>
                <div className='car-icon' id={'car'+String(car.id)}>
                    <CarIcon color={car.color}/>
                </div>
            </div>

        <ButtonGroup sx={{marginBottom: '0.5rem'}} size="small" aria-label="small button group">
            <Button
              sx={{minWidth: 'max-content', margin: '0'}}
              color="success"
              disabled={startButtonStatus || isRace}
              onClick={() => handleMoveCar(car.id, 'started')}>A
            </Button>

            <Button
              sx={{minWidth: 'max-content', margin: '0'}}
              disabled={!startButtonStatus && !isRace}
              onClick={() => handleMoveCar(car.id, 'stopped')}>B
            </Button>

            <Button
              color="error"
              sx={{minWidth: 'max-content', margin: '0'}}
              onClick={() => deleteCar(car.id)}>Delete
            </Button>

            <Button
              color='info'
              sx={{minWidth: 'max-content', margin: '0'}}
              onClick={() => handleSelectCar(car.id, listId)}>Select
            </Button>
</ButtonGroup>
           
        </div>
    )
}

export default Car;