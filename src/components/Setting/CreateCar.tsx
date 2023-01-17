import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAddCarMutation, useGetAllCarsQuery, useStartCarMutation } from "../../features/apiSlice";

function CreateCar() {
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('car');
  const [addCar] = useAddCarMutation();
  const { data } = useGetAllCarsQuery('');
  const [startCar] = useStartCarMutation();

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

  async function startRace() {
    if (data !== undefined && data.length > 0) {

      Promise.all(data.map((car, index) => {
        return new Promise(async (res, rej) => {
          console.log('index: ',index);
          const carSpeed = await startCar({id: index+1, status: 'started'}).unwrap();
          const time = (carSpeed.distance / carSpeed.velocity)/1000;
          res(time);
          console.log('create');
        })
      })).then(res => res.map((car, index) => setAnimation(String(index+1), car as number)));
    }
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
        car.style.transform = `translateX(500px)`;
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
        <Button onClick={startRace}>Race</Button>
      </div>
    )
}

export default CreateCar;
