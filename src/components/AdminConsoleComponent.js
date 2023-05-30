import { Routes, Route } from 'react-router-dom'
import Navbar from "../administrator/Navbar";
import VitalSignsTable from '../administrator/VitalSignsTable'
import VitalSignCreate from '../administrator/VitalSignCreate'
import VitalSignEdit from '../administrator/VitalSignEdit';
import Dashboard from '../administrator/Dashboard';
import UserTable from '../administrator/UsersTable';
import UserCreate from '../administrator/UserCreate';
import UsersEdit from '../administrator/UserEdit';
import ImageTable from '../administrator/ImageTable'

const AdminConsoleComponent = () => {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='users' element={<UserTable />}></Route>
                <Route path='users/create' element={<UserCreate />}></Route>
                <Route path='users/edit/:id' element={<UsersEdit />}></Route>
                <Route path='vitalsigns' element={<VitalSignsTable />}></Route>
                <Route path='vitalsigns/create' element={<VitalSignCreate />}></Route>
                <Route path='vitalsigns/edit/:id' element={<VitalSignEdit />}></Route>
                <Route path='images' element={<ImageTable />}></Route>
            </Routes>
        </div>
    )
}
 
export default AdminConsoleComponent;