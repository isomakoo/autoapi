import './App.css'
import Home from "./home";
import Location from "./Location";
import Cars from "./Cars";
import Brend from "./Brend";
import Model from "./Model";
import Login from "./Login";
import City from "./City";
import Catigories from "./Catigories";
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
     <Routes>
            <Route path="/location" element={<Location />} />
            <Route path="/" element={<Login/>} />
            <Route path="/brend" element={<Brend />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/model" element={<Model />} />
            <Route path="/city" element={<City />} />
            <Route path="/home" element={<City />} />
            <Route path="/catigories" element={<Catigories />} />
          </Routes>
    </>
  )
}

export default App
