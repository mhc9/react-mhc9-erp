import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <Spinner animation="border" role="status" size="sm" style={{ marginRight: '2px' }}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loading
