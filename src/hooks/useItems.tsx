import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ItemType } from '../models/ItemType';

interface ItemContextType {
    items: ItemType[];
    title: string | undefined,
    description: string | undefined
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleAddItem: () => void;
    handleItemClick: (key: number) => void;
    handleDeleteItem: () => void;
    formatDate: (date: Date) => string,
    todayFormated: string | undefined
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [newItems, setNewItems] = useState<ItemType[]>([])
    const today = new Date();
    const [todayFormated, setTodayFormated] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();

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
        setTodayFormated(today.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: '2-digit' }).replace(/\s*р\./, '').replace(/\s*о\s*(?=\d{2}:\d{2})/, ' '))
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

        setNewItems(finalItems.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })))

        localStorage.setItem('items', JSON.stringify(finalItems));
    };

    const handleItemClick = (key: number) => {
        const items = updateSelection();
        items[key].selected = true;
        setTitle(items[key].itemTitle);
        setDescription(items[key].itemDescription);
        setNewItems(items.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })))
        localStorage.setItem('items', JSON.stringify(items))
    }

    const handleDeleteItem = () => {
        const items = localStorage.getItem('items');
        const parsedItems = items && JSON.parse(items);
        const filteredItems = parsedItems.filter((item: ItemType) => item.selected !== true)
        setNewItems(filteredItems.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })))
        localStorage.setItem('items', JSON.stringify(filteredItems))
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];
        const selectedIndex = parsedItems.findIndex((item: ItemType) => item.selected === true);

        parsedItems[selectedIndex].itemTitle = newTitle;
        setNewItems(parsedItems.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })));
        localStorage.setItem('items', JSON.stringify(parsedItems));
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDesc = e.target.value;
        setDescription(newDesc);

        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];
        const selectedIndex = parsedItems.findIndex((item: ItemType) => item.selected === true);

        parsedItems[selectedIndex].itemDescription = newDesc;
        setNewItems(parsedItems.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })));
        localStorage.setItem('items', JSON.stringify(parsedItems));
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

    return (
        <ItemContext.Provider value={{ items: newItems, handleAddItem, handleItemClick, formatDate, todayFormated, handleDeleteItem, handleDescriptionChange, handleTitleChange, title, description }}>
            {children}
        </ItemContext.Provider>
    );
};


export const useItems = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('useItems must be used within an ItemProvider');
    }
    return context;
};