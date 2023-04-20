const router = require("express").Router();
let Leave = require("../models/leave");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    const type = req.body.type;
    const remarks = req.body.remarks;

    const newLeave = new Leave({
        name,
        date,
        type,
        remarks
    })

    newLeave.save().then(() => {
        res.json("Leave Added!")
    }).catch((err) => {
        console.log(err);
    })


})

router.route("/").get((req, res) => {
    Leave.find().then((leaves) => {
        res.json(leaves)
    }).catch((err) => {
        console.log(err)
    })
})


// update part
router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {name,date,type,remarks} = req.body; // names in front end
    const updateLeave = {
        name,
        date,
        type,
        remarks
    }

    const update = await Leave.findByIdAndUpdate(userId, updateLeave).then(() => {
        res.status(200).send({status: "User updated"});//for success
    }).catch((err) => {
        res.status(500).send({status: "Error with updating details !!!"});
    })

    

})


router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;
    await Leave.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status : "User deleted"});
    }).catch((err)=>{
        res.status(500).send({status: "Error with delete user !!!"});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const user = await Leave.findById(userId)
    .then((leave) => {
        res.status(200).send({status: "User Fetched!", leave});
    }).catch((error) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user"});
    })
})

module.exports = router;