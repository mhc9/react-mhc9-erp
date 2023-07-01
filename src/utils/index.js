import { priorities } from "./constraints"

export const getPriority = (id) => {
    if (!id || id === '') return null;

    return priorities.find(priority => priority.id === id);
};

export const calculateTotal = (price, amount) => {
    return price * amount;
};

export const calculateNetTotal = (items = []) => {
    console.log(items);
    return items.reduce((sum, item) => sum + item.total, 0);
};
