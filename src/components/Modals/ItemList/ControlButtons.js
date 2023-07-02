import React from 'react'
import { FaList, FaThLarge } from 'react-icons/fa'

const ControlButtons = ({ isListMode, onIsListModeClick }) => {
    return (
        <div className="btn__actions-wrapper mr-2">
            {!isListMode ? (
                <FaList
                    size={'20px'}
                    onClick={() => onIsListModeClick(true)}
                    className="hover:cursor-pointer hover:text-blue-700"
                />
            ) : (
                <FaThLarge
                    size={'20px'}
                    onClick={() => onIsListModeClick(false)}
                    className="hover:cursor-pointer hover:text-blue-700"
                />
            )}
        </div>
    )
}

export default ControlButtons
