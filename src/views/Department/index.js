import React, { useEffect } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartments } from '../../features/department/departmentSlice'
import DepartmentList from './List'
import AddDepartment from './Add'

const Department = () => {
    const dispatch = useDispatch();
    const { departments } = useSelector(state => state.department);

    useEffect(() => {
        dispatch(getDepartments());
    }, []);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>กลุ่มงาน</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">กลุ่มงาน</h2>
                </div>

                <AddDepartment />

                <DepartmentList departments={departments} />
            </div>
        </div>
    )
}

export default Department
