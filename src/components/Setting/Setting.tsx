import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ICar } from "../../interfaces/interfaces";

interface ISettinProps {
    addCar: (car: ICar) => void;
    buttonName: string;
}

function Setting({ addCar, buttonName }: ISettinProps) {
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('car');

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
        <Button onClick={() => addCar({id: 22, name, color})}>{buttonName}</Button>
      </div>
    )
}

export default Setting