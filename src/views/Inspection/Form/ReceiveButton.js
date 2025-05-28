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
            className={`btn ${received ? 'btn-outline-success' : 'btn-outline-danger'} btn-sm`}
            onClick={handleClick}
        >
            {received ? 'รับแล้ว' : 'รับ'}
        </button>
    )
}

export default ReceiveButton
