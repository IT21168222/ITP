import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";



export default function EditEmployee() {




    const params = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [dob, setDOB] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [leaveLimit, setLeaveLimit] = useState("");
    const [password, setPassword] = useState("");

    //Attendance
    const [nameA, setNameA] = useState("");
    const [status, setStatus] = useState("");
    const [time_in, setType] = useState("");
    const [time_out, setRemarks] = useState("");
    const [attendances, setAttendances] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [Id, setId] = useState("");

    useEffect(() => {
        function getEmployee() {
            axios.get(`http://localhost:8070/employee/get/${params.id}`).then((res) => {
                setId(res.data.employee._id)
                setName(res.data.employee.name);
                setAddress(res.data.employee.address);
                setMobileNo(res.data.employee.mobileNo);
                setDOB(res.data.employee.dob);
                setEmail(res.data.employee.email);
                setGender(res.data.employee.gender);
                setLeaveLimit(res.data.employee.leaveLimit);
                setPassword(res.data.employee.password);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getEmployee();


        function getAttendances() {
            axios.get("http://localhost:8070/attendance/").then((res) => {
                setAttendances(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

        getAttendances();



    }, [])

    function setGenderRadio() {

        // 👇 check if both match using if-else condition
        if (gender !== "Male") {
            return false;
        } else {
            return true;
        }
    }


    function searchTable(attendances) {
        return attendances.filter((attendance) => {
            return (
                attendance.employeeId.toLowerCase().includes(Id)


            );
        });
    }




    return (
        <div className="dashboard-app container">
            <br /><br />
            <h1>Employee Profile</h1>
            <form>
                <div className="form-group">
                    <label for="Id">Employee ID</label>
                    <input className="form-control" id="Id" disabled placeholder="Enter name" value={Id} />
                </div>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" disabled placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="address">Address</label>
                    <input type="text" className="form-control" id="address" disabled placeholder="Enter address" value={address} onChange={(e) => {
                        setAddress(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="mobileNo">Mobile No</label>
                    <input type="text" className="form-control" id="mobileNo" disabled placeholder="Enter mobile No" value={mobileNo} onChange={(e) => {
                        setMobileNo(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="dob">Date of birth</label>
                    <input type="text" className="form-control" id="dob" disabled placeholder="Enter date of birth" value={dob} onChange={(e) => {
                        setDOB(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" disabled placeholder="Enter email address" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="genger">Gender</label>&nbsp;
                    <select id="genger" disabled onChange={(e) => { setGender(e.target.value); }} value={gender}>
                        <option value="Male" >Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="leaveLimit">Leave Limit</label>
                    <input type="Number" className="form-control" id="leaveLimit" disabled placeholder="Enter Leave Limit" value={leaveLimit} onChange={(e) => {
                        setLeaveLimit(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" disabled placeholder="Enter Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>

                {/*<button type="Submit" className="btn btn-primary">Update</button>*/}
            </form>
            <br />
            <br />
            <br />



            <h1>Attendance Records</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Time In</th>
                        <th scope="col">Time Out</th>
                    </tr>
                </thead>
                <tbody>
                    {searchTable(attendances).map((attendance, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{attendance.employeeId}</td>
                            <td>{attendance.name}</td>
                            <td>{attendance.status}</td>
                            <td>{attendance.time_in}</td>
                            <td>{attendance.time_out}</td>
                        </tr>
                    ))}

                </tbody>

            </table>



        </div>
    )
}