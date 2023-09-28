import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,Loading,setLoading} = useContext(Context);
  // console.log(isAuthenticated);
  const logoutHandler= async ()=>{
    setLoading(true);
       try {
        console.log(server);
        await axios.get(`${server}/users/logout`,{
            withCredentials:true,
        })
        toast.success("Logged out successfully");
        setIsAuthenticated(false);
        setLoading(false);

    } catch (error) {
        toast.error(error.message);
        console.log(error.message);  
        setIsAuthenticated(true);
        setLoading(false);
    }
   };
  return (
   <nav className="header">
    <div>
        <h2>Todo App</h2>
    </div>
    <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
       
        {
          isAuthenticated?  (<button onClick={logoutHandler} disabled={Loading}className='btn'>Logout</button>) :   (<Link to={"/login"}>Login</Link>)
        }
       
    </article>
   </nav>

  )
}

export default Header