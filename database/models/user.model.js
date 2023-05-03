const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true,
        enum: ["admin", "user"]
    },
    userName: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        minLength: 5,
        maxLength: 15

    },

    fristName: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        minLength: 2,
        maxLength: 20
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("invalid email format")
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 8,
        match: /^(?=.*\d)(?=.*[a-zA-Z]).{6,200}$/
    },

    activeStatus: {
        type: Boolean,
        default: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        match: /^\+?[1-9][0-9]{7,14}$/
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        enum: ["male", "female"]
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},
    { timestamps: true });



userSchema.methods.toJSON = function () {
    const data = this.toObject();
    delete data.__v;
    return data;
}

userSchema.pre("save", async function () {
    if (this.isModified("password"))
        this.password = await bcrypt.hash(this.password, 9);
});

userSchema.statics.loginUser = async (email, password) => {
    const userData = await userModel.findOne({ email });
    if (!userData) throw new Error("Invalid Email!");

    const matched = await bcrypt.compare(password, userData.password);
    if (!matched) throw new Error("Invalid Password!");
    return userData;
}

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT)
    this.tokens.push({ token })
    await this.save()
    return token
}

const userModel = mongoose.model("User", userSchema)
module.exports = userModel