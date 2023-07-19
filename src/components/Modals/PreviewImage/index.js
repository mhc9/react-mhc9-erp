import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalPreviewImage = ({ isShow, onHide, title, url }) => {
    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="border">
                    <img src={url} alt={title} />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalPreviewImage