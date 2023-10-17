import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import { getTask } from '../../features/task/taskSlice'
import TaskAssetList from './Asset/List'
import Loading from '../../components/Loading'

const TaskDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { task, isLoading } = useSelector(state => state.task);

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
                    <span className="ml-1">รายละเอียดแจ้งปัญหา/แจ้งซ่อม : {id}</span>
                </h2>

                <div className="my-2 border p-4 rounded-md">
                    {isLoading && <div className="text-center"><Loading /></div>}
                    {!isLoading && task && (
                        <div>
                            <h3 className="mb-1">รายการพัสดุ (ถ้ามี)</h3>
                            <TaskAssetList assets={task.assets} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskDetail