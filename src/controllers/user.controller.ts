import httpStatus from "http-status";
import { UserTokenInfo } from "../modals/token.modal";
import { User } from "../modals/user.modal";
import { UserService } from "../services";
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { UserSecretKeySchema } from "../schemas";
dotenv.config();


export const register = async (req, res) => {
    try {
        const user = await UserService.registerUser(req.body);
        return res.status(httpStatus.CREATED).send({
            isSuccess: true,
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
            isSuccess: false,
            data: null,
            message: 'Failed to register user',
            error: error.message
        });
    }
};


export const login = async (req, res) => {
    try {
        const userBody: any = req.body;

        // Check if the user exists by email
        const user: any = await User.findOne({ email: userBody.email });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send({
                isSuccess: false,
                message: 'User not found',
                data: null
            });
        }

        // If user exists, check if password matches
        const isMatch = await user.isPasswordMatch(userBody.password);

        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                isSuccess: false,
                message: 'Email or password is incorrect',
                data: null
            });
        }

        // If both email and password are correct, generate JWT token
        const token = jwt.sign(
            {
                UID: user._id,
                email: user.email
            },
            process.env.SECRET_KEY as string, // Ensure SECRET_KEY is defined
            { expiresIn: '24h' } // Token expiration time
        );

        // Check if the UID already has a token record
        const UIDExist = await UserTokenInfo.findOne({ UID: user._id });

        if (UIDExist) {
            UIDExist.Token = [token];
            await UIDExist.save();
        } else {
            await UserTokenInfo.create({
                UID: user._id,
                Token: [token]
            });
        }

        return res.status(httpStatus.OK).send({
            isSuccess: true,
            message: 'Login successful',
            data: {
                UID: user._id,
                token,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).send({
            isSuccess: false,
            data: null,
            message: 'Failed to login',
            error: error.message
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const { UID } = req.user;

        const user = await User.findById(UID);

        if (!user) {
            return res.status(404).json({
                isSuccess: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            isSuccess: true,
            message: 'User data retrieved successfully.',
            data: {
                UID: user._id,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: 'Failed to retrieve user data.',
            error: error.message
        });
    }
};
