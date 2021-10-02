import React from 'react'

export const Todo = ({ todo, toggleTodos }) => {

    const handleTodoClick = () => {
        toggleTodos(todo.id)
    }

    return (
        <div>
            <label id="todoSection">
                <input id="checkBox" type='checkbox' checked={todo.complete}  onChange={handleTodoClick}/>
                {todo.name}
            </label>    
        </div>
    )
}
