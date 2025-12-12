import React, { createContext, useContext, useState } from 'react'


export const searchKeyContext = createContext()
export const adminProfileContext = createContext()
export const userProfileContext = createContext()

const ContextShare = ({ children }) => {

    const [searchKey, setSearchKey] = useState('')
    const [adminProfile, setAdminProfile] = useState({})
    const [userProfile, setUserProfile] = useState({})

    return (
        <userProfileContext.Provider value={{userProfile,setUserProfile}}>
            <adminProfileContext.Provider value={{adminProfile,setAdminProfile}}>
                <searchKeyContext.Provider value={{ setSearchKey, searchKey }}>
                    {
                        children        //here it will be the app component so that every componet can access this data
                    }
                </searchKeyContext.Provider>
            </adminProfileContext.Provider>
        </userProfileContext.Provider>
    )
}

export default ContextShare