import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import FormComponent from './components/FormComponent'
import UsersRegisterComponent from './components/UsersRegisterComponent'
import LoginComponent from './components/LoginComponent'
import AdminConsoleComponent from './components/AdminConsoleComponent'
import { getUser } from "./services/authorize";
import NotFoundComponent from './components/NotFoundComponent'
import DownloadPDFComponent from './components/DownloadPDFComponent'
import TutorialComponent from './components/TutorialComponent'

const MyRoute = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/form' element={<FormComponent />}></Route>
                <Route path='/register' element={<UsersRegisterComponent />}></Route>
                <Route path='/login' element={<LoginComponent />}></Route>
                <Route path='/admin/*' element={ getUser() ? <AdminConsoleComponent /> : <Navigate to="/login" /> }></Route>
                <Route path='/pdf' element={<DownloadPDFComponent />}></Route>
                <Route path='*' element={<NotFoundComponent />}></Route>
                <Route path='/tutorial' element={<TutorialComponent />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute;