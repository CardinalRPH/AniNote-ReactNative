import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import fireDb from "../config/firebaseConfig"

const noteCollection = process.env.NOTE_COLLECTION
const animeCollection = process.env.ANIME_COLLECTION

export const getSpecifiedData = async (userId, aniId) => {
    const docRef = doc(fireDb, noteCollection, userId, animeCollection, aniId.toString())
    try {
        const docSnap = await getDoc(docRef)
        return docSnap.exists() ?
            docSnap.data() :
            null
    } catch (error) {
        return error
    }
}

export const getAllData = async (userId) => {
    const dbCollection = collection(fireDb, noteCollection, userId, animeCollection)
    try {
        const docsSnap = await getDocs(dbCollection)
        return docsSnap.docs.map(doc => doc.data());
    } catch (error) {
        return error
    }
}

export const getQueryData = async (userId, queryData = { condition1: null, operator: '==', condition2: null }) => {
    const dbCollection = collection(fireDb, noteCollection, userId, animeCollection)
    const q = query(dbCollection, where(queryData.condition1, queryData.operator, queryData.condition2));
    try {
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
        return error
    }
}

export const writeData = async (userId, aniId, data) => {
    const docRef = doc(fireDb, noteCollection, userId, animeCollection, aniId.toString());
    try {
        await setDoc(docRef, data)
    } catch (error) {
        return error
    }
}

export const updateData = async (userId, aniId, dataUpdate) => {
    const docRef = doc(fireDb, noteCollection, userId, animeCollection, aniId.toString())
    try {
        return await updateDoc(docRef, dataUpdate)
    } catch (error) {
        return error
    }
}

export const deleteData = async (userId, aniId) => {
    const docRef = doc(fireDb, noteCollection, userId, animeCollection, aniId.toString())
    try {
        return await deleteDoc(docRef)
    } catch (error) {
        return error
    }
}
