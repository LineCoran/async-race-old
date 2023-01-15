import ToysIcon from '@mui/icons-material/Toys';

interface ICarItem {
   id: number,
   name: string,
   color: string, 
}

interface ICarProps {
    car: ICarItem;
}

function Car({ car } : ICarProps) {
    return(
        <div>
            <h2>{car.name}</h2>
            <ToysIcon htmlColor={car.color} sx={{ fontSize: 74 }} />
        </div>
    )
}

export default Car;