import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { currency } from '../../../utils'
import ItemDesc from './ItemDesc'

const CardList = ({ items, onHide, onSelect }) => {
    return (
        <Row className="mb-3">
            {items && items.map((item, index) => (
                <Col md={3} sm={2} className="mb-2" key={item.id}>
                    <Card>
                        {![3,4].includes(item?.category?.asset_type_id) && (
                            <Card.Img
                                src={`${process.env.REACT_APP_API_URL}/uploads/products/thumbnails/${item?.img_url}`}
                                className="w-[120px] h-auto self-center"
                            />
                        )}
                        <Card.Body>
                            <p className="text-gray-500 text-xs">{item.category?.name}</p>
                            <p className="text-xs min-h-[50px]">{item.name}</p>
                            <ItemDesc item={item} />
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
