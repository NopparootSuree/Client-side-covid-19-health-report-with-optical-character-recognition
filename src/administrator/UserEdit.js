import * as React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Stack from "@mui/material/Stack";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const UsersEdit = () => {
    const { id } = useParams()

    const [ state, setState ] = useState({
        uuid: "",
        prename: "", 
        name: "",
        surname: "",
        birthdate: "",
        id_card: "",
        email: "",
        address: "", 
        subdistrict: "",
        district: "", 
        province: "", 
        zip_code: "", 
        phone_number: ""
    })

    const { uuid, prename, name, surname, birthdate, 
        id_card, email, address, subdistrict,
        district, province, zip_code, phone_number
    } = state

    const inputValue = (name) => (event) => {
        // console.log(name, "=" , event.target.value);
        setState({...state, [name]:event.target.value})
    } 
    
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/user/${id}`)
        .then((response) => {
               setState({
                uuid: response.data[0].uuid,
                prename: response.data[0].prename, name: response.data[0].name, 
                surname: response.data[0].surname, birthdate: response.data[0].birthdate, 
                id_card: response.data[0].id_card, email: response.data[0].email, 
                address: response.data[0].address, subdistrict: response.data[0].subdistrict,
                district: response.data[0].district, province: response.data[0].province, 
                zip_code: response.data[0].zip_code, phone_number: response.data[0].phone_number
                })
        })
    }, [id])
     
    const submitForm = (event) => {
        event.preventDefault();
        axios
        .put(`${process.env.REACT_APP_API}/user/${id}`,
        { uuid, prename, name, surname, birthdate, id_card, email, address, subdistrict,
        district, province, zip_code, phone_number })
        .then((response) => {
                Swal.fire('แจ้งเตือน','แก้ไขข้อมูลสำเร็จ','success').then(() => {
                window.location.reload()
                })
        })
        .catch(err => {
            Swal.fire('แจ้งเตือน',err.response.data[0].error,'error')
        })
    }

    return(
        <div>
            <div>
                <CssBaseline />
                <Container maxWidth='sm' sx={{ p: 2}}>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant='h4' gutterBottom component="div">
                            แก้ไขข้อมูลบุคคล
                        </Typography>
                    </Stack>
                    <form onSubmit={submitForm}>
                        <Grid>
                            <Grid container spacing={1} sx={{p:1}}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        id="uuid"
                                        label="UUID"
                                        value={uuid} 
                                        onChange={inputValue('uuid')}
                                        variant="outlined"
                                        type="text"
                                        disabled
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="prename">คำนำหน้าชื่อ</InputLabel>
                                            <Select
                                            labelId="prename"
                                            id="prename"
                                            value={prename} 
                                            onChange={inputValue('prename')}
                                            label="คำนำหน้าชื่อ">
                                            <MenuItem value="เด็กชาย">เด็กชาย</MenuItem>
                                            <MenuItem value="เด็กหญิง">เด็กหญิง</MenuItem>
                                            <MenuItem value="นาย">นาย</MenuItem>
                                            <MenuItem value="นาง">นาง</MenuItem>
                                            <MenuItem value="นางสาว">นางสาว</MenuItem>
                                            </Select>
                                        <FormHelperText>กรุณาเลือกคำนำหน้าชื่อ</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="name" label="ชื่อ" 
                                    value={name} onChange={inputValue('name')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="surname" label="นามสกุล" 
                                    value={surname} onChange={inputValue('surname')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <TextField id="birthdate" label="วัน/เดือน/ปีเกิด" 
                                        value={birthdate} onChange={inputValue('birthdate')} 
                                        variant="outlined" type="text" fullWidth/>
                                        <FormHelperText>เช่น 11/05/2543</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="id_card" label="เลขบัตรประจำตัวประชาชน" 
                                    value={id_card} onChange={inputValue('id_card')} 
                                    variant="outlined" type="number" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="email" label="อีเมล์" 
                                    value={email} onChange={inputValue('email')} 
                                    variant="outlined" type="email" fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="address" label="ที่อยู่" 
                                    value={address} onChange={inputValue('address')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="subdistrict" label="ตำบล" 
                                    value={subdistrict} onChange={inputValue('subdistrict')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="district" label="อำเภอ" 
                                    value={district} onChange={inputValue('district')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="province" label="จังหวัด" 
                                    value={province} onChange={inputValue('province')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="zip_code" label="รหัสไปรษณีย์" 
                                    value={zip_code} onChange={inputValue('zip_code')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="phone_number" label="เบอร์โทร" 
                                    value={phone_number} onChange={inputValue('phone_number')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} sx={{p:1}}>
                                <Grid item xs={12}>
                                    <Button variant="contained" type='submit' fullWidth>แก้ไขข้อมูล</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default UsersEdit;