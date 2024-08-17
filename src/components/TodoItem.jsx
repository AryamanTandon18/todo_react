import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdEdit, MdOutlineDownloadDone } from "react-icons/md";
import { Context, server } from '../main'

const TodoItem = ({ title, description, isCompleted, updateHandler, deleteHandler, id,setRefresh }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = async() => {
    try {
      console.log("Line 17");
      const response = await axios.post(`${server}/task/editTask/${id}`,{editTitle,editDescription},{
        withCredentials:true,
      });
      console.log("Line 22",response);
      if (response?.data?.success) {
        toast.success("Task edited successfully");
        updateHandler({ id, title: editTitle, description: editDescription });
        setRefresh(prev => !prev);
      }
    } catch (error) {
      toast.error("Failed to edit task");
      console.log(error?.message);
    }
    setIsEdit(false);
  };

  return (
    <div className="todo" draggable>
      {isEdit ? (
        <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Edit title"
            className='w-[20rem] py-1 border-1 border-black focus:border-blue-400 active:border-blue-400'
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Edit description"
          />
        </div>
      ) : (
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      )}
      <div>
       <div>
       <input
          onChange={() => { updateHandler(id); }}
          type="checkbox"
          checked={isCompleted}
          className='w-[2rem] h-[2rem]'
        />
       </div>
        {isEdit ? (
          <MdOutlineDownloadDone className='saveIcon' onClick={handleSave} />
        ) : (
          <MdEdit className='editIcon' onClick={handleEdit} />
        )}
        <button onClick={() => { deleteHandler(id); }} className='btn'>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
