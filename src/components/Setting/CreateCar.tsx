import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useAddCarMutation } from "../../features/apiSlice";

function CreateCar() {
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('car');
  const [addCar] = useAddCarMutation();

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
      </div>
    )
}

export default CreateCar;
