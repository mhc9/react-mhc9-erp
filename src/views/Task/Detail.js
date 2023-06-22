import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import TaskForm from './Form'
import { getTask } from '../../features/task/taskSlice'

const TaskDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { task } = useSelector(state => state.task);

    useEffect(() => {
        dispatch(getTask({ id }));
    }, [id]);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>บริการ</Breadcrumb.Item>
                <Breadcrumb.Item href="/task">รายการแจ้งปัญหา/แจ้งซ่อม</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดแจ้งปัญหา/แจ้งซ่อม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
            <h2 className="text-xl font-bold flex flex-row items-center">
                    <FaEdit className='text-warning' />
                    <span>รายละเอียดแจ้งปัญหา/แจ้งซ่อม : {id}</span>
                </h2>

            </div>
        </div>
    )
}

export default TaskDetail