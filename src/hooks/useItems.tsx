import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ItemType } from '../models/ItemType';

interface ItemContextType {
    items: ItemType[];
    itemDetails: { title: string, description: string },
    handleAddItem: () => void;
    handleItemClick: (key: number) => void;
    handleItemChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleDeleteItem: () => void;
    filterItems: (searchStr: string) => void
    formatDate: (date: Date) => string,
    dateFormated: string | undefined
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [newItems, setNewItems] = useState<ItemType[]>([])
    const [searchQuery, setSearchQuery] = useState<string>();
    const [dateFormated, setDateFormated] = useState<string>();
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

    const setItemDate = (date: Date) => {
        setDateFormated(date.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: '2-digit' }).replace(/\s*р\./, '').replace(/\s*о\s*(?=\d{2}:\d{2})/, ' '))
    }

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
        const newItem = { itemTitle: 'Нова нотатка', itemDescription: 'Ще немає тексту', date: new Date(), selected: true };
        setItemDate(newItem.date)
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
        filterItems(searchQuery);
    };

    const handleItemClick = (key: number) => {
        const items = updateSelection();
        items[key].selected = true;
        const selectedItem = items[key];

        setItemDate(new Date(items[key].date));

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
        filterItems(searchQuery);
    }

    const handleDeleteItem = () => {
        const parsedItems = getParsedItems();

        const filteredItems = parsedItems.filter((item: ItemType) => !item.selected)
        if (filteredItems) {
            if(filteredItems[0]){
                filteredItems[0].selected = true;
                setItemDetails({
                    title: filteredItems[0].itemTitle,
                    description: filteredItems[0].itemDescription
                })
                setItemDate(new Date(filteredItems[0].date))
            }
            setNewItems(filteredItems.map((item: ItemType) => ({
                ...item,
                date: new Date(item.date)
            })))
        }
        localStorage.setItem('items', JSON.stringify(filteredItems))
        filterItems(searchQuery);
    }

    const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setItemDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }))
        const parsedItems = getParsedItems();
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
        filterItems(searchQuery);
    }

    const filterItems = (searchStr: string | undefined) => {
        const search = searchStr || "";
        setSearchQuery(search);

        const parsedItems = getParsedItems();

        if (search !== undefined && search !== '') {
            const filteredItems = parsedItems.filter((item: ItemType) =>
                item.itemTitle.toLowerCase().includes(search.toLowerCase())
            );

            setNewItems(filteredItems.map((item: ItemType) => ({
                ...item,
                date: new Date(item.date),
            })));
        } else {
            setNewItems(parsedItems.map((item: ItemType) => ({
                ...item,
                date: new Date(item.date)
            })));
        }
    }

    const getParsedItems = () => {
        const items = localStorage.getItem('items');
        const parsedItems = items ? JSON.parse(items) : [];

        return parsedItems
    }

    const updateSelection = () => {
        const parsedItems = getParsedItems();
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
        <ItemContext.Provider value={{ items: newItems, handleAddItem, handleItemClick, formatDate, handleItemChange, filterItems, dateFormated, handleDeleteItem, itemDetails }}>
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