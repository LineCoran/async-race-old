import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetWinnersQuery } from '../api/apiSlice';

type data = {
  id: number
  time: number;
  wins: number;
}

function createData(
  id: number,
  time: number,
  wins: number,
) {
  return { id, wins, time };
}

export default function Winners() {

  const { data } = useGetWinnersQuery('');
  const rows: data[]  = [];

  if (data !== undefined && data.length > 0) {
    data.map((winner) => rows.push(createData(winner.id, winner.time, winner.wins)))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> CAR ID</TableCell>
            <TableCell align="right">Time&nbsp;(g)</TableCell>
            <TableCell align="right">Wins&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.wins}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}