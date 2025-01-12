import express from "express";
import { register,login, getUser, } from "../../controllers";

const userRoute = express.Router();

userRoute.get('/getUser', getUser);

userRoute.post('/register', register);
userRoute.post('/login', login);

export default userRoute