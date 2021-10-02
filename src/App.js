import React, { useState, useRef, useEffect } from 'react';
import { TodoList } from './TodoList';
import uuidv4 from 'uuid/v4';
import './App.css';

const LOCAL_STORAGE_KEY = 'sermonApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  const toggleTodos = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }



  return (
    <>
      <div className="App">
        <div><h1>Plan Your Day</h1></div>
        <input ref={todoNameRef} type='text' className="mainInput" placeholder="Enter Your Project Here" /> <br/>
        <button onClick={handleAddTodo}>Add Project</button>
        <button onClick={handleClearTodos}>Clear Completed Projects</button>
        <div><p>{todos.filter(todo => !todo.complete).length} projects left</p></div>
        <div className="mainTodo">
          <TodoList  todos={todos} toggleTodos={toggleTodos}/>
        </div>
      </div>
    </>
  );
}

export default App;
