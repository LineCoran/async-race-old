import { TextField, Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import ToysIcon from '@mui/icons-material/Toys';
import { HexColorPicker } from "react-colorful";
import { ICar } from "../../interfaces/interfaces";
import { useState } from "react";

function MyForm() {
    
  const [color, setColor] = useState('#aabbcc');
  const [name, setName] = useState('');
  const [cars, setCars] = useState<ICar[]>([]); 

  return(
    <Box>
      <Grid className="" alignItems='center' justifyContent='center' container spacing={{ xs: 1, md: 2 }} columns={{ xs: 12}}>
        <Grid item xs={3} sm={4} md={4}>
            <TextField
            size='small'
            value={name}
            label='Car name'
            variant='outlined'
            onChange={(e) => setName(e.target.value)}
            />
        </Grid>

        <Grid item xs={3} sm={4} md={4}>
          <HexColorPicker color={color} onChange={setColor} />
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
            <h2>{color}</h2>
        </Grid>

        <Grid sx={{border: '1px solid black', alignItems: 'center', width: '100%'}}  item xs={2} sm={4} md={4}>
            <Box sx={{ width: '100px', height: '50px' }}>
              <h3 style={{color: color}}>{name}</h3>
            </Box>
            <ToysIcon htmlColor={color} sx={{ fontSize: 74 }} />
        </Grid>

        <Grid item xs={2} sm={4} md={4}>
            <Button onClick={() => setCars([...cars, {name, color}])}>ADD AUTO</Button>
        </Grid>
      </Grid>
      <ToysIcon htmlColor={color} sx={{ fontSize: 74 }} />
    </Box>
    )
}

export default MyForm;
