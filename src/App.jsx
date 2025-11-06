import { Routes, Route, useLocation } from 'react-router-dom';
import {Admin} from './Components/Admin'
import {Login} from './Components/Login'
import {SignUp} from './Components/SignUp'
import {Landing} from './Components/Landing'
import {Analysis} from './Components/Analysis'
import { Navigationbar } from './Components/Navigationbar';
import { PrivateRoute } from './Components/PrivateRoute';
import { RollRoute } from './Components/RollRoute';
import {ShowAdmins} from './Components/ShowAdmins'
import { AddAdmin } from './Components/AddAdmin';


function App() {

  const location=useLocation();

  return (
    <>
      {!(location.pathname === "/" || location.pathname === "/signup") && <Navigationbar />}
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/landing" element={<RollRoute allowedtype={"user"}><Landing /></RollRoute>} />
            <Route path="/admin" element={<RollRoute allowedtype={"admin"}><Admin /></RollRoute>} />
            <Route path="/showadmins" element={<RollRoute allowedtype={"admin"}><ShowAdmins /></RollRoute>} />
            <Route path="/addadmin" element={<RollRoute allowedtype={"admin"}><AddAdmin /></RollRoute>} />
            <Route path="/analysis" element={<RollRoute allowedtype={"user"}><Analysis /></RollRoute>} />
          </Route>
      </Routes>
    </>
  
      
  )
}

export default App
