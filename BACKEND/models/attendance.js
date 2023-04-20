const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    time_in : {
        type : String,
        required : true
    },
    time_out : {
        type : String,
        required : true
    }
})

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;