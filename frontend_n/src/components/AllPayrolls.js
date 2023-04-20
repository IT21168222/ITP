import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
export default function AllPayrolls(){

    const params = useParams();
    const id = params.id;
    const[payrolls, setPayrolls] = useState([]);
    useEffect(() =>{
        function getPayrolls(){
            axios.get("http://localhost:8070/payroll/").then((res) => {
                setPayrolls(res.data);
            }).catch((error) =>{
                alert(error.message);

            })
        }

        getPayrolls();
    }, [])


    
    function onDelete(id) {
          axios.delete(`http://localhost:8070/payroll/delete/${id}`)
            .then((res) => {
              alert("Deleted Successfully!");
              this.getPayrolls();
            })
            .catch((error) => {
              console.error("Error deleting payroll:", error);
            });
    }
    

    return(
        <div className="container">
        <h1>Payroll List</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Salary</th>
                    <th scope="col">Casual Payroll</th>
                    <th scope="col">Medical Payroll</th>
                    <th scope="col">Bonus</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {payrolls.map((payroll, index) => (
                <tr>        
                     <th scope="row">{index+1}</th>
                     <td>{payroll.name}</td>
                     <td>{payroll.salary}</td>
                     <td>{payroll.casual_leave}</td>
                     <td>{payroll.medical_leave}</td>
                     <td>{payroll.bonus}</td>
                     <td>{payroll.tax}</td>

                     <td>
                        <a className='btn btn-warning' href={`get/${payroll._id}`}>
                            <i className='fas fa-edit'></i>&nbsp;Edit
                        </a>&nbsp;
                        <a className='btn btn-danger'  onClick={() => onDelete(`${payroll._id}`)}>
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