import React, { createContext, useContext, useState } from 'react'


export const searchKeyContext = createContext()

const ContextShare = ({ children }) => {

    const [searchKey, setSearchKey] = useState('')

    return (
        <searchKeyContext.Provider value={{ setSearchKey, searchKey }}>
            {
                children        //here it will be the app component so that every componet can access this data
            }
        </searchKeyContext.Provider>
    )
}

export default ContextShare