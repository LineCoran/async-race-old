import ToysIcon from '@mui/icons-material/Toys';
import { Button } from "@mui/material"
import { useDeleteCarMutation, useStartCarMutation } from '../../features/apiSlice';

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

    async function handleDeleteCar(id: number) {
        await deleteCar(id);
    }

    async function handleStartCar(id: number, status: string) {
        const res = await startCar({id, status}).unwrap();
        const time = (res.distance/res.velocity)/1000;
        setAnimation(String(id), time);
    }

    function setAnimation(id: string, time: number) {
        const car = document.getElementById(id);
        console.log(time);
        if(car) {
            car.style.transition = `transform ${time}s linear`;
            car.style.transform = `translateX(90vw)`;
        }
    }

    return(
        <div>
            <h2>{car.id}. {car.name}</h2>
            <ToysIcon id={String(car.id)} htmlColor={car.color} sx={{ fontSize: 74, }} />
            <Button onClick={() => handleStartCar(car.id, 'started')}>Drive</Button>
            <Button onClick={() => handleDeleteCar(car.id)}>Delete Car</Button>
        </div>
    )
}

export default Car;