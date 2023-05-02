import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function AddAttendance() {

    const params = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [status, setAttendance] = useState("");
    const [date, setDate] = useState("");
    const [time_in, setTime_in] = useState("");
    // const [time_in, setFinal] = useState(Date);
    const [final, setDateTime] = useState();
    const [time_out, setTime_out] = useState("");
    const [employeeId, setId] = useState("");

    useEffect(() => {
        if (params.id) {
            function getAttendance() {
                axios.get(`http://localhost:8070/attendance/add/get/${params.id}`).then((res) => {
                    setName(res.data.employee.name);
                    setId(res.data.employee._id);
                }).catch((error) => {
                    alert(error.message);

                })
            }

            getAttendance();
        }


    }, [])

    function sendData(e) {
        e.preventDefault();//prevent normal behaviour
        const newAttendance = {
            name,
            employeeId,
            status,
            date,
            time_in,
            time_out

        }
        // (time_in)alert
        //alert("Hi" + name)
        axios.post("http://localhost:8070/attendance/add", newAttendance)
        Swal.fire({
            icon: "success",
            title: "Attendance Added!",
            confirmButtonText: "OK",
            onConfirm: () => {

            },
        }).then(() => navigate("/attendance/"))
        // .then(() => {
        //     alert("Attendance Added!");
        // })
        .catch((error) => {
            alert(error)
        })


    }


    // const handleDateTimeChange = (event) => {
    //     setDateTime(event.target.value);

    //     // Set the time of the selected date to the current time
    //     const currentDateTime = new Date();
    //     currentDateTime.setHours(time_in.getHours());
    //     currentDateTime.setMinutes(time_in.getMinutes());
    //     currentDateTime.setSeconds(time_in.getSeconds());

    //     setFinal(currentDateTime);
    // };


    return (
        <div className="dashboard-app container">

            <form onSubmit={sendData}>
            <h1>Add Attendance</h1>
                <div className="form-group">
                    <label for="employeeId">ID</label>
                    <input className="form-control" id="employeeId" placeholder="Enter employee Id" value={employeeId} onChange={(e) => {
                        setId(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input className="form-control" id="name" placeholder="Enter name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="status">Status</label>
                    <input type="text" className="form-control" id="status" placeholder="Enter status" onChange={(e) => {
                        setAttendance(e.target.value);
                    }} />
                </div>
                {/* <div className="form-group">
                    <label for="time_in">Time In</label>
                    <input type="text" className="form-control" id="time_in" placeholder="Enter time" onChange={(e) => {
                        setTime_in(e.target.value);
                    }} />
                </div> */}
                <div className="form-group">
                    <label for="date">Date</label>
                    <input type="date" className="form-control without_ampm" id="date" placeholder="Enter date" onChange={(e) => {
                        setDate(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="time_in">Time In</label>
                    <input type="time" className="form-control without_ampm" id="time_in" placeholder="Enter time" onChange={(e) => {
                        setTime_in(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label for="time_out">Time Out</label>
                    <input type="time" className="form-control" id="time_out" placeholder="Enter time" onChange={(e) => {
                        setTime_out(e.target.value);
                    }} />
                </div>
                {/* <div>
                    <label htmlFor="time_in">Select a date and time:</label>
                    <input
                        type="datetime-local"
                        id="final"
                        name="final"
                        value={final}
                        // onChange={handleDateTimeChange}
                    />
                </div> */}

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}