import React , {Component, useState,useEffect} from 'react';
import { render } from 'react-dom';

import Navbar from './components/Navbar';






class Task extends Component{

    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            update:false
        };
        this.AddTask = this.AddTask.bind(this);
    }

    componentDidMount(){
        this.getTask();            
    }



    getTask=()=>{
        let tasks =fetch('/Api/tasks/')
            .then(obj=>obj.json()).then((tasks)=>{this.setState({tasks})})
            .catch((obj)=>{console.log('error')});
    }

    AddTask = (e)=>{    
        e.preventDefault();
    
        let name =e.target.form.name.value;
        let description =e.target.form.description.value;
        e.target.form.name.value = '';
        e.target.form.description.value = '';

        let newTask ={name,description};
        let oldTask =this.state.update;

        if(oldTask){
            fetch(`/Api/tasks/${oldTask}`,{
                method:'PUT',
                body:JSON.stringify(newTask),
                headers:{
                    'Acept':'application/json',
                    'Content-type':'application/json'
                }
            }).then(res => res.json()).then(json => console.log(json))
            .catch(res => res.json()).then(json => console.log(json))
        }else{
            fetch('/Api/tasks/',{
                method:'POST',
                body:JSON.stringify(newTask),
                headers:{
                    'Acept':'application/json',
                    'Content-type':'application/json'
                }
            }).then(res => res.json()).then(json => console.log(json))
            .catch(res => res.json()).then(json => console.log(json))
        }
        this.getTask();
        this.setState({update:false})
    };

    deleteTask(Task){
        if(confirm('¿Estas seguro de eliminar esto?')){
            fetch(`/Api/tasks/${Task}`,{
                method:'DELETE',
            })
            this.getTask();
        }

    }

    updateTask(Task){
        var name =document.getElementById('name')
        var description =document.getElementById('description')

        fetch(`/Api/tasks/${Task}`)
        .then(obj=>obj.json()
        .then(Task=>{
            name.value= Task.name;
            description.value= Task.description;
            this.setState({update:Task._id})
        }))


        this.getTask();
    }


    render(){
        return(
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <form className='container-fluid m-auto my-5'>
                        <div className='col-12 col-xs-10 col-lg-8 m-auto shadow p-3 '>
                                <input className='form-control-plaintext col-8  border-top-0 border-bottom border-dark p-2 my-4' type='text' id='name' name='name' placeholder='Titulo' />
                                <input  className='form-control-plaintext border-top-0  border-bottom border-dark p-2 my-4' type='textarea' id='description' name ='description'placeholder='Descripcion' />
                            <button className='btn text-light bg-dark rounded-0 mt-2 ' onClick={(e)=>{this.AddTask(e)}} type='submit'>{this.state.update ? 'Actualizar':'Agregar'}</button>
                        </div>
                    </form>
                </div>

                <div className='col-12 col-md-6'>
                    
                <div className='container-fluid m-auto my-5'>
                <div className='col-12 col-xs-10 m-auto shadow p-3 '>
                    <table className='table '>
                            <thead>
                                <tr>
                                    <th className=' text-center my-4 '>
                                        <h6>Titulo</h6>
                                    </th>

                                    <th className='text-center my-4 '>
                                        <h6>Contenido</h6>
                                    </th>
                                    <th className='text-center my-4 '>
                                        <h6>Acciones</h6>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.tasks.map((obj,key)=>{
                                        return(
                                            <tr key={obj._id}>
                                                <td className='p-2 my-4'>{obj.name}</td>
                                                <td className='p-2 my-4'>{obj.description}</td>
                                                <td className='d-flex'>     
                                                    <button className='btn btn-warning rounded-0 shadow m-auto p-1 px-2' onClick={()=>{this.updateTask(obj._id)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>

                                                    </button>
                                                    <button className='btn btn-danger  rounded-0 shadow m-auto p-1 px-2' onClick={()=>{this.deleteTask(obj._id)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                    </svg>
                                                    </button>
                                                </td>

                                            </tr>  
                                        ) 

                                    })
                                }
                            </tbody>

                                    
                    </table>

                </div>
            </div>

                </div>
            </div>
        )
    }
}



export default function App (){

    return(
        <div className='container'>
            <Navbar />            
            <Task />
        </div>
    )

}