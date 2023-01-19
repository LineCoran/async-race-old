import { Button } from "@mui/material"
import { useCheckEngineMutation, useDeleteCarMutation, useStartCarMutation } from '../../features/apiSlice';
import './Car.css';
import CarIcon from '../CarIcon/CarIcon';
import { useState } from 'react';

interface ICarItem {
   id: number,
   name: string,
   color: string, 
}

interface ICarProps {
    car: ICarItem;
}

function Car({ car } : ICarProps) {

    const [startButtonStatus, setStartButtonStatus] = useState(false);
    const [deleteCar] = useDeleteCarMutation();
    const [startCar] = useStartCarMutation();
    const [checkEngine] = useCheckEngineMutation();

    async function handleMoveCar(id: number, status: string) {
        const {distance, velocity} = await startCar({id, status}).unwrap();
        const time = (distance/velocity)/1000;
        setStartButtonStatus(true);
        setAnimation(String(id), time);
        if (status === 'started') {
            console.log('here');
            try {
                await checkEngine({id, status: 'drive'}).unwrap();
            } catch(err) {
                stopAnimation(String(id));
                setStartButtonStatus(false);
                console.log(err);
            }
        } else {
            setStartButtonStatus(false);
        }
    }
    function stopAnimation(id: string) {
        const car = document.getElementById('car'+id);
        if (car) {
            car.style.animationPlayState = 'paused';
        }
    }
    function setAnimation(id: string, time: number) {
        const car = document.getElementById('car'+id);
        if(car) {
            car.style.animation = (time === Infinity) ? '' : `race ${time}s linear forwards`;
        }
    }

    return(
        <div>
            <h3>{car.id}. {car.name}</h3>
            <div id={'car'+String(car.id)}>
                <CarIcon color={car.color}/>
            </div>
            <Button disabled={startButtonStatus} onClick={() => handleMoveCar(car.id, 'started')}>A</Button>
            <Button disabled={!startButtonStatus} onClick={() => handleMoveCar(car.id, 'stopped')}>B</Button>
            <Button onClick={() => deleteCar(car.id)}>Delete Car</Button>
        </div>
    )
}

export default Car;