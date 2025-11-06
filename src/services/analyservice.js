import { ANALYSE_BASE_URL } from "../../constants/Apiconstants";
import client from "./client";


export function analyse(formdata){
    return client.post(ANALYSE_BASE_URL,formdata);
}