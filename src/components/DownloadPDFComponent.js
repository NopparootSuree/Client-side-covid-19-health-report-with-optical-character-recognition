import './DownloadPDFComponent.css'
import { useState, useEffect } from 'react'
import html2pdf from 'html2pdf.js'
import axios from 'axios'
import liff from "@line/liff";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import { Button, Grid, Typography } from '@mui/material';

const DownloadPDFComponent = () => {
    const [ userUID, setuserUID ] = useState('')
    const [ items, setItems ] = useState([])
    const [ checkIsAny, setcheckIsAny ] = useState([])
    const [ hide, setHide ] = useState(true)

    const downloadPdfDocument = () => {
        const input = document.getElementById('divDownload');
        let opt = {
            magin: 1,
            filename: 'แบบฟอร์มรายงานอาการ',
            Image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF : { unit: 'in', format: 'letter', orientation: 'portrait'}
        }
        
        html2pdf().set(opt).from(input).save()
    }

    const checkRegister = () => {
        axios.get(`${process.env.REACT_APP_API}/checkUUIDIsEmpty`)
        .then((check) => {
            setcheckIsAny(check.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const isHas = () => {
        let hasUUID = false;
        checkIsAny.forEach((has) => {
            if(userUID === has.uuid){
                hasUUID = true
            }
        })
        return hasUUID
    }

    axios.get(`${process.env.REACT_APP_API}/user/${userUID}`)
    .then((response) => {
        setItems(response.data);
    }
    )

    const downloadPdfOnWebsite = () => {
        liff.openWindow({ url: "https://react-vital-signs.web.app/pdf", external: true})
        setTimeout(downloadPdfDocument(), 5000)
    }
    
    useEffect(() => {
        checkRegister()
        

        liff.init({ liffId: `${process.env.REACT_APP_LIFF_PDF}` }, () => { 
            if (liff.isLoggedIn()) {
                liff.getProfile().then(profile => {
                    setuserUID(profile.userId)
                })
                .catch((err => console.log(err)))
            } else {
                liff.login();
            } 
        }, err => console.log(err));
        
    },[])

    const btn = document.getElementById('btn')

    const hideButton = () => {
        btn.style.display = 'none'
    }
    
    const hideForm = () => {
        setHide(false)
    }

    return(
        <div>
            { isHas() === true ? (
                <div id="divDownload">
                    <div className='ButtonCenter'>
                        <button id='btn' onClick={() => { hideButton(); hideForm(); downloadPdfOnWebsite(); }}>Download PDF</button>
                    </div>
                    { hide === false && 
                    <div>
                        { items.map((row) => (
                        <table className="table">
                            <tr>
                                <th className="col" id="col1">แบบบันทึกประจำวัน</th>
                                <th className="col" id="col2">{row.HNId}</th>
                            </tr>
                            <tr>
                                <td className="col" id="col3">วัน/เดือน/ปี<div className="line" id="line1"></div></td>
                                <td className="col" id="col4">การเต้นชีพจรต่อนาที<div className="line" id="line2"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col5">เวลา<div className="line" id="line3"></div></td>
                                <td className="col" id="col6">จำนวนการหายใจต่อนาที<div className="line" id="line4"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col7">ชื่อ {row.prename}{row.name} {row.surname}<div className="line" id="line5"></div></td>
                                <td className="col" id="col8">ออกซิเจนในเลือด<div className="line" id="line6"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col9">อุณหภูมิร่างกาย<div className="line" id="line7"></div></td>
                                <td className="col" id="col10">ค่าน้ำตาลในเลือด<div className="line" id="line8"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col11">ความดันโลหิต</td>
                                <td className="col" id="col12" rowSpan="2">วันนี้มีอาการผิดปกติหรือไม่ทำเครื่องหมายกากบาท<u>X</u>บนเส้น</td>
                            </tr>
                            <tr>
                                <td className="col" id="col13">ค่าตัวบน<div className="line" id="line9"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col14">ค่าตัวล่าง<div className="line" id="line10"></div></td>
                                <td className="col" id="col15">ปกติ<div className="line" id="line11"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col16">ผิดปกติ โปรดระบุอาการ<div className="line" id="line11"></div></td>
                                <td className="col" id="col17">เจ็บคอ<div className="line" id="line11"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col18">มีไข้<div className="line" id="line11"></div></td>
                                <td className="col" id="col19">แน่นหน้าอก<div className="line" id="line11"></div></td>
                            </tr>
                            <tr>
                                <td className="col" id="col20">ไอ<div className="line" id="line11"></div></td>
                                <td className="col" id="col21">ต้องการพบแพทย์<div className="line" id="line11"></div></td>
                            </tr>
                        </table>
                        ))}
                        <div id='textcenter'>
                            <h6 className="text" id="text1">หมายเหตุ:</h6><h6 className="text" id="text2">กรุณาเขียนตัวบรรจง กรอกข้อมูลจากซ้ายไปขวาและเขียนให้อยู่บนเส้น</h6>
                        </div>
                    </div>
                    }
                </div>
                ) : (
                <Grid item xs={12} sm={12} m={5}>
                        <Box>
                            <Box display="flex">
                                <Box sx={{ flexGrow: 1}}>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant='h3' gutterBottom component="div">
                                            กรุณาลงทะเบียนก่อนเข้าใช้งาน
                                        </Typography>
                                    </Stack>   
                                </Box>
                            </Box>
                        </Box>
                        <Grid m={3}>
                            <Link href='register'>
                                <Stack direction="row" justifyContent="center">
                                    <Button variant="contained">
                                        <Typography variant='h6' gutterBottom component="div">
                                            ลงทะเบียน
                                        </Typography>
                                    </Button>
                                </Stack>
                            </Link>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    )
}

export default DownloadPDFComponent;