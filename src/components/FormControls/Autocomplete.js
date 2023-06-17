import React, { useEffect, useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

const Autocomplete = ({ inputName, items, onSelect }) => {
    const [show, setShow] = useState(false);
    const [filtedItems, setFilteredItems] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        setFilteredItems(items)
    }, [items]);

    const handleKeyUp = (e) => {
        const newItems = items.filter(item => item.name.search(e.target.value) !== -1);

        setFilteredItems(newItems);
    };

    const handleSelect = (item) => {
        setShow(false);
        setSelected(item.name);

        onSelect(item);
    };

    const handleClear = () => {
        setSelected('');

        onSelect(null);
    };

    return (
        <div className="relative">
            <div className="flex justify-between items-center border rounded-md pr-2">
                <input
                    type="text"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    onClick={() => setShow(!show)}
                    className="form-control border-none outline-none"
                />
                {selected !== '' && <FaTimesCircle className="hover:cursor-pointer hover:text-red-500" onClick={handleClear} />}
            </div>
            <div className={`absolute w-full bg-white border rounded-md ${!show ? 'hidden' : 'block'}`}>
                <div className="m-2">
                    <input type="text" className="form-control" onKeyUp={(e) => handleKeyUp(e)} />
                </div>
                <ul className="m-2">
                    {filtedItems && filtedItems.map((item, index) => (
                        <li className="p-1 hover:cursor-pointer hover:bg-gray-200" key={item.id} onClick={() => handleSelect(item)}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Autocomplete
