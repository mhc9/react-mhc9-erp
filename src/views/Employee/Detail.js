import React, { useEffect } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EmployeeForm from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee } from '../../features/employee/employeeSlice'

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
                    <EmployeeForm />
                </div>
            </div>
        </div>
    )
}

    export default EmployeeDetail
