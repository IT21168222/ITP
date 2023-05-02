const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    date : {
        type : String,
        required : false
    },
    time_in : {
        type : String,
        required : false
    },
    time_out : {
        type : String,
        required : false
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;