import { createContext, useContext, useState } from "react";

const ReadDataStateContext = createContext();

export const ReadDataStateProvider = ({ children }) => {
    const [fullAniData, setFullAniData] = useState(null)
    const [charsAniData, setCharsAniData] = useState([])
    const [staffAniData, setStaffAniData] = useState([])
    // const [aniMoreInfo, setAniMoreInfo] = useState('')
    const [aniRecomend, setAniRecomend] = useState([])
    const [aniToAdd, setAniToAdd] = useState(null)

    const value = {
        fullAniData,
        setFullAniData,
        charsAniData,
        setCharsAniData,
        staffAniData,
        setStaffAniData,
        // aniMoreInfo,
        // setAniMoreInfo,
        aniRecomend,
        setAniRecomend,
        aniToAdd,
        setAniToAdd
    }

    return (
        <ReadDataStateContext.Provider value={value}>
            {children}
        </ReadDataStateContext.Provider>
    )
}

export const useReadData = () => {
    return useContext(ReadDataStateContext)
}