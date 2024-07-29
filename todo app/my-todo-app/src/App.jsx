import { useState, useEffect } from 'react'
import './App.css'
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

function App() {
  const [isTodo, setIsTodo] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleToggle = () => {
    setIsTodo(!isTodo);
    setIsCompleted(!isCompleted);
  };

  const handleChangeOfTitle = (e) => {
    setNewTitle(e.target.value);
  }

  const handleChangeOfDescription = (e) => {
    setNewDescription(e.target.value);
  }

  const handleAddTodo = () => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let AddedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;


    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      AddedOn: AddedOn
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);

    setAllTodos(updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  }

  const handleDeleteTodoInCompletedWindow = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completelist', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  const handleCompletedTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);

    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('completelist', JSON.stringify(updatedCompletedArr));
    handleDeleteTodo(index);
  }


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompleteTodo = JSON.parse(localStorage.getItem('completelist'));
    if(savedTodo) {
      setAllTodos(savedTodo);
    }
    if(savedTodo) {
      setCompletedTodos(savedCompleteTodo);
    }
  }) 
  
  return (
    <>
    <div>
      <h1 className="text-2xl font-bold items-center mt-6 text-center">
        My Todos
      </h1>
      <div className='todo-data bg-slate-700 p-10 w-fit ml-auto mr-auto mt-4 max-h-screen overflow-auto shadow-md'>
        <div className='todo-input flex items-center justify-center border-b-2 pb-6 mb-6 border-teal-300'>
          <div className='todo-input-items flex flex-col mr-6 items-start'>
            <label className='font-bold mt-2 mb-3' >Title :</label>
            <input type='text' value={newTitle} onChange={handleChangeOfTitle} placeholder="What's the task title" className='w-60 p-1 outline-none focus:border-4 text-black focus:border-gray-500'/>
          </div>
          <div className='todo-input-items flex flex-col mr-6 items-start'>
            <label className='font-bold mt-2 mb-3'>Description :</label>
            <input type='text' placeholder="What's the description of task" className='w-60 p-1 outline-none focus:border-4 focus:border-gray-500 text-black' value={newDescription} onChange={handleChangeOfDescription}/>
          </div>
          <div>
            <button type='button' title='Add' className='btnAdd mt-11 rounded-md bg-orange-600 p-1 w-16 hover:bg-orange-300' onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        <div className='btn-area mt-12'>
          <button className={`btnAdd mt-2 p-1 w-16 cursor-pointer ${isTodo ? 'bg-red-500' : 'bg-gray-600'}`} onClick={handleToggle}>Todo</button>
          <button className={`btnAdd mt-2 p-1 w-24 cursor-pointer ${isCompleted ? 'bg-red-500' : 'bg-gray-600'}`} onClick={handleToggle}>Completed</button>
        </div>
        <div className='todo-list flex flex-col mt-2'>
          
          {isCompleted===false && allTodos.map((item, index) => { 
            return (
              <>
                <div className='todo-list-item flex bg-slate-500 justify-between p-6 pb-1 pt-1 mb-2 mt-4 h-32 items-center'>
                  <div className='flex flex-col pt-3 pb-3'>
                    <h3 
                    className='text-2xl font-bold text-yellow-400 mt-0'
                    >
                      {item.title}
                    </h3>
                    <p className='mt-2 text-sm text-green-400 mb-3'>{item.description}</p>
                    <p className='mb-2'><small>Add on: {item.AddedOn}</small></p>
                  </div>
                  <div className='flex p-5'>
                    <MdDeleteOutline className='text-3xl cursor-pointer hover:text-red-400' onClick={()=>handleDeleteTodo(index)} title='Deleted'/>
                    <FaCheck className='text-3xl ml-4 cursor-pointer hover:text-green-400' onClick={()=>handleCompletedTodo(index)} title='Completed'/>
                  </div>
                </div>
              </>
            )
          })}
        

          {isCompleted===true && completedTodos.map((item, index) => {
            return (
              <>
                <div className='todo-list-item flex bg-slate-500 justify-between p-6 pb-1 pt-1 mb-2 mt-4 h-32 items-center'>
                  <div className='flex flex-col pt-3 pb-3'>
                    <h3 className='text-2xl font-bold text-yellow-400 mt-0'>{item.title}</h3>
                    <p className='mt-2 text-sm text-green-400 mb-3'>{item.description}</p>
                    <p className='mb-2'><small>Completed On: {item.completedOn}</small></p>
                  </div>
                  <div className='flex p-5'>
                    <MdDeleteOutline className='text-3xl cursor-pointer hover:text-red-400 mr-1' onClick={()=>handleDeleteTodoInCompletedWindow(index)} title='Delete'/>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
