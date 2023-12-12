import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeDataAsync = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.error(error);
    }
}

export const getDataAsync = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value !== null ? value : null

    } catch (error) {
        console.error(error);
    }
}

export const getAllDataAsync = async () => {
    try {
        const allData = await AsyncStorage.getAllKeys()
        return allData ? allData : null
    } catch (error) {
        console.error(error);
    }
}

export const deleteDataAsync = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.error(error);
    }
}