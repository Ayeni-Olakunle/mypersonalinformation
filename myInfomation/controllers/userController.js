const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asynHandler = require("express-async-handler")
const User = require("../model/usersModel");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

const registerUser = asynHandler(async (req, res) => {
    const { name, email, phoneNumber, password } = req.body
    if (!name || !email || !password || !phoneNumber) {
        res.status(404)
        throw new Error("Please add all required fields")
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});

const loginUser = asynHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const currentUser = asynHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}