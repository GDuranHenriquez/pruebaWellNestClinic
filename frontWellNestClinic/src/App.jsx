import LandingPage from './components/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import {Route, Routes, useLocation} from "react-router-dom";
import CheckUser from './components/CheckUser/CheckUser'
import Appoiment from './pages/apoiment/Appoiment';
import MySchedulePage from './pages/mySchedule/MySchedulePage';
import './App.css'


function App() {
  const { pathname } = useLocation();
  const noNavBar = ['/', "/checkUser", "/login", "/signup"]
  
  return (
    <div>
      {!noNavBar.includes(pathname) && <NavBar/>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path='/checkUser' element={<CheckUser/>} ></Route>
        <Route path='/makeAppoiment' element = {<Appoiment/>} ></Route>
        <Route path='/appointments' element = {<MySchedulePage/>} ></Route>
      </Routes>
    </div>
  )
}

export default App;
