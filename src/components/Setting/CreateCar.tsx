import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAddCarMutation, useGetAllCarsQuery, useStartCarMutation, useCheckEngineMutation } from "../../features/apiSlice";

function CreateCar() {
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('car');
  const [addCar] = useAddCarMutation();
  const { data } = useGetAllCarsQuery('');
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
      Promise.all(data.map((_car, index) => {
        return new Promise(async (res, rej) => {
          const carSpeed = await startCar({id: index+1, status: status}).unwrap();
          const time = (carSpeed.distance / carSpeed.velocity)/1000;
          res(time);
          try {
            await checkEngine({id: index+1, status: 'drive'}).unwrap();
          } catch(err) {
            stopAnimation(String(index+1));
          }
        })
      }))
      .then(res => 
        res.map((car, index) => 
        startAnimation(String(index+1), car as number)));
    }
  }

  function stopAnimation(id: string) {
      const car = document.getElementById('car'+id);
      if (car === null) return;
      car.style.animationPlayState = 'paused';
  }
  
  function startAnimation(id: string, time: number) {
      const car = document.getElementById('car'+id);
      if (car === null) return;
      car.style.animation = (time === Infinity) 
      ? '' 
      : `race ${time}s linear forwards`;
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
