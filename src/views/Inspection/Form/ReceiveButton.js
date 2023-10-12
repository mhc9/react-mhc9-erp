import React, { useState } from 'react'

const ReceiveButton = ({ id, onReceive }) => {
    const [received, setReceived] = useState(false);

    const handleClick = () => {
        setReceived(!received);
        onReceive(id, !received);
    };

    return (
        <button
            type="button"
            className={`btn ${received ? 'btn-outline-success' : 'btn-outline-secondary'} btn-sm`}
            onClick={handleClick}
        >
            {received ? 'รับแล้ว' : 'ตรวจรับ'}
        </button>
    )
}

export default ReceiveButton
