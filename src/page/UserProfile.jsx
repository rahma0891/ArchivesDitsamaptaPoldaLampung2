import HeadMain from '../components/HeadMain'
import userImg from '../assets/foto-profil.jpg'
import './UserProfile.css'
import { Button, Skeleton } from 'antd'
import Cookies from 'js-cookie'
import { useCallback, useEffect, useState } from 'react'
import useHttp from '../hooks/use-http'
import EditProfile from '../components/EditProfile'

const UserProfile = () => {
   const { isLoading, sendRequest } = useHttp();
   const [user, setUser] = useState(null);
   const [isEditUser, setIsEditUser] = useState(false);
   const userId = Cookies.get('id');


   const onCancel = () => {
      setIsEditUser(false);
   }

   const getDetailUser = useCallback(async () => {
      sendRequest({
         url: `/api/v1/users/${userId}`,
         method: "GET",
      }, (data) => {
         setUser(data.data)
      })
   }, [sendRequest, userId])

   useEffect(() => {
      if (userId) getDetailUser();
   }, [userId, getDetailUser])



   return (
      <div className='container' >
         <HeadMain />
         {isLoading ? <Skeleton active /> : (<div className="dashboard-content">
            <h1 className='dashboard-heading'>My Profile</h1>
            <div className='box-user'>
               <img src={userImg} alt="Gambar user" />
               <div>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
               </div>
            </div>
            <Button type='primary' style={{
               marginTop: '20px',
            }}
               onClick={() => setIsEditUser(true)}
            >Ubah Profile</Button>
         </div>)}

         <EditProfile
            id={userId}
            show={isEditUser}
            onCancel={onCancel}
            getData={getDetailUser}
         />

      </div>
   )
}

export default UserProfile