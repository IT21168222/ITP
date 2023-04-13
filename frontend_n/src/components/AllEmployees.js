import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
export default function AllEmployees(){

    const params = useParams();
    const id = params.id;
    const[employees, setEmployees] = useState([]);
    useEffect(() =>{
        function getEmployees(){
            axios.get("http://localhost:8070/employee/").then((res) => {
                setEmployees(res.data);
            }).catch((error) =>{
                alert(error.message);

            })
        }

        getEmployees();



    }, [])


    
    function onDelete(id) {
          axios.delete(`http://localhost:8070/employee/delete/${id}`)
            .then((res) => {
              alert("Deleted Successfully!");
              this.getEmployees();
            })
            .catch((error) => {
              console.error("Error deleting employee:", error);
            });
        }
    

    return(
        <div className="container">
        <h1>Employee List</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                <tr>
                     <th scope="row">{index+1}</th>
                     <td>{employee.name}</td>
                     <td>{employee.address}</td>
                     <td>
                        <a className='btn btn-warning' href={`get/${employee._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>&nbsp;
                        <a className='btn btn-danger'  onClick={() => onDelete(`${employee._id}`)}>
                            <i className='fas fa-trash-alt'></i>&nbsp;Delete
                        </a>
                     </td>
                </tr>
                 ))}
                
            </tbody>

        </table>
      </div>
        
    )
}