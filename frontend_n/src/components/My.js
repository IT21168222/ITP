import React, { Component } from 'react';
import { QrReader as QrReader } from 'react-qr-reader';
import axios from "axios";
import Swal from "sweetalert2";


class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrData: '',
      employeeId: 'qwafwegfd',
      name: "",
      status: "",
      time_in: "",
      time_out: "",

    };
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrData: data,
      });
    }
  }

  handleError = (error) => {
    console.error(error);
  }

  handleDecode = (result) => {
    if (result) {
      this.setState({
        qrData: result.text, // access text property only
      });
    }
  }

  onUpdate = (id) => {
    const newAttendance = {
      time_in: Date,
    };
    axios
      .put(`http://localhost:8070/attendance/updateAttendance/${id}`, newAttendance)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Update Successfully!",
          confirmButtonText: "OK",
          onConfirm: () => { },
        }).then(this.refreshPage);
      })
      .catch((error) => {
        alert(error);
      });
  };

  refreshPage = () => {
    window.location.reload();
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const newAttendance = {
      name: this.state.name,
      employeeId: this.state.employeeId,
      status: this.state.status,
      time_in: this.state.time_in,
      time_out: this.state.time_out,
    };
    axios
      .post("http://localhost:8070/attendance/add", newAttendance)
      .then(() => {
        alert("Attendance Added!");
      })
      .catch((error) => {
        alert(error);
      });
  };


  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //   });
  // };
  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })
  }

  render() {
    const { qrData } = this.state;

    return (
      <div className="dashboard-app container">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          onResult={this.handleDecode}
          style={{ width: '10% !important', margin: '0 auto' }}
        />

        <form className="row gy-2 gx-3 align-items-center" onSubmit={this.handleSubmit}>
          <div className="">
            <label className="visually-hidden" for="autoSizingInput">ID</label>
            <input type="text" className="form-control" id="autoSizingInput" placeholder="Jane Doe" name="employeeId" value={qrData} onChange={this.handleInputChange} />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}




export default Attendance;