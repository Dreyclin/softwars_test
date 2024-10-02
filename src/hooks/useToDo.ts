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
        const items = updateSelection();
        const newItem = { itemTitle: '', itemDescription: '', date: new Date(), selected: true };
        
        const finalItems = [newItem, ...items]
        
        localStorage.setItem('items', JSON.stringify(finalItems));

        setNewItems(finalItems.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })))
    };

    const handleItemClick = (key: number) => {
        const items = updateSelection();
        items[key].selected = true;
        setNewItems(items.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })))
        localStorage.setItem('items', JSON.stringify(items))
    }

    const updateSelection = () => {
        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];
        const selectedIndex = parsedItems.findIndex((item: ItemType) => item.selected === true)

        const updatedItems = parsedItems.map((item: ItemType, index: number) => {
            if (index === selectedIndex) {
                return { ...item, selected: false };
            }
            return item;
        });

        return updatedItems
    }

    return {newItems, handleAddItem, formatDate, handleItemClick, todayFormated}
}

export default useToDo