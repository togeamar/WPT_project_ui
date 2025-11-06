
import { ADMIN_BASE_URL } from "../../constants/Apiconstants";
import client from "./client";

export async function doAdminLogin(logindata){
    return client.post(`${ADMIN_BASE_URL}/login`,logindata);
} 

export async function doAdminSignUp(signupdata){
    return client.post(`${ADMIN_BASE_URL}/signup`,signupdata);
}

export async function  getScore(){
    return client.get(`${ADMIN_BASE_URL}/getscore`);
}

export async function getAdmins(){
    return client.get(`${ADMIN_BASE_URL}/getadmins`);
}

export async function deleteAdmin(email){
    console.log(email);
    return client.post(`${ADMIN_BASE_URL}/deleteadmin`,{email});
}
