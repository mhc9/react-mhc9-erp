import React, { useEffect, useState } from 'react'

const Autocomplete = ({ inputName, items, onSelect }) => {
    const [show, setShow] = useState(false);
    const [filtedItems, setFilteredItems] = useState([]);

    useEffect(() => {
        setFilteredItems(items)
    }, [items]);

    const handleKeyUp = (e) => {
        const newItems = items.filter(item => item.name.search(e.target.value) !== -1);

        setFilteredItems(newItems);

        if (e.target.value === '') {
            setShow(false);
        } else {
            setShow(true);
        }
    };

    const handleSelect = (item) => {
        setShow(false);
        onSelect(item);
    };

    return (
        <div className="relative">
            <input type="text" name={inputName} className="form-control" onKeyUp={(e) => handleKeyUp(e)} />
            <div className={`absolute w-full bg-white border rounded-md ${!show ? 'hidden' : 'block'}`}>
                <ul className="">
                    {filtedItems && filtedItems.map((item, index) => (
                        <li className="p-1 hover:bg-gray-200" key={item.id}>
                            <a href="#" onClick={() => handleSelect(item)}>
                                <p>{item.name}</p>
                            </a>
                        </li>
                    ))}
                </ul>
                <p className="float-right px-1">X</p>
            </div>
        </div>
    )
}

export default Autocomplete
