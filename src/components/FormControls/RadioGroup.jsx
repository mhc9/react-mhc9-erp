import React from 'react'
import { useState } from 'react'

const RadioGroup = ({ label, name, defaultValue, items, direction, onSelected, ...props }) => {
    const [selected, setSelected] = useState("")

    const handleChecked = (e) => {
        const { value, checked } = e.target

        setSelected(value)
        onSelected({ name, value })
    }

    return (
        <div className={direction == 'row' ? 'input-wrapper drow' : 'input-wrapper dcol'}>
            {label && <label htmlFor="">{label}</label>}
            {items.map(item => (
                <div key={item.id} className="input-radio">
                    <input
                        type="radio"
                        name={name}
                        value={item.id}
                        onChange={handleChecked}
                        checked={defaultValue == item.id}
                    /> {item.name}
                </div>
            ))}
        </div>
    )
}

export default RadioGroup
