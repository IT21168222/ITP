const router = require("express").Router();
let Attendance = require("../models/attendance");
let Employee = require("../models/employee");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const employeeId = req.body.employeeId;
    const status = req.body.status;
    const date = req.body.date;
    const time_in = req.body.time_in;
    const time_out = req.body.time_out;
    
    const newAttendance = new Attendance({
        name,
        employeeId,
        status,
        date,
        time_in,
        time_out

    })

    newAttendance.save().then(() => {
        res.json("Attendance Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Attendance.find().then((attendances) => {
        res.json(attendances)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {name, employeeId, status, date, time_in, time_out} = req.body; // names in front end
    const updateAttendance = {
        name,
        employeeId,
        status,
        date,
        time_in,
        time_out
    }

    const update = await Attendance.findByIdAndUpdate(userId, updateAttendance).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})



// QR update part
router.route("/updateAttendance/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {time_in} = req.body; // names in front end
    const updateAttendance = {
        employeeId : userId,
        time_in
    }

    const update = await Attendance.findByIdAndUpdate(userId, updateAttendance).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})





router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Attendance.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Attendance.findById(userId)
    .then((attendance) => {
        res.status(200).send({status: "User Fetched!", attendance});
    }).catch((error) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

router.route("/add/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Employee.findById(userId)
    .then((employee) => {
        res.status(200).send({status: "User Fetched!", employee});
    }).catch((error) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

module.exports = router;