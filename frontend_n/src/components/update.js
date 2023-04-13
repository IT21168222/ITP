import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";



export default function EditEmployee(){


    const params = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    useEffect(() =>{
        function getEmployee(){
            axios.get(`http://localhost:8070/employee/get/${params.id}`).then((res) => {
                setName(res.data.employee.name);
                setAddress(res.data.employee.address);
            }).catch((error) =>{
                alert(error.message);

            })
        }

        getEmployee();



    }, [])

    function updateData(e){
        e.preventDefault();//prevent normal behaviour
        const newEmployee = {
            name,
            address
        }
        axios.put(`http://localhost:8070/employee/update/${params.id}`, newEmployee).then(() => {
            alert("Employee Updated!");
            setName("");
            setAddress("");
        }).catch((error)=>{
            alert(error)
        })


    }


    return(
        <div className="container">
        <form onSubmit={updateData}>
            <div className="form-group">
                <label for="name">Name</label>
                <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter address" value={address} onChange={(e) => {
                    setAddress(e.target.value);
                }} />
            </div>
           
            <button type="Submit" className="btn btn-primary">Update</button>
        </form>
        </div>
    )
}