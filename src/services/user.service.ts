import httpStatus from "http-status";
import { User } from "../modals/user.modal";
import { ApiError } from "../../utils/ApiError";
import { UserCredentials } from "../schemas";

export const registerUser = async (userBody:UserCredentials) => {
    if (await User.findOne({ email: userBody.email })) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
};