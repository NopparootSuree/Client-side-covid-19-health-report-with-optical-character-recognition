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
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function ImageTable() {
  const [ items, setItems ] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/images`)
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
        .delete(`${process.env.REACT_APP_API}/image/${id}`)
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
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">HN</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Fullname</TableCell>
                    <TableCell align="center">Image Name</TableCell>
                    <TableCell align="center">Link</TableCell>
                    <TableCell align="center">Actions&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell align="center">{`${row.user_detail[0].HNId}`}</TableCell>
                      <TableCell align="center">{new Date(row.createdAt).toLocaleString()}</TableCell>
                      <TableCell align="center">{`${row.user_detail[0].prename}${row.user_detail[0].name}  ${row.user_detail[0].surname}`}</TableCell>
                      <TableCell align="center">{row.image_name}</TableCell>
                      <TableCell align="center"><Button onClick={() => window.location.href=`${row.link}`}>Open Image</Button></TableCell>
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
