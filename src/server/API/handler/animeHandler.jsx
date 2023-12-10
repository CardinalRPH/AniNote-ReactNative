import axios from "axios"
import BaseURL from "../config/config"

// we need cache
export const getAnimeSearch = async (keyword) => {
    try {
        const response = await axios.get(`${BaseURL}anime`, {
            params: {
                q: keyword
            }
        })
        return response.data;
    } catch (error) {
        return error
    }
}

export const getAnimeFull = async (animeId) => {
    try {
        const response = await axios.get(`${BaseURL}anime/${animeId}/full`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const getAnimeCharCast = async (animeId) => {
    try {
        const response = await axios.get(`${BaseURL}anime/${animeId}/characters`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const getAnimeStaff = async (animeId) => {
    try {
        const response = await axios.get(`${BaseURL}anime/${animeId}/staff`)
        return response.data;
    } catch (error) {
        return error
    }
}

export const getAnimeRecomend = async (animeId) => {
    try {
        const response = await axios.get(`${BaseURL}anime/${animeId}/recommendations`)
        return response.data;
    } catch (error) {
        return error
    }
}