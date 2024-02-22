const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User, Account} = require("../db");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().min(1),
    lastName: zod.string().min(1)
})

userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    });

    if(user){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const dbUser = await User.create(body);
    const userId = dbUser._id;

    await Account.create({
        userId,
        balance: 1 + 1000 * Math.random()
    })

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    res.json({
        message: "User Created Successfully",
        token: token
    })
});


const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

userRouter.post("/signin", async (req, res) => {
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    });
    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
    
        res.json({
            token: token
        })
        return;
    }
    
    res.status(411).json({
        message: "User Not Found!!"
    });
});

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

userRouter.put("/", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const updatedInfo = req.body;

    const {success} = updateSchema.safeParse(updatedInfo);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne({
        _id: userId
    }, updatedInfo);
    
    res.json({
        message: "Updated successfully" 
    })
})

userRouter.get("/bulk", async (req, res) =>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                '$regex': filter,
                '$options': 'i'
            }
        }, {
            lastName: {
                '$regex': filter,
                '$options': 'i'
            }
        }]
    });

    res.json({
        users: users.map((item) => {
            return {
                username: item.username,
                firstName: item.firstName,
                lastName: item.lastName,
                _id: item._id
            }
        })
    })
})

module.exports = {
    userRouter
};