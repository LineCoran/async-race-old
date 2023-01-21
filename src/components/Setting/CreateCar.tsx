import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAddCarMutation, useGetAllCarsQuery, useStartCarMutation, useCheckEngineMutation } from "../../features/apiSlice";
import { calcTime, startAnimation, stopAnimation } from "../../utils/helpers";
import { useAppDispatch } from "../../hooks";
import { changeRaceStatus } from "../../store/carsSlice";
import { useAppSelector } from "../../hooks";

interface carPromiseResult {
  time: number;
  id: number;
}

function CreateCar() {
  const dispatch = useAppDispatch();
  const raceStatus = useAppSelector((state) => state.carsReducer.raceStatus);
  const { data } = useGetAllCarsQuery('');
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('car');
  const [addCar] = useAddCarMutation();
  const [startCar] = useStartCarMutation();
  const [checkEngine] = useCheckEngineMutation();


  const handleAddCar = async () => {
    await addCar({color, name}).unwrap();
  }

  const handleGenerateCar = async () => {
    let countOfCarsGenerate = 100;
    while(countOfCarsGenerate > 0) {
      addCar({color, name}).unwrap();
      countOfCarsGenerate--;
    }
  }

  async function startRace(status: string) {
     if (data !== undefined && data.length > 0) {
      Promise.all(data.map((car, index) => {
        return new Promise<carPromiseResult>(async (res, rej) => {
          const {distance, velocity} = await startCar({id: car.id, status: status}).unwrap();
          const time = calcTime(distance, velocity);
          const result = {time, id: car.id};
          res(result);
          if (status === 'started') {
            try {
              await checkEngine({id: car.id, status: 'drive'}).unwrap();
            } catch(err) {
              stopAnimation(car.id);
            }
          }
        })
      }))
      .then(res => 
        res.map((car) => {
          startAnimation(car.id, car.time as number);
          dispatch(changeRaceStatus(!raceStatus));
        }))
    }
  }
    return (
      <div className="form-setting">
        <TextField
          size='small'
          sx={{ margin: '0 0 1rem 0' }}
          value={name}
          label='Car name'
          variant='outlined'
          onChange={(e) => setName(e.target.value)}
        />
        <HexColorPicker color={color} onChange={setColor} />
        <Button onClick={handleAddCar}>ADD CAR</Button>
        <Button onClick={handleGenerateCar}>GENERATE</Button>
        <Button onClick={() => startRace('started')}>Race</Button>
        <Button onClick={() => startRace('stopped')}>Stop</Button>
      </div>
    )
}

export default CreateCar;
