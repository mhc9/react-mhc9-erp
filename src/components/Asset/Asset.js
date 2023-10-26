import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Asset = ({ asset }) => {
    return (
        <Row>
            <Col md={3}>
                <div className="w-[80px] h-[80px] overflow-hidden border">
                    {(asset && asset.img_url) ? (
                        <img src={`${process.env.REACT_APP_API_URL}/uploads/assets/${asset.img_url}`} alt='asset-pic' />
                    ) : (
                        <img src="/img/default-product.jpg" alt="employee-pic" className="asset-pic" />
                    )}
                </div>
            </Col>
            <Col className="font-thin text-sm">
                <p className="text-gray-500">{asset.group?.category?.name}</p>
                <p>{asset.name}</p>
                <p>
                    <span className="mr-1"><b>ยี่ห้อ:</b> {asset.brand?.name}</span>
                    <span className="mr-1"><b>รุ่น:</b> {asset.model ? asset.model : '-'}</span>
                    <span className="mr-1"><b>ซื้อเมื่อปี:</b> {asset.first_year ? asset.first_year : '-'}</span>
                </p>
                {/* <p className="text-sm font-thin text-gray-500 ml-1">{asset.description}</p> */}
                <p className="text-sm font-thin text-red-400">
                    <span className="font-bold">หมายเหตุ:</span> {asset.remark ? asset.remark : '-'}
                </p>
            </Col>
        </Row>
    )
}

export default Asset