import React, { useEffect } from 'react'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee } from '../../../features/employee/employeeSlice'
import { toShortTHDate } from '../../../utils'
import MemberList from './MemberList'

const EmployeeDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { employee, isLoading } = useSelector(state => state.employee);

    useEffect(() => {
        dispatch(getEmployee(id))
    }, [id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item href="/employee">บุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดบุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">รายละเอียดบุคลากร ID: {id}</h2>

                <div className="my-2 border p-4 rounded-md">
                    {employee && (
                        <>
                            <Row>
                                <Col md={3}>
                                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
                                        <img src={`${process.env.REACT_APP_API_URL}/uploads/employees/${employee.avatar_url}`} />
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <p>ชื่อ-สกุล : {employee.prefix?.name}{employee.firstname} {employee.lastname} วันเดือนปีเกิด {toShortTHDate(employee.birthdate)} <span>อายุ {} ปี</span></p>
                                    <p>ที่อยู่ : {employee.address_no} หมู่ {employee.moo || '-'} ถนน{employee.road || '-'} {employee.zipcode}</p>
                                    <p>ตำแหน่ง : {employee.position?.name}{employee.level && employee.level.name}</p>
                                    <p>
                                        วันที่บรรจุ : {employee.assigned_at && toShortTHDate(employee.assigned_at)}
                                        วันที่เริ่มปฏิบัติงาน {employee.started_at && toShortTHDate(employee.started_at)}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <MemberList members={employee.member_of || []} />
                                </Col>
                            </Row>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}

    export default EmployeeDetail
