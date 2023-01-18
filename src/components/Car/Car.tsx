import ToysIcon from '@mui/icons-material/Toys';
import { Button } from "@mui/material"
import { useCheckEngineMutation, useDeleteCarMutation, useStartCarMutation } from '../../features/apiSlice';
import './Car.css';

interface ICarItem {
   id: number,
   name: string,
   color: string, 
}

interface ICarProps {
    car: ICarItem;
}

function Car({ car } : ICarProps) {

    const [deleteCar] = useDeleteCarMutation();
    const [startCar] = useStartCarMutation();
    const [checkEngine] = useCheckEngineMutation();

    async function handleDeleteCar(id: number) {
        await deleteCar(id);
    }

    async function handleStartCar(id: number, status: string) {
        const res = await startCar({id, status}).unwrap();
        const time = (res.distance/res.velocity)/1000;
        setAnimation(String(id), time);
        try {
            await checkEngine({id, status: 'drive'}).unwrap();
            console.log('succes car id: ', id);
        } catch(e) {
            console.error(e);
            stopAnimation(String(id))
        }
    }

    function stopAnimation(id: string) {
        const car = document.getElementById('car'+id);
        if (car) {
            car.style.animationPlayState = 'paused';
        }
    }

    function setAnimation(id: string, time: number) {
        console.log('time: ', time);
        const car = document.getElementById('car'+id);
        if(car) {
            car.style.animation = (time === Infinity) ? '' : `race ${time}s linear forwards`;
        }
    }

    return(
        <div>
            <h2>{car.id}. {car.name}</h2>
            <ToysIcon id={'car'+String(car.id)} htmlColor={car.color} sx={{ fontSize: 74, }} />
            <Button onClick={() => handleStartCar(car.id, 'started')}>A</Button>
            <Button onClick={() => handleStartCar(car.id, 'stopped')}>B</Button>
            <Button onClick={() => handleDeleteCar(car.id)}>Delete Car</Button>
        </div>
    )
}

export default Car;