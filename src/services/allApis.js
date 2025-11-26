import commonApi from "./commonApi"
import { serverURL } from "./serverURL"


export const registerApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/register`,reqBody)

}

export const loginApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/login`,reqBody)

}
