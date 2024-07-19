import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import EmployeeForm from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployee } from '../../features/slices/employee/employeeSlice'
import Loading from '../../components/Loading'

const EditEmployee = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { employee, isLoading } = useSelector(state => state.employee);

    useEffect(() => {
        if (id) dispatch(getEmployee(id));
    }, [id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/employee" }}>บุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>แก้ไขบุคลากร</Breadcrumb.Item>
                <Breadcrumb.Item active>{id}</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">แก้ไขบุคลากร ID: {id}</h2>

                <div className="my-2 border p-4 rounded-md">
                    {isLoading ? <div className="text-center"><Loading /></div> : <EmployeeForm employee={employee} />}
                </div>
            </div>
        </div>
    )
}

    export default EditEmployee
