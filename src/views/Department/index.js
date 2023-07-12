import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartments } from '../../features/department/departmentSlice'
import DepartmentList from './List'
import DepartmentForm from './Form'

const Department = () => {
    const dispatch = useDispatch();
    const { departments, pager } = useSelector(state => state.department);
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        dispatch(getDepartments({ url: `/api/departments` }));
    }, [dispatch]);

    const handlePageClick = (url) => {

    };

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

                <DepartmentForm
                    department={department}
                    handleCancel={() => setDepartment(null)}
                />

                <DepartmentList
                    departments={departments}
                    pager={pager}
                    onEditting={(dep) => setDepartment(dep)}
                    onPageClick={handlePageClick}
                />
            </div>
        </div>
    )
}

export default Department
