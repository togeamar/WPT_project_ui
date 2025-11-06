import { USER_BASE_URL } from "../../constants/Apiconstants";
import client from "./client";

export function doLogin(logindata){
    return client.post(`${USER_BASE_URL}/login`,logindata);
}

export function doSignup(signupdata){
    return client.post(`${USER_BASE_URL}/signup`,signupdata);
}