import { Button, ButtonGroup } from "@mui/material";
import { useAddCarMutation, useCheckEngineMutation, useGetAllCarsQuery, useStartCarMutation } from "../../features/apiSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeRaceStatus } from "../../store/carsSlice";
import { calcTime, startAnimation, stopAnimation } from "../../utils/helpers";
import { carPromiseResult } from "../../interfaces/interfaces";
import './Controlls.css'

function Controls() {
    const raceStatus = useAppSelector((state) => state.carsReducer.raceStatus);
    const params = useAppSelector((state) => state.carsReducer.carListParams);
    const { data } = useGetAllCarsQuery(params);
    const dispatch = useAppDispatch();
    const [addCar] = useAddCarMutation();
    const [startCar] = useStartCarMutation();
    const [checkEngine] = useCheckEngineMutation();

    async function startRace(status: string) {
        if (data !== undefined && data.length > 0) {
         const promises = await Promise.all(data.map((car, index) => {
           return new Promise<carPromiseResult>(async (res, rej) => {
             const {distance, velocity} = await startCar({id: car.id, status: status}).unwrap();
             const time = calcTime(distance, velocity);
             res({ time, id: car.id })
             if (status === 'started') {
               try {
                 await checkEngine({id: car.id, status: 'drive'}).unwrap();
               } catch(err) {
                 stopAnimation(car.id);
               }
             }
           })
         }))
         promises.map((car) => {
             startAnimation(car.id, car.time as number);
             dispatch(changeRaceStatus(!raceStatus));
             return undefined
           })
       }
    }

    const handleGenerateCar = async () => {
        let countOfCarsGenerate = 100;
        while(countOfCarsGenerate > 0) {
          addCar({color: 'black', name: 'Tesla'}).unwrap();
          countOfCarsGenerate--;
        }
    }
    return (
      <section className='controlls'>
        <h2 className='car-list-title'>GARAGE ({data ? data.length : '0'})</h2>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={handleGenerateCar}>Generate</Button>
          <Button onClick={() => startRace('started')}>Race</Button>
          <Button onClick={() => startRace('stopped')}>Stop</Button>
        </ButtonGroup>
      </section>
    )
}

export default Controls;

