import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// register user in mongoDb data base
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All field required" });
    }

    // checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: false, message: "User already exists" });
    }

    // hashing passwword using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // crating users in mongo
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({
        status: true,
        message: "User registered successfully ",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
    console.log("error", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking all field required
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    // checking is password and email invalid or not
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    // compare hashed password and real password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }

    // genrating jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({
        status: true,
        message: "Login successfully",
        user: { id: user._id, name: user.name, email: user.email },
        token,
      });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server Error" });
  }
};

export { registerUser, loginUser };
