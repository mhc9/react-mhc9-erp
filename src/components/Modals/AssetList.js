import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalAssetList = ({ isShow, handleHide }) => {
    return (
        <Modal
            show={isShow}
            onHide={handleHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>รายการพัสดุ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เลขที่พัสดุ</th>
                                <th>รายการพัสดุ</th>
                                <th className="text-center w-[10%]">เลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="text-center">
                                    <button className="btn btn-primary btn-sm" onClick={handleHide}>เลือก</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAssetList
