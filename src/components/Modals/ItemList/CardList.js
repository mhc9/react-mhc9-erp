import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { currency } from '../../../utils'

const CardList = ({ items, onHide, onSelect }) => {
    return (
        <Row className="mb-3">
            {items && items.map((item, index) => (
                <Col md={3} key={item.id}>
                    <Card>
                        <Card.Img src={item.img_url} />
                        <Card.Body>
                            <p className="text-gray-500 text-sm">{item.category?.name}</p>
                            <p className="mb-1 text-sm">{item.name}</p>
                            <div className="border rounded-md mb-1 p-2 text-xs min-h-[100px]">
                                <h3 className="font-bold underline">รายละเอียด</h3>
                                <p className="text-gray-400 font-thin">{item.description}</p>
                            </div>
                            <p className="font-bold text-lg">
                                ราคา <span className="text-red-500">{currency.format(item.price)}</span> บาท
                            </p>
                            <button
                                className="btn btn-primary btn-sm float-right"
                                onClick={() => {
                                    onHide();
                                    onSelect(item);
                                }}
                            >
                                เลือก
                            </button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default CardList
