const express = require('express');
const { userRouter } = require('./user');
const { accountRouter } = require('./account');
const { authMiddleware } = require("../middleware");
const { User } = require("../db");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.get("/me", authMiddleware, async (req, res) => {
    // if(req.userId){
        
    // }
    // else{
    //     res.status(411).json({
    //         success: false
    //     })
    // }
    const user = await User.findOne({
        _id: req.userId
    });

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        success: true
    })
})

module.exports = router;