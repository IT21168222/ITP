import React, {useState} from "react"
import axios from "axios";

export default function AddPayroll(){


    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [casual_leave, setCasual_leave] = useState("");
    const [medical_leave, setMedical_leave] = useState("");
    const [bonus, setBonus] = useState("");
    const [tax, setTax] = useState("");
    
    function sendData(e){
        e.preventDefault();//prevent normal behaviour
        const newPayroll = {
            name,
            salary,
            casual_leave,
            medical_leave,
            bonus,
            tax
    
        }
        //alert("Hi" + name)
        axios.post("http://localhost:8070/payroll/add", newPayroll).then(() => {
            alert("Payroll Added!");
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
                <label for="salary">Salary</label>
                <input type="text" className="form-control" id="salary" placeholder="Type here..." onChange={(e) => {
                    setSalary(e.target.value);
                }} />
            </div>    
            <div className="form-group">
                <label for="casual_leave">Casual Leave</label>
                <input type="text" className="form-control" id="casual_leave" placeholder="Type here..." onChange={(e) => {
                    setCasual_leave(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="medical_leave">Medical Leave</label>
                <input type="text" className="form-control" id="medical_leave" placeholder="Type here..." onChange={(e) => {
                    setMedical_leave(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="bonus">Bonus</label>
                <input type="text" className="form-control" id="bonus" placeholder="Type here..." onChange={(e) => {
                    setBonus(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="tax">Tax(%)</label>
                <input type="Number" className="form-control" id="tax" placeholder="Type here..." onChange={(e) => {
                    setTax(e.target.value);
                }} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}