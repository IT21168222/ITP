import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AllAttendances() {

    const params = useParams();
    const id = params.id;
    const [attendances, setAttendances] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function getAttendances() {
            axios.get("http://localhost:8070/attendance/").then((res) => {
                setAttendances(res.data);
            }).catch((error) => {
                alert(error.message);

            })
        }

       getAttendances();

    }, [])
    // 


    function initialAttendance() {
        // if (true) {//attendances === []
            // Fetch the employees from your backend API
            axios.get("http://localhost:8070/employee/").then((res) => {
                setEmployees(res.data);
                // Initialize the attendance as absent for each employee
                const initialAttendanceList = employees.map((employee) => ({
                    employeeId: employee._id,
                    status: "Absent",
                }));

                // Save the initial attendance to the database using your backend API
                axios
                    .post("http://localhost:8070/attendance/add", initialAttendanceList)
                    .then((response) => {
                        alert("Initialized Successfully");
                        axios.get("http://localhost:8070/attendance/").then((res) => {
                            setAttendances(res.data);
                            refreshPage();
                        }).catch((error) => {
                            alert(error.message);
            
                        }) // Move this inside the `then` block
                        
                    });
            });

        // } else {
        //     //

        // }
    }

    function onDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/attendance/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        )
                        setAttendances(attendances.filter((i) => i._id !== id));
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            }
        })
            // .then((res) => {
            //     alert("Deleted Successfully!");
            //     this.getAttendances();
            // })
            .catch((error) => {
                console.error("Error deleting attendance:", error);
            });
    }

    function refreshPage() { window.location.reload(false); }


    function searchTable(attendances) {
        return attendances.filter((attendance) => {
            return (
                attendance.name.toLowerCase().includes(searchInput.toLowerCase())


            );
        });
    }


    return (
        <div className="dashboard-app container">
            <h1>Attendance List</h1>
            <div

                className="searchbar">
                <input
                    style={{ width: '30%', margin: '20px 0' }}

                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    placeholder="Search for Attendance by Name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Time In</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(attendances).map((attendance, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{attendance.employeeId}</td>
                            <td>{attendance.name}</td>
                            <td>{attendance.status}</td>
                            <td>{attendance.time_in}</td>

                            <td>
                                <a className='btn btn-warning' href={`get/${attendance._id}`}>
                                    <i className='fas fa-edit'></i>&nbsp;Edit
                                </a>&nbsp;
                                <a className='btn btn-danger' onClick={() => onDelete(`${attendance._id}`)}>
                                    <i className='fas fa-trash-alt'></i>&nbsp;Delete
                                </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <table className="table table-striped" style={{ borderBottom: "1px solid #ddd" }}>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Time Out</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(attendances).map((attendance, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{attendance.employeeId}</td>
                            <td>{attendance.name}</td>
                            <td>{attendance.status}</td>
                            <td>{attendance.time_out}</td>

                            <td>
                                <a className='btn btn-warning' href={`get/${attendance._id}`}>
                                    <i className='fas fa-edit'></i>&nbsp;Edit
                                </a>&nbsp;
                                <a className='btn btn-danger' onClick={() => onDelete(`${attendance._id}`)}>
                                    <i className='fas fa-trash-alt'></i>&nbsp;Delete
                                </a>
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>


            <div>
                <br />
                <br />
            </div>            <div>
                <br />
                <br />
            </div>

            <a className='btn btn-warning' href={`/attendance/add`}>
                <i className=''></i>&nbsp;Add New Attendance Manually
            </a>
            <button onClick={initialAttendance}>Initialize</button>
        </div>

    )
}