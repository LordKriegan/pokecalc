import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (storageKey, key) => {
    try {
        const jsonVal = await AsyncStorage.getItem(storageKey);
        
        return jsonVal != null ? (JSON.parse(jsonVal))[key] : null;
    } catch (e) {
        console.log(e);
    }
}
const setItem = async (storageKey, value) => {
    try {
            const stringified = JSON.stringify(value);
            await AsyncStorage.setItem(storageKey, stringified);
    } catch (e) {
        console.log(e);
    }
}
const getAll = async (storageKey) => {
    try {
        const jsonVal = await AsyncStorage.getItem(storageKey);
        return jsonVal != null ? JSON.parse(jsonVal) : null;
    } catch (e) {
        console.log(e);
    }
}

export default {
    getItem,
    setItem,
    getAll,
};