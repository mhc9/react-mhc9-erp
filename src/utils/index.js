import { PRIORITIES, DUTIES, EXPENSES } from "./constraints"
import moment from "moment";

export const getPriority = (id) => {
    if (!id || id === '') return null;

    return PRIORITIES.find(priority => priority.id === id);
};

export const getDuty = (id) => {
    if (!id || id === '') return null;

    return DUTIES.find(duty => duty.id === id);
};

export const getExpense = (id) => {
    if (!id || id === '') return null;

    return EXPENSES.find(expense => expense.id === id);
};

export const calcAgeY = (birthdate) => {
    if (!birthdate) return 0

    return moment().diff(moment(birthdate), "years") 
};

export const calcUsedAgeY = (firstYear) => {
    return moment().year() - (firstYear-543);
};

export const calculateTotal = (price, amount) => {
    return price * amount;
};

export const calculateNetTotal = (items = []) => {
    return items.reduce((sum, item) => sum + item.total, 0);
};

export const calculateVat = function(netTotal, vatRate) {
    return (netTotal * vatRate) / (100 + vatRate);
};

export const currency = Intl.NumberFormat('th-TH', {maximumFractionDigits:2});

export const currencyToNumber = function(currency) {
    if (typeof currency === 'number') return currency;
    if (currency == '') return 0;

    return currency.replaceAll(',', '');
};

export const toShortTHDate = (dateStr) => {
    if (!dateStr || dateStr === '') return '';

    const [year, month, day] = dateStr.split('-');

    return `${day}/${month}/${parseInt(year, 10) + 543}`;
};

export const toLongTHDate = (date) => {
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export const filterAmphursByChangwat = (changwat, amphurs = []) => {
    return amphurs.filter(amp => amp.chw_id === changwat);
};

export const filterTambonsByAmphur = (amphur, tambons = []) => {
    return tambons.filter(tam => tam.amp_id === amphur);
};

export const generateQueryString = (inputs) => {
    let queryStr = '';
    for (const [key, val] of Object.entries(inputs)) {
        queryStr += `&${key}=${val}`;
    }

    return queryStr;
};

export const isExisted = (items, id) => {
    return items.some(item => item.id === id);
};
