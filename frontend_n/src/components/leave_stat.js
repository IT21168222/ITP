import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

export default function AllLeaves(){

    const params = useParams();
    const id = params.id;
    const[leaves, setLeaves] = useState([]);
    useEffect(() =>{
        function getLeaves(){
            axios.get("http://localhost:8070/leave/").then((res) => {
                setLeaves(res.data);
            }).catch((error) =>{
                alert(error.message);

            })
        }

        getLeaves();
    }, [])


    
    function onDelete(id) {
          axios.delete(`http://localhost:8070/leave/delete/${id}`)
            .then((res) => {
              alert("Deleted Successfully!");
              this.getLeaves();
            })
            .catch((error) => {
              console.error("Error deleting leave:", error);
            });
    }

    return(
        <div className="container">
        <h1>Leave List</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Remarks</th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((leave, index) => (
                <tr>        
                     <th scope="row">{index+1}</th>
                     <td>{leave.name}</td>
                     <td>{leave.date}</td>
                     <td>{leave.type}</td>
                     <td>{leave.remarks}</td>
                     <td>
                        <a className='btn btn-warning' href={`get/${leave._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>&nbsp;
                        <a className='btn btn-danger'  onClick={() => onDelete(`${leave._id}`)}>
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