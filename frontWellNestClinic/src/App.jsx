import LandingPage from './components/LandingPage/LandingPage';
import HomePages from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar';
import {Route, Routes, useLocation} from "react-router-dom";
import CheckUser from './components/CheckUser/CheckUser'
import Appoiment from './pages/apoiment/Appoiment';
import MySchedulePage from './pages/mySchedule/MySchedulePage';
import LoginPages from './pages/Login/LoginPages'
import SignUp from './pages/SignUp/SignUp';
import MyProfilePage from './pages/MyProfile/MyProfilePage';
import './App.css'


function App() {
  const { pathname } = useLocation();
  const noNavBar = ['/', "/checkUser", "/login", "/sign-up"]
  
  return (
    <div>
      {!noNavBar.includes(pathname) && <NavBar/>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/home" element={<HomePages/>} />
        <Route path='/checkUser' element={<CheckUser/>} ></Route>
        <Route path='/makeAppoiment' element = {<Appoiment/>} ></Route>
        <Route path='/appointments' element = {<MySchedulePage/>} ></Route>
        <Route path='/login' element={<LoginPages/>} ></Route>
        <Route path='/sign-up' element={<SignUp/>} ></Route>
        <Route path='/my-profile' element={<MyProfilePage/>} ></Route>
      </Routes>
    </div>
  )
}

export default App;
