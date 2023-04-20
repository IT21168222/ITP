import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";



export default function EditEmployee(){


    const params = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [leaveLimit, setLeaveLimit] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    useEffect(() =>{
        function getEmployee(){
            axios.get(`http://localhost:8070/employee/get/${params.id}`).then((res) => {
                setName(res.data.employee.name);
                setAddress(res.data.employee.address);
                setMobileNo(res.data.employee.mobileNo);
                setDOB(res.data.employee.dob);
                setEmail(res.data.employee.email);
                setGender(res.data.employee.gender);
                setLeaveLimit(res.data.employee.leaveLimit);
                setPassword(res.data.employee.password);
            }).catch((error) =>{
                alert(error.message);

            })
        }

        getEmployee();



    }, [])

    function setGenderRadio() {
        
        // 👇 check if both match using if-else condition
        if (gender !== "Male") {
          return false;
        } else {
          return true;
        }
    }

    function updateData(e){
        e.preventDefault();//prevent normal behaviour
        const newEmployee = {
            name,
            address,
            mobileNo,
            dob,
            email,
            gender,
            leaveLimit,
            password
        }
        axios.put(`http://localhost:8070/employee/update/${params.id}`, newEmployee).then(() => {
            alert("Employee Updated!");
            setName("");
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
            <div className="form-group">
                <label for="mobileNo">Mobile No</label>
                <input type="text" className="form-control" id="mobileNo" placeholder="Enter mobile No" value={mobileNo} onChange={(e) => {
                    setMobileNo(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="dob">Date of birth</label>
                <input type="text" className="form-control" id="dob" placeholder="Enter date of birth" value={dob} onChange={(e) => {
                    setDOB(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email address" value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="genger">Gender</label>&nbsp;
                <select id="genger" onChange={(e) => {setGender(e.target.value);}}  value={gender}>
                    <option value="Male" >Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <label for="leaveLimit">Leave Limit</label>
                <input type="Number" className="form-control" id="leaveLimit" placeholder="Enter Leave Limit" value={leaveLimit} onChange={(e) => {
                    setLeaveLimit(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" placeholder="Enter Password" onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }} />
            </div>
           
            <button type="Submit" className="btn btn-primary">Update</button>
        </form>
        </div>
    )
}