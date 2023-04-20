import React, {useState} from "react"
import axios from "axios";

export default function AddLeave(){


    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [remarks, setRemarks] = useState("");
    
    function sendData(e){
        e.preventDefault();//prevent normal behaviour
        const newLeave = {
            name,
            date,
            type,
            remarks    
        }
        //alert("Hi" + name)
        axios.post("http://localhost:8070/leave/add", newLeave).then(() => {
            alert("Leave Added!");
        }).catch((error)=>{
            alert(error)
        })

    }

    return(
        <div className="container">
        <form onSubmit={sendData}>
            <div className="form-group">
                <label for="name">Name</label>
                <input className="form-control" id="name" placeholder="Type here..." onChange={(e) => {
                    setName(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="date">Date</label>
                <input type="text" className="form-control" id="date" placeholder="Type here..." onChange={(e) => {
                    setDate(e.target.value);
                }} />
            </div>    
            <div className="form-group">
                <label for="type">Type</label>
                <input type="text" className="form-control" id="type" placeholder="Type here..." onChange={(e) => {
                    setType(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="remarks">Remarks</label>
                <input type="text" className="form-control" id="remarks" placeholder="Type here..." onChange={(e) => {
                    setRemarks(e.target.value);
                }} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}