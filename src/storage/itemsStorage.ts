import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items"

export type ItemStorage = {
    id: string;
    status: FilterStatus;
    description: string;    
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

        return storage ? JSON.parse(storage) : [];
    } catch (error) {
        throw new Error("GET_ITEM:" + error);
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get();

    return items.filter((item) => item.status === status);
}

async function save(items) {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.log(error)
    }
}

async function add(newItem) {
    const items = await get();
    const updatedItems = [...items, newItem];
    await save(updatedItems);

    return updatedItems;
}

async function remove(idItem) {
    try {
        const items = await get()
        const updatedItems = items.filter((item) => item.id !== idItem);

        await save(updatedItems);
    } catch (error) {
        console.log(error)
    }
}

async function clear() {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
    } catch (error) {
        console.log(error)
    }
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear
}