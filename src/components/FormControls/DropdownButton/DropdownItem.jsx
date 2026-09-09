import React from 'react'
import { useDropdownContext } from './';

const DropdownItem = ({ children }) => {
    const { setOpen } = useDropdownContext();

    return (
        <li onClick={() => setOpen(false)}>
            {children}
        </li>
    )
}

export default DropdownItem