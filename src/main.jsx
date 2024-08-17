import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import { createContext } from 'react'
import { useState } from 'react'

export const server = "https://nodejs-todoapp-yor3.onrender.com"
export const Context = createContext();
// https://nodejs-todoapp-yor3.onrender.com
// http://localhost:4000

const AppWrapper=()=>{
  const[isAuthenticated,setIsAuthenticated] = useState(false)
  const[Loading,setLoading] = useState(false);
  const[user,setUser]=useState({});
  return(
    <Context.Provider value={{ isAuthenticated,setIsAuthenticated,Loading,setLoading,user,setUser}}>
    <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
