export interface ItemType {
    handleItemClick: () => void,
    itemTitle: string,
    itemDescription: string
    date: Date,
    selected: boolean
}