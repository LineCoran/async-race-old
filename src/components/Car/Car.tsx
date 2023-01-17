import ToysIcon from '@mui/icons-material/Toys';
import { Button } from "@mui/material"
import { useDeleteCarMutation } from '../../features/apiSlice';

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

    async function handleDeleteCar(id: number) {
        await deleteCar(id);
    }

    return(
        <div>
            <h2>{car.id}. {car.name}</h2>
            <ToysIcon htmlColor={car.color} sx={{ fontSize: 74 }} />
            <Button>Drive</Button>
            <Button onClick={() => handleDeleteCar(car.id)}>Delete Car</Button>
        </div>
    )
}

export default Car;