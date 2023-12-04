import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Historial() {
  const [rows, setRows] = useState([])

  const updateRows = () => {
    const url = 'http://ec2-54-183-90-190.us-west-1.compute.amazonaws.com:8008/coordinates'
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    
    })
      .then(response => response.json())
      .then(data => {
        setRows(data)
      }).catch(error => {
        console.log(error)
      }) 
  }

  useEffect(() => {
      updateRows()
  }, [])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Registro</TableCell>
            <TableCell align="right">Latitud</TableCell>
            <TableCell align="right">Longitud</TableCell>
            <TableCell align="right">Fecha y hora</TableCell>
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
              <TableCell align="right">{row.lat}</TableCell>
              <TableCell align="right">{row.lng}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}