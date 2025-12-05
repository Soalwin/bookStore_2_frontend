import commonApi from "./commonApi"
import { serverURL } from "./serverURL"

// register
export const registerApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/register`,reqBody)

}

// login
export const loginApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/login`,reqBody)

}

// google login
export const googleLoginApi= async(reqBody)=>{

   return await commonApi("post",`${serverURL}/google-login`,reqBody)

}

export const homeBooksApi= async()=>{

   return await commonApi("get",`${serverURL}/home-books`,'')

}



// ..............users....................

// addbook
export const addBookApi= async(reqBody,reqHeader)=>{

   return await commonApi("post",`${serverURL}/add-book`,reqBody,reqHeader)

}

export const allBooksApi= async(searchKey,reqHeader)=>{

   return await commonApi("get",`${serverURL}/all-books?search=${searchKey}`,'',reqHeader)

}

export const viewBookApi= async(id)=>{

   return await commonApi("get",`${serverURL}/view-book/${id}`)

}