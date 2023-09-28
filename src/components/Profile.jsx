import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from './Loader';

const Profile = () => {
  const{user,isAuthenticated,Loading} = useContext(Context);
  return (
    Loading?<Loader/> :(
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
    </div>)
  )
}

export default Profile