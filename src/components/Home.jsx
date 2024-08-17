import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from './TodoItem';
import { Navigate } from 'react-router-dom';

export const Home = () => {

  const[title,setTitle] = useState('');
  const[description,setDescription] = useState('');
  const[loading,setLoading] = useState('');
  const[tasks,setTasks] = useState([]);
  const[refresh,setRefresh] = useState(false);

  const{isAuthenticated} = useContext(Context);

  const updateHandler = async(id)=>{
    try {
     const {data} =  await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true,
      })
      toast.success(data.message);
      setRefresh(prev => !prev);
    } catch (e) {
      // toast.error(e.response.data.message)
    }
  }
  const deleteHandler = async(id)=>{
    try {
      const {data} =  await axios.delete(`${server}/task/${id}`,{
         withCredentials:true,
       })
       toast.success(data.message);
       setRefresh(prev => !prev);
     } catch (e) {
       toast.error(e.response.data.message)
     }
   }
  

  const submitHandler = async(e)=>{
    e.preventDefault() ;
    setLoading(true);
    try {
       const {data} = await axios.post(`${server}/task/new`,{
        title,description,
       },{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json",
        }
       })
       setTitle("");
       setDescription("");
       toast.success(data.message);
       setLoading(false);
       setRefresh(prev => !prev);
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false);
    }
  }

  useEffect(()=>{
    axios.get(`${server}/task/my`,{
      withCredentials:true, 
    }).then((res)=> { setTasks(res.data.tasks)} )
    .catch((error)=> { toast.error(error.response.data.message)} ); 
  },[refresh]);

  if(!isAuthenticated) { return <Navigate to={"/login"}/>}
  
  return (
    <div className="container w-[100%] h-[100vh] py-[5rem] px-[2rem] bg-[#e7e7e7] m-auto">
      
      <div className='login'>
        <section>
      <form onSubmit={submitHandler}>
            <input value={title} onChange={(e)=> setTitle(e.target.value)} type='text' placeholder='Title' required
            />
            <input value={description} onChange={(e)=> setDescription(e.target.value)} type='text' placeholder='Description' required/>
            <button disabled={loading} type='submit'>Add Task</button>
            </form>
            </section>
            </div>
      <section className="todosContainer"> 
        {
          tasks.map((i)=>(
            <TodoItem title={i.title} description={i.description} isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
            key={i._id}
            setRefresh={setRefresh} 
            />
          ))
        }
      </section>
    </div>
  )
      }
