import logo from '../assets/logo.png'

const Header = () => {
   return (
      <header className='header'>
         <div className='logo-box'>
            <img src={logo} alt="logo" className='logo-img' />
            <div className='logo-text'>
               <p>DITSAMAPTA</p>
               <p>POLDA LAMPUNG</p>
            </div>
         </div>
         <nav>
            <ul className='nav-list'>
               <li className='list-item'><a href="">Beranda</a></li>
               <li className='list-item'><a href="">Tentang</a></li>
               <li className='list-item'><a href="">Galeri</a></li>
               <li className='list-item'><a href="">Login</a></li>
            </ul>
         </nav>
      </header>
   )
}

export default Header