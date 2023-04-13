import React, {useState} from "react"
import axios from "axios";

export default function AddEmployee(){


    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    function sendData(e){
        e.preventDefault();//prevent normal behaviour
        const newEmployee = {
            name,
            address
        }
        //alert("Hi" + name)
        axios.post("http://localhost:8070/employee/add", newEmployee).then(() => {
            alert("Employee Added!");
            setName("");
            setAddress("")
        }).catch((error)=>{
            alert(error)
        })


    }

    return(
        <div className="container">
        <form onSubmit={sendData}>
            <div className="form-group">
                <label for="name">Name</label>
                <input className="form-control" id="name" placeholder="Enter name" onChange={(e) => {
                    setName(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Enter address" onChange={(e) => {
                    setAddress(e.target.value);
                }} />
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}