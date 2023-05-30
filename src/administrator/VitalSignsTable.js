import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function User() {
  const [ items, setItems ] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/table`)
      .then((response) => {
          setItems(response.data);
        }
      )
  }, [])

  const VitalSignDelete = (id) => {
    Swal.fire({
      title: 'คุณต้องลบข้อมูลหรือไม่?',
      showDenyButton: true,
      confirmButtonText: 'ลบ',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.REACT_APP_API}/vitalsign/${id}`)
        .then((response) => {
          if(response.status === 200){
            Swal.fire('แจ้งเตือน','ลบข้อมูลเรียบร้อย','success').then(() => {
              window.location.reload()
            })  
          }
        })
        .catch((err) => console.log(err))
          } 
        })

  }

  const VitalSignEdit = (id) => {
    window.location = `vitalsigns/edit/${id}`
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100%" sx={{ pt: 3 }}>
        <Paper sx={{ p: 2}}>
            <Box>
                <Box display="flex">
                    <Box sx={{ flexGrow: 1}}>
                        <Typography variant='h6' gutterBottom component="div">
                            ตารางรายงานข้อมูลสัญญาณชีพ
                        </Typography>
                    </Box>
                    <Box>
                      <Link href='vitalsigns/create'>
                        <Button variant="contained" sx={{mb: 3}}>Create</Button>
                      </Link>  
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Fullname</TableCell>
                    <TableCell align="center">HN&nbsp;</TableCell>
                    <TableCell align="center">BT&nbsp;(°C)</TableCell>
                    <TableCell align="center">BP&nbsp;(mmHg)</TableCell>
                    <TableCell align="center">PR&nbsp;(beats/Min)</TableCell>
                    <TableCell align="center">RR&nbsp;(breaths/Min)</TableCell>
                    <TableCell align="center">SPO2&nbsp;(%)</TableCell>
                    <TableCell align="center">BG&nbsp;(mg/dL.)</TableCell>
                    <TableCell align="center">พบแพทย์&nbsp;</TableCell>
                    <TableCell align="center">อาการ&nbsp;</TableCell>
                    <TableCell align="center">Actions&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                      <TableCell align="center">{`${row.user_detail[0].prename}${row.user_detail[0].name}  ${row.user_detail[0].surname}`}</TableCell>
                      <TableCell align="center">{`${row.user_detail[0].HNId}`}</TableCell>
                      <TableCell align="center">{row.body_temperature}</TableCell>
                      <TableCell align="center">{`${row.upper_blood_pressure}/${row.lower_blood_pressure}`}</TableCell>
                      <TableCell align="center">{row.pulse_rate}</TableCell>
                      <TableCell align="center">{row.respiratory}</TableCell>
                      <TableCell align="center">{row.pulse_ox}</TableCell>
                      <TableCell align="center">{row.blood_sugar}</TableCell>
                      <TableCell align="center">{row.see_a_doctor}</TableCell>
                      <TableCell align="center">{row.sickness}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                              m: 1,
                            },
                          }}
                        >
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => VitalSignEdit(row._id)}>
                              <EditIcon sx={{ display: { xs: 'none', md: 'flex' }}}/>
                              EDIT
                              </Button>
                            <Button onClick={() => VitalSignDelete(row._id)}>
                              <DeleteForeverIcon sx={{ display: { xs: 'none', md: 'flex' }}}/>
                              DEL
                              </Button>
                          </ButtonGroup>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
