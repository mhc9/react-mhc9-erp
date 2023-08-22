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
                        <img src="/img/avatar-heroes.png" alt="employee-pic" className="asset-pic" />
                    )}
                </div>
            </Col>
            <Col className="font-thin text-sm">
                <p className="text-gray-500">{asset.group?.category?.name}</p>
                <p>{asset.name}</p>
                <span className="font-bold ml-1">ยี่ห้อ: </span>{asset.brand.name} 
                <span className="font-bold ml-1">รุ่น: </span>{asset.model ? asset.model : '-'}
                <span className="font-bold ml-1">ซื้อเมื่อปี: </span>{asset.first_year ? asset.first_year : '-'}
                {/* <p className="text-sm font-thin text-gray-500 ml-1">{asset.description}</p> */}
                <p className="text-sm font-thin text-red-400">
                    <span className="font-bold">หมายเหตุ: </span>{asset.remark ? asset.remark : '-'}
                </p>
            </Col>
        </Row>
    )
}

export default Asset