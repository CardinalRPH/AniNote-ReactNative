import { createContext, useContext, useState } from "react";

const CusStateDataContex = createContext();

export const CusStateDataProvider = ({ children }) => {
    const [cusStateData, setCusStateData] = useState([])

    const value = {
        cusStateData,
        setCusStateData
    }

    return (
        <CusStateDataContex.Provider value={value}   >
            {children}
        </CusStateDataContex.Provider>
    )
}

export const useDataAll = () => {
    return useContext(CusStateDataContex)
}