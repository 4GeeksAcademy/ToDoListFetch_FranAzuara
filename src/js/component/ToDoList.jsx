import React, { useEffect, useState } from "react";

const ToDoList = () => {

    const [tasks, setTasks] = useState([]);

    useEffect (() => {  
        const options = {method: 'GET'};
        fetch('https://playground.4geeks.com/todo/users/franazuara', options)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error");
            }
            return response.json();})
        .then((data) => {
            setTasks(data.todos)})
        .catch(err => createNewUser());
        
    }, []);

    const createNewUser = () => {
        const options = {method: 'POST'};
        fetch('https://playground.4geeks.com/todo/users/franazuara', options)
        .then(response => {
            if (!response.ok){
                throw new Error("Error");
            }
            return response.json();
        })
        .then((data) => {
            setTasks([])
        })
        .catch(err => console.error(err)); 
    }

    const clearAllTasks = () => {
        const options = {method: 'DELETE'};
        fetch('https://playground.4geeks.com/todo/users/franazuara', options)
        .then(response => {
            if (!response.ok){
                throw new Error("Error");
            }
            return response.json();
        })
        .then((data) => {
            setTasks([])
        })
        .catch(err => console.error(err));
    };

    const listTasks = tasks.map((task, index) => {
        return (
        <li className="list-group-item d-flex justify-content-between" key = {task.id}>
            <div>{task.label}</div>
            <a href="#!"><i className="btn-close" onClick={()=> setTasks(tasks.filter((t, currentindex) => index !== currentindex))}></i></a>
            </li>
        )
        });

	return (
        <div className="row justify-content-center p-4 mt-2 bg-dark rounded">
            <h1 className="text-light">-LISTA DE TAREAS-</h1>
            <ul className="list-group text-start p-3 bg-warning" style={{ width: '50rem' }}>
                {listTasks}
                <li className="list-group-item bg-secondary-subtle p-1 d-flex justify-content-end" style={{fontSize: '14px'}}>{tasks.length} tareas</li>
            </ul>
            <button
                onClick={clearAllTasks}
                className="btn btn-danger mb-3"
                style={{ width: '30rem' }}
            >Borrar las tareas
            </button>
        </div>
    );
};

export default ToDoList;