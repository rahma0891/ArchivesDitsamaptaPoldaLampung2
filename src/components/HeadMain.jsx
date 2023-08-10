import { NavLink } from 'react-router-dom'
import imgUser from '../assets/MaleUser.svg'

const HeadMain = () => {
   return (
      <div className="head-main">
         <NavLink to="/dashboard/profile"><img src={imgUser} alt="user-admin" width="32" />Admin</NavLink>
      </div>
   )
}

export default HeadMain