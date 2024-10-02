import { useEffect, useState } from "react";
import { ItemType } from "../models/ItemType";


const useToDo = () => {
    const [newItems, setNewItems] = useState<ItemType[]>([])
    const today = new Date();
    const [todayFormated, setTodayFormated] = useState<string>();

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            const parsedItems = JSON.parse(storedItems).map((item: ItemType) => ({
                ...item,
                date: new Date(item.date),
            }));
            setNewItems(parsedItems);
        }
    }, [])

    useEffect(() => {
        setTodayFormated(today.toLocaleDateString("uk-UA", {day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: '2-digit'}).replace(/\s*р\./, '').replace(/\s*о\s*(?=\d{2}:\d{2})/, ' '))
    }, [])

    const formatDate = (date: Date) => {
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();

        if (isToday) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            return date.toLocaleDateString();
        }
    };

    const handleAddItem = () => {
        const items = localStorage.getItem('items');
        console.log(items)
        const parsedItems = items ? JSON.parse(items) : [];
    
        const newItem = { itemTitle: '', itemDescription: '', date: new Date(), selected: true };
        const updatedItems = [newItem, ...parsedItems];
    
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    return {newItems, handleAddItem, formatDate, todayFormated}
}

export default useToDo