import './App.css';
import Home from "./home";
import Location from "./Location";
import Cars from "./Cars";
import Brend from "./Brend";
import Model from "./Model";
import Login from "./Login";
import City from "./City";
import Catigories from "./Catigories";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Tokenni localStorage’dan olish
  //   const token = localStorage.getItem('accesToken');

  //   if (token) {
  //     // Agar token mavjud bo'lsa, foydalanuvchini asosiy sahifaga yo'naltirish
  //     navigate('/city');
  //   } else {
  //     // Agar token mavjud bo'lmasa, foydalanuvchini login sahifasiga yo'naltirish
  //     navigate('/');
  //   }
  // }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/location" element={<Location />} />
        <Route path="/brend" element={<Brend />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/model" element={<Model />} />
        <Route path="/city" element={<City />} />
        <Route path="/home" element={<City />} />
        <Route path="/categories" element={<Catigories />} />
      </Routes>
    </>
  );
}

export default App;
