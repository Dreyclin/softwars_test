import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ItemType } from '../models/ItemType';

interface ItemContextType {
    items: ItemType[];
    itemDetails: { title: string, description: string },
    handleAddItem: () => void;
    handleItemClick: (key: number) => void;
    handleItemChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleDeleteItem: () => void;
    formatDate: (date: Date) => string,
    todayFormated: string | undefined
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [newItems, setNewItems] = useState<ItemType[]>([])
    const today = new Date();
    const [todayFormated, setTodayFormated] = useState<string>();
    const [itemDetails, setItemDetails] = useState({
        title: '',
        description: ''
    })

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            const parsedItems = JSON.parse(storedItems).map((item: ItemType) => ({
                ...item,
                date: new Date(item.date),
            }));
            setNewItems(parsedItems);

            const selectedItem = parsedItems.find((item: ItemType) => item.selected);
            if (selectedItem) {
                const { itemTitle, itemDescription } = selectedItem;
                setItemDetails({ title: itemTitle, description: itemDescription });
            }
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

        setItemDetails({
            title: '',
            description: ''
        })

        setNewItems(finalItems.map((item: ItemType) => ({
            ...item,
            date: new Date(item.date)
        })))

        localStorage.setItem('items', JSON.stringify(finalItems));
    };

    const handleItemClick = (key: number) => {
        const items = updateSelection();
        items[key].selected = true;
        const selectedItem = items[key];
        if (selectedItem) {
            const { itemTitle, itemDescription } = selectedItem
            setItemDetails({
                title: itemTitle,
                description: itemDescription
            })
        }
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
        if (filteredItems) {
            setNewItems(filteredItems.map((item: ItemType) => ({
                ...item,
                date: new Date(item.date)
            })))
        }
        localStorage.setItem('items', JSON.stringify(filteredItems))
    }

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setItemDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }))
        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];
        const selectedIndex = parsedItems.findIndex((item: ItemType) => item.selected === true);
        parsedItems[selectedIndex] = {
            ...parsedItems[selectedIndex],
            [name === 'title' ? 'itemTitle' : 'itemDescription']: value,
        };
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
        <ItemContext.Provider value={{ items: newItems, handleAddItem, handleItemClick, formatDate, handleItemChange, todayFormated, handleDeleteItem, itemDetails }}>
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