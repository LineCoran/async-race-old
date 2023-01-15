import ToysIcon from '@mui/icons-material/Toys';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCar } from "../../store/carsSlice";
import './MyForm.css';
import { ICar } from "../../interfaces/interfaces";
import Setting from "../Setting/Setting";

function MyForm() {
  const dispatch = useAppDispatch();
  const cars = useAppSelector((store) => store.carsReducer.cars);

  function addCarButton({ id, name, color }: ICar) {
    dispatch(addCar({id, name, color}));
  }
  return(
    <section className="form">
      <Setting addCar={addCarButton} buttonName='ADD CAR' />
      <Setting addCar={addCarButton} buttonName='CHANGE' />

      <ToysIcon htmlColor={'red'} sx={{ fontSize: 74 }} />
      <ToysIcon htmlColor='red' sx={{ fontSize: 74 }} />
    </section>      
    )
}

export default MyForm;
