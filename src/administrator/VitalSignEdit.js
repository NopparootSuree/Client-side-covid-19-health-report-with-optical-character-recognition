import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function VitalSignEdit() {
    const { id } = useParams()

    const [ state, setState ] = useState({
        uuid: "",
        body_temperature: "",
        upper_blood_pressure: "", 
        lower_blood_pressure: "",
        pulse_rate: "",
        respiratory: "",
        pulse_ox: "",
        blood_sugar: "",
        see_a_doctor: "",
        sickness: "" 
    })

    const { uuid, body_temperature, upper_blood_pressure, 
        lower_blood_pressure, pulse_rate, respiratory,
        pulse_ox, blood_sugar, see_a_doctor,  sickness 
    } = state

    const inputValue = (name) => (event) => {
        // console.log(name, "=" , event.target.value);
        setState({...state, [name]:event.target.value})
    }

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/vitalsign/${id}`)
        .then((response) => {
          if(response.status === 200){
            setState({ uuid: response.data.uuid, body_temperature: response.data.body_temperature, 
                upper_blood_pressure: response.data.upper_blood_pressure, 
                lower_blood_pressure: response.data.lower_blood_pressure, 
                pulse_rate: response.data.pulse_rate, respiratory: response.data.respiratory, 
                pulse_ox: response.data.pulse_ox, blood_sugar: response.data.blood_sugar, 
                see_a_doctor: response.data.see_a_doctor, sickness: response.data.sickness 
            })
          }
        }
      )
    }, [id]) 

    const submitForm = (event) => {
        event.preventDefault();
        axios
        .put(`${process.env.REACT_APP_API}/vitalsign/${id}`,
        { uuid, body_temperature, upper_blood_pressure, 
        lower_blood_pressure, pulse_rate, respiratory,
        pulse_ox, blood_sugar, see_a_doctor,  sickness })
        .then(response => {
            if(response.status === 200){
                Swal.fire('แจ้งเตือน','แก้ไขข้อมูลสำเร็จ','success').then(() => {
                window.location.reload()
                })
            }
        })
        .catch(err => {
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ p: 2}}>
            <Typography variant='h6' gutterBottom component="div">
                แก้ไขข้อมูลสัญญาณชีพ
            </Typography>
            <form onSubmit={submitForm}>
                <Grid>
                    <Grid container spacing={1} sx={{p:1}}>
                        <Grid item xs={12} sm={12} >
                            <TextField id="uuid" label="UUID" 
                            value={uuid} onChange={inputValue('uuid')} 
                            variant="outlined" fullWidth disabled required/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{p:1}}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="body_temperature" label="อุณหภูมิร่างกาย" 
                            value={body_temperature} onChange={inputValue('body_temperature')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="upper_blood_pressure" label="ความดันโลหิตตัวบน" 
                            value={upper_blood_pressure} onChange={inputValue('upper_blood_pressure')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{p:1}}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="lower_blood_pressure" label="ความดันโลหิตตัวล่าง" 
                            value={lower_blood_pressure} onChange={inputValue('lower_blood_pressure')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="pulse_rate" label="การเต้นชีพจรต่อนาที" 
                            value={pulse_rate} onChange={inputValue('pulse_rate')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{p:1}}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="respiratory" label="จำนวนครั้งในการหายใจต่อนาที" 
                            value={respiratory} onChange={inputValue('respiratory')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="pulse_ox" label="ปริมาณออกซิเจนในเลือด" 
                            value={pulse_ox} onChange={inputValue('pulse_ox')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{p:1}}>
                        <Grid item xs={12} sm={6}>
                            <TextField id="blood_sugar" label="ค่าน้ำตาลในเลือด" 
                            value={blood_sugar} onChange={inputValue('blood_sugar')} 
                            variant="outlined" fullWidth/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="see_a_doctor">มีความประสงค์ต้องการพบแพทย์</InputLabel>
                                    <Select
                                    labelId="see_a_doctor"
                                    id="see_a_doctor"
                                    value={see_a_doctor} 
                                    onChange={inputValue('see_a_doctor')}
                                    label="มีความประสงค์ต้องการพบแพทย์"
                                    >
                                    <MenuItem value="ไม่ได้เลือก">ไม่ได้เลือก</MenuItem>
                                    <MenuItem value="ต้องการพบแพทย์">ต้องการพบแพทย์</MenuItem>
                                    <MenuItem value="ไม่ต้องการพบแพทย์">ไม่ต้องการพบแพทย์</MenuItem>
                                    </Select>
                                <FormHelperText>กรุณาเลือกความประสงค์</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} sx={{p:1}}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="sickness"
                                label="อาการ"
                                multiline
                                maxRows={5}
                                value={sickness} 
                                onChange={inputValue('sickness')}
                                variant="outlined"
                                fullWidth
                            />
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
        </React.Fragment>
    );
}