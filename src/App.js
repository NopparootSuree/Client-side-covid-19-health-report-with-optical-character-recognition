import './App.css';
import { useRef, useState, useEffect } from "react";
import liff from "@line/liff";
import preImage from './img/preview_image.png'
import {initializeApp, getFunctions, httpsCallable, firebaseConfig, getStorage, ref, uploadBytesResumable, getDownloadURL } from './firebaseConfig'
import NavbarComponent from './components/NavbarComponent';
import Swal from 'sweetalert2'
import axios from 'axios'
import { Button, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";

function App() {
  const [ checkIsAny, setcheckIsAny ] = useState([])
  const [ userUID, setuserUID ] = useState('')
  const [ displayName, setDisplayName ] = useState('')
  const [ image, setImage ] = useState('')

  const props = {
    displayName,
    image
  }

  const app = initializeApp(firebaseConfig)
  const functions = getFunctions(app, 'asia-southeast1')
  var cameraStream = null

  const previewImageRef = useRef(null)
  const cameraRef = useRef(null)
  const snapshotRef = useRef(null)
  const streamRef = useRef(null)
  const canvasRef = useRef(null)

    //Media Streaming
  const startStreaming = () => {
    const mediaSupport = 'mediaDevices' in navigator
    if (mediaSupport && null == cameraStream) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (mediaStream) {
        cameraStream = mediaStream
        streamRef.current.srcObject = mediaStream
        streamRef.current.play()
      }).catch(function (err) {
        console.log("Unable to access camera: " + err)
      })
    } else {
      alert('Your browser does not support media devices.')
      return
    }
  }

  const captureSnapshot = () => {
    if (null != cameraStream) {
      var ctx = canvasRef.current.getContext('2d')
      ctx.drawImage(streamRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
      previewImageRef.current.src = canvasRef.current.toDataURL("image/png")
      ocr(canvasRef.current.toDataURL("image/png"))
      var file = dataURLtoFile(canvasRef.current.toDataURL("image/png"), 'file.txt')
      uploadImg(file)
    }
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

  const stopStreaming = () => {
    if (null != cameraStream) {
      const track = cameraStream.getTracks()[0]
      track.stop()
      streamRef.current.load()
      cameraStream = null
    }
  }

  const getBase64 = (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      previewImageRef.current.src = reader.result
      ocr(reader.result)
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }

  const fileInput = (event) => {
    const file = event.target.files[0]
    uploadImg(file)
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (file) {
      if (validImageTypes.includes(file.type)) {
        previewImageRef.current.style.objectFit = "contain"
        if (liff.isInClient()) {
          previewImageRef.current.style.objectFit = "contain"
        }
        cameraRef.current.style.display = "none"
        snapshotRef.current.style.display = "block"
        getBase64(file)
        stopStreaming()
        Swal.fire('แจ้งเตือน','กรุณารอสักครู่','success')
      }
    }
  }

  const btnStream = () => {
    startStreaming()
    cameraRef.current.style.display = "block"
    snapshotRef.current.style.display = "none"
  }

  const btnCapture = () => {
    captureSnapshot()
    cameraRef.current.style.display = "none"
    snapshotRef.current.style.display = "block"
    stopStreaming()
    Swal.fire('แจ้งเตือน','กรุณารอสักครู่','success')
  }

  function currentDate() {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();

      let currentDate = year + "-" + month + "-" + date 
      return currentDate;
  }

  function uploadImg(file) {
    let date =  currentDate();
    const storage = getStorage();
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.type
    };
    const storageRef = ref(storage, `images/${userUID}/${date}`);
    uploadBytesResumable(storageRef, file, metadata);
}


  // Functions OCR With Base64
  function ocr(base64encoded) {
    const myCallable = httpsCallable(functions, 'myCallable');
    myCallable({ base64: base64encoded }).then(async (result) => {
      const data = result.data
      console.log(data);

      let sickness = ''

      let { body_temperature, upper_blood_pressure, 
      lower_blood_pressure, pulse_rate, respiratory,
      pulse_ox, blood_sugar, see_a_doctor, normal, abnormal,
      sore_throat, fever, dyspnea, cough} = data

      if(see_a_doctor === 'X'){
        see_a_doctor = 'ต้องการพบแพทย์'
      }else {
        see_a_doctor = 'ไม่ต้องการพบแพทย์'
      }
      
      if(abnormal === 'X' || 'x'){
        if(sore_throat === null){
          sore_throat = ''
        } else {
          sore_throat = 'เจ็บคอ'
        }

        if(fever === null){
          fever = ''
        } else {
          fever = 'มีไข้'
        }

        if(dyspnea === null){
          dyspnea = ''
        } else {
          dyspnea = 'แน่นหน้าอก'
        }

        if(cough === null){
          cough = ''
        } else {
          cough = 'ไอ'
        }

        sickness =  `${sore_throat+","}${fever+","}${dyspnea+","}${cough}`

      }
      
      if(normal === 'X'){
        sickness = 'ไม่มีอาการ'
      }
      
      if(sickness === ',,,'){
        sickness = 'ไม่มีอาการ'
      }

      await axios
      .post(`${process.env.REACT_APP_API}/create/vitalsign`,
      { uuid: userUID, body_temperature, upper_blood_pressure, 
      lower_blood_pressure, pulse_rate, respiratory,
      pulse_ox, blood_sugar, see_a_doctor, sickness})
      .then(response => {
        console.log(response);
        Swal.fire('แจ้งเตือน','บันทึกข้อมูลบทความเรียบร้อย','success')
        var date =  currentDate();
        const storage = getStorage();
        const starsRef = ref(storage, `images/${userUID}/${date}`);
        let imageName = `${date}`
          getDownloadURL(starsRef)
          .then((url) => {
            axios.post(`${process.env.REACT_APP_API}/create/image`,{ uuid: userUID, image_name: imageName, link: url})
            .then((response) => {
              console.log("บันทึกรูปแล้ว");
            })
          }).catch((err) => {
            console.log(err);
          })
      })
      .catch(err => {
        Swal.fire('แจ้งเตือน',err.response.data.error,'error')
      })
    })    
  }

  const checkRegister = async () => {
    await axios.get(`${process.env.REACT_APP_API}/checkUUIDIsEmpty`)
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

  useEffect(() => {
    checkRegister()
    
    liff.init({ liffId: `${process.env.REACT_APP_LIFF_SCAN}` }, () => { 
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
            setuserUID(profile.userId)
            setDisplayName(profile.displayName)
            setImage(profile.pictureUrl)

        })
        .catch((err => console.log(err)))
      } else {
        liff.login();
      }
    }, err => console.log(err));

  },[])



  return (
    <div>
      {
        isHas() === true ? (
          <div id="container">
          <NavbarComponent {...props}/>
            <div id="camera" ref={cameraRef}>
              <video id="stream" width="100%" height="450" ref={streamRef}></video>
              <div onClick={() => btnCapture()}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <canvas id="canvas" width="1920" height="1080" ref={canvasRef}></canvas>
            <div id="snapshot" ref={snapshotRef}>
              <img src={preImage} alt="" id="img1" width="100%" ref={previewImageRef}/>
            </div>
            <div className="button-group">
              <button id="btnStream" type="button" className="button" onClick={() => btnStream()}>ถ่ายรูป</button>
              <label id="picture" htmlFor="file" className="label custom-file-upload">เพิ่มรูปภาพ</label>
              <input id="file" name="file" type="file" accept="image/*" onChange={fileInput}/>
            </div>
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
  );
}

export default App;
