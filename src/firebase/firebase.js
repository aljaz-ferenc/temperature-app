import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_API_KEY,
    authDomain: "weather-app-a5ec7.firebaseapp.com",
    projectId: "weather-app-a5ec7",
    storageBucket: "weather-app-a5ec7.appspot.com",
    messagingSenderId: "1068214012256",
    appId: "1:1068214012256:web:8c93cf6ba0869e0c74b605"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export async function getAllTemps() {
    let data = []
    const docRef = collection(db, "temperature")

    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => data.push(doc.data()));

    return data
}

export async function getTempsByDateRange(startDate, endDate) {
    let data = []

    const docRef = collection(db, "temperature")
    const q = query(docRef, where('date', '>=', startDate), where('date', '<=', endDate))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => data.push(doc.data()))

    return data
}

export async function addTemperature(temperature, location, date) {
    await addDoc(collection(db, 'temperature'), 
    {
        temperature,
        location,
        date: new Date(date).getTime()
    })
}