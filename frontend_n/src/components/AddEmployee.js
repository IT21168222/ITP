import React, {useState} from "react"
import axios from "axios";

export default function AddEmployee(){


    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [leaveLimit, setLeaveLimit] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    
    function sendData(e){
        e.preventDefault();//prevent normal behaviour
        if(checkPassword()){
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
            //alert("Hi" + name)
            axios.post("http://localhost:8070/employee/add", newEmployee).then(() => {
                alert("Employee Added!");
            }).catch((error)=>{
                alert(error)
            })


        }
    }
    function checkPassword() {
        
        // 👇 check if both match using if-else condition
        if (password !== confirm_password) {
          alert("Error! Password did not match.");
          return false;
        } else {
          return true;
        }
    }

    return(
        <div className="dashboard-app container">
            <legend>
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
            <div className="form-group">
                <label for="mobileNo">Mobile No</label>
                <input type="text" className="form-control" id="mobileNo" placeholder="Enter mobile No" onChange={(e) => {
                    setMobileNo(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="dob">Date of birth</label>
                <input type="text" className="form-control" id="dob" placeholder="Enter date of birth" onChange={(e) => {
                    setDOB(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email address" onChange={(e) => {
                    setEmail(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="gender">Gender</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio"  id="gender" name="gender" onChange={(e) => {
                    setGender(e.target.value);
                }} value="Male" />Male&nbsp;&nbsp;
                 <input type="radio" id="gender" name="gender" onChange={(e) => {
                    setGender(e.target.value);
                }} value="Female"/>Female
            </div>
            <div className="form-group">
                <label for="leaveLimit">Leave Limit</label>
                <input type="Number" className="form-control" id="leaveLimit" placeholder="Enter Leave Limit" onChange={(e) => {
                    setLeaveLimit(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" className="form-control" id="confirm_password" placeholder="Enter Password" onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }} />
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </legend>
        </div>
    )
}