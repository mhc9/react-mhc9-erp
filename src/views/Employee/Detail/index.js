import React, { useEffect, useState } from 'react'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee } from '../../../features/employee/employeeSlice'
import { resetSuccess } from '../../../features/member/memberSlice'
import { toShortTHDate } from '../../../utils'
import MemberList from './Member/MemberList'
import AddMember from './Member/AddMember'
import ChangeAvatar from './ChangeAvatar'
import EmployeeAvatar from './EmployeeAvatar'
import Loading from '../../../components/Loading'

const EmployeeDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.member);
    const { employee, isLoading, isSuccess: isUploaded } = useSelector(state => state.employee);
    const [isShow, setIsShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        dispatch(getEmployee(id))
    }, [id]);

    useEffect(() => {
        if (isSuccess) dispatch(resetSuccess());
    }, [isSuccess]);

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
                    {isLoading && <div className="text-center"><Loading /></div>}
                    {(!isLoading && employee) && (
                        <>
                            <Row>
                                <Col md={3} className="flex flex-col justify-center items-center">
                                    <EmployeeAvatar
                                        avatarUrl={selectedImage ? '' : employee.avatar_url || ''}
                                        selectedImage={selectedImage}
                                    />

                                    <ChangeAvatar
                                        employee={employee}
                                        selected={selectedImage}
                                        onSelect={(image) => setSelectedImage(image)}
                                    />
                                </Col>
                                <Col md={9}>
                                    <div className="flex flex-col space-y-2 font-thin">
                                        <p>
                                            <b>เลขที่เจ้าหน้าที่ : </b>{employee.employee_no}
                                            <b className="ml-2">เลข 13 หลัก : </b>{employee.cid}
                                        </p>
                                        <p>
                                            <b>ชื่อ-สกุล : </b>{employee.prefix?.name}{employee.firstname} {employee.lastname}
                                            <b className="ml-2">วันเดือนปีเกิด : </b>{employee.birthdate && toShortTHDate(employee.birthdate)} <span>อายุ {} ปี</span></p>
                                        <p>
                                            <b>ที่อยู่ : </b>{employee.address_no} หมู่ {employee.moo || '-'} ถนน{employee.road || '-'}
                                            ต.{employee.tambon?.name} อ.{employee.amphur?.name} จ.{employee.changwat?.name} {employee.zipcode}
                                        </p>
                                        <p>
                                            <b>ตำแหน่ง : </b>{employee.position?.name}{employee.level && employee.level.name}
                                        </p>
                                        <p>
                                            <b>วันที่บรรจุ : </b>{employee.assigned_at && toShortTHDate(employee.assigned_at)}
                                            <b className="ml-2">วันที่เริ่มปฏิบัติงาน : </b>{employee.started_at && toShortTHDate(employee.started_at)}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className="mt-4">
                                        <div className="flex flex-row justify-between items-center mb-2">
                                            <h2 className="font-bold text-lg">สังกัดหน่วยงาน</h2>

                                            {!isShow && (
                                                <button className="btn btn-primary btn-sm" onClick={() => setIsShow(!isShow)}>
                                                    เพิ่ม
                                                </button>
                                            )}
                                        </div>

                                        <AddMember
                                            isShow={isShow}
                                            onCancel={() => setIsShow(false)}
                                            employeeId={employee.id}
                                        />
                                        <MemberList employee={employee} />
                                    </div>
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
