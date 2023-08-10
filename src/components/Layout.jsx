import './Layout.css'
import { DashboardOutlined, SettingOutlined, FolderOutlined, LogoutOutlined, EditOutlined, ProfileOutlined, InboxOutlined } from '@ant-design/icons';
import chevRight from '../assets/ChevronRight.svg'
import logo from '../assets/LOGO_KORPS_SABHARA-removebg-preview2.png'
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Popconfirm, message } from 'antd';

const Layout = (props) => {
   const navigate = useNavigate();

   const showMessage = () => {
      message.success('Berhasil Logout');
   };

   const handleLogout = () => {
      Cookies.remove('token')
      Cookies.remove('role')
      Cookies.remove('id')
      Cookies.remove('name')
      Cookies.remove('email')
      showMessage();
      navigate('/')
   }

   return (
      <>
         <aside>
            <div className="sidebar">
               <div className="sidebar-brand" onClick={() => navigate('/')} style={{
                  cursor: 'pointer'
               }}>
                  <h1>Pengarsipan DITSAMAPTA</h1>
                  <img src={logo} alt="" width="48" />
               </div>
               <div className="sidebar-menu">
                  <ul>
                     <li>
                        <NavLink to="/dashboard/statistic"><DashboardOutlined /><span>Dashboard</span></NavLink>
                     </li>
                     <li className="dropdown">
                        <a href="" className="dropdown-menu"><div className="forflex"><SettingOutlined /><span>Pengaturan</span></div> <img src={chevRight} alt="dropdown-menu" width="24"
                           style={{ textAlign: 'right' }} /></a>
                        <div className="dropdown-content">
                           <NavLink to='/dashboard/profile'><ProfileOutlined />Profile</NavLink>
                           <NavLink to='/dashboard/ubahPassword'><EditOutlined />Ubah Password</NavLink>
                        </div>
                     </li>
                     <li className="dropdown">
                        <a href="" className="dropdown-menu"><div className="forflex"><FolderOutlined /><span>Pengarsipan</span></div> <img src={chevRight} alt="dropdown-menu" width="24"
                           style={{ textAlign: 'right' }} /></a>
                        <div className="dropdown-content">
                           <NavLink to='/dashboard/arsipmasuk'><InboxOutlined />Arsip Masuk</NavLink>
                           <NavLink to='/dashboard/arsipkeluar'><InboxOutlined />Arsip Keluar</NavLink>
                        </div>
                     </li>
                     <li>
                        <Popconfirm
                           title="Yakin ingin Logout?"
                           okText="Iya"
                           cancelText="Batal"
                           style={{ cursor: "pointer" }}
                           onConfirm={handleLogout}
                        >
                           <a><LogoutOutlined /><span>Logout</span></a>
                        </Popconfirm>
                     </li>
                  </ul>
                  <div id="popup-logout" className="overlay-logout">
                     <div className="popup-logout">
                        <h2>Yakin ingin keluar?</h2>
                        <a className="close-logout" href="#">&times;</a>
                        <div className="content-logout">
                           <p>Klik “Logout” jika ingin mengakhiri sesi ini.</p>
                           <div className="btn-popup">
                              <a href="">Cancel</a>
                              <a href="index.html">Logout</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </aside>

         <main className="main-dashboard">
            {props.children}
         </main >
      </>
   )
}

export default Layout