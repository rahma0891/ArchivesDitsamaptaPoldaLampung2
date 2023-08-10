import './Home.css'
import { SearchOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { message } from 'antd';
import { useState } from 'react';


const Home = () => {
   const token = Cookies.get('token')
   const navigate = useNavigate();
   const [search, setSearch] = useState('')


   const showMessage = () => {
      message.success('Logout Berhasil')
   }

   const handleLogout = () => {
      Cookies.remove('token')
      Cookies.remove('role')
      Cookies.remove('id')
      Cookies.remove('name')
      Cookies.remove('email')
      showMessage();
   }

   return (
      <>
         <header>
            <a href="#" className="logo">ARCHIVES-DITSAMAPTA</a>

            <ul className="navlist">
               <li><NavLink to='/'>Home</NavLink></li>
               <li><NavLink to='/arsip'>Pengarsipan</NavLink></li>
               {!token && <li><NavLink to='/login'>Login</NavLink></li>}
               {token && <li><NavLink to='/dashboard/statistic'>Dashboard</NavLink></li>}
               {token && <li><a style={{
                  cursor: 'pointer'
               }}
                  onClick={handleLogout}
               >Logout</a></li>}
            </ul>

            <div className="bx bx-menu" id="menu-icon"></div>
         </header >

         <section className="hero bg-hero">
            <div className="hero-text">
               <p className='hero-paragraph'>Welcome, Archives Polda Lampung</p>
               <h1 className='hero-heading'>Temukan <span className='hero-text-span'>arsip dokumen</span> terlengkap</h1>
               <p className='hero-text-paragrah'>Cari dokumen apapun yang kamu butuhkan sekarang !</p>
               <div className="form-input-search">
                  <input type="search" placeholder="search..." onChange={(e) => setSearch(e.target.value)} />
                  <button type="submit" className="search-btn" onClick={() => {
                     const data = { text: search };
                     navigate('/arsip', { state: data });
                  }} >
                     <SearchOutlined style={{
                        fontSize: '20px',
                        color: '#fff'
                     }} />
                  </button>
               </div>

            </div>
            <div className="hero-img-home">
               <img src={logo} alt="logo-polda" />
            </div>
         </section></>
   )
}

export default Home