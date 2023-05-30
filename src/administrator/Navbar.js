import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Button } from '@mui/material';
import { logout } from '../services/authorize'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import SettingsPowerIcon from '@mui/icons-material/SettingsPower';
import ImageIcon from '@mui/icons-material/Image';

export default function Navbar() {
  const navigate = useNavigate()

  const logoutButton = () => {
    Swal.fire({
      title: 'คุณต้องการออกระบบหรือไม่?',
      showDenyButton: true,
      confirmButtonText: 'ออก',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        logout(navigate('/login'))
      } 
    })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="l">
        <Toolbar disableGutters> 
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin"
            sx={{
              ml: 5,
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <AssessmentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5, mt: 0.5 }}/>
            DASHBOARD
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin/users"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <ContactEmergencyIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5, mt: 0.5 }}/>
            USERS
          </Typography>

                    <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin/images"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <ImageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5, mt: 0.5 }}/>
            IMAGES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin/vitalsigns"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
            >
            <ContentPasteIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5, mt: 0.5 }}/>
            VITAL-SIGNS
            </Typography>
          </Box>
          

          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button onClick={logoutButton} color="error" variant="contained" sx={{mr: 2}}>
                <SettingsPowerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 0.5 }}/>
                Logout
                </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
