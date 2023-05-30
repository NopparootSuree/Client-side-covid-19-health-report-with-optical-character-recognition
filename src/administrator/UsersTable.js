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


export default function UserTable() {
  const [ items, setItems ] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/users`)
      .then((response) => {
          setItems(response.data);
        }
      )
  }, [])

  const UserDelete = (id) => {
    Swal.fire({
      title: 'คุณต้องลบข้อมูลหรือไม่?',
      showDenyButton: true,
      confirmButtonText: 'ลบ',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.REACT_APP_API}/user/${id}`)
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

  const UserEdit = (id) => {
    window.location = `users/edit/${id}`
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
                            ตารางรายงานข้อมูลบุคคล
                        </Typography>
                    </Box>
                    <Box>
                      <Link href='users/create'>
                        <Button variant="contained" sx={{mb: 3}}>Create</Button>
                      </Link>  
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">HN</TableCell>
                    <TableCell align="center">Fullname</TableCell>
                    <TableCell align="center">Gener</TableCell>
                    <TableCell align="center">Birthdate&nbsp;</TableCell>
                    <TableCell align="center">ID_card</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Address</TableCell>
                    <TableCell align="center">Subdistrict</TableCell>
                    <TableCell align="center">District</TableCell>
                    <TableCell align="center">Province</TableCell>
                    <TableCell align="center">Zip_code&nbsp;</TableCell>
                    <TableCell align="center">Phone_number</TableCell>
                    <TableCell align="center">Actions&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell align="center">{row.HNId}</TableCell>
                      <TableCell align="center">{`${row.prename}${row.name}  ${row.surname}`}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="center">{row.birthdate}</TableCell>
                      <TableCell align="center">{row.id_card}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.subdistrict}</TableCell>
                      <TableCell align="center">{row.district}</TableCell>
                      <TableCell align="center">{row.province}</TableCell>
                      <TableCell align="center">{row.zip_code}</TableCell>
                      <TableCell align="center">{row.phone_number}</TableCell>
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
                            <Button onClick={() => UserEdit(row._id)}>
                              <EditIcon sx={{ display: { xs: 'none', md: 'flex' }}}/>
                              EDIT
                              </Button>
                            <Button onClick={() => UserDelete(row._id)}>
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
