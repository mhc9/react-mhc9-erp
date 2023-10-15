import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import { getTasks } from '../../features/task/taskSlice'
import { getPriority } from '../../utils'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks, pager, loading } = useSelector(state => state.task);

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    const handlePageClick = (url) => {

    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>บริการ</Breadcrumb.Item>
                <Breadcrumb.Item active>สถานะการซ่อม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">สถานะการซ่อม</h2>

                <div>
                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th className="w-[12%] text-center">วันที่แจ้ง</th>
                                <th>รายละเอียดปัญหา</th>
                                <th className="w-[8%] text-center">ความเร่งด่วน</th>
                                <th className="w-[20%]">ผู้แจ้ง</th>
                                <th className="w-[10%] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="text-center"><Loading /></td>
                                </tr>
                            )}
                            {tasks && tasks.map((task, index) => (
                                <tr key={task.id} className="font-thin">
                                    <td className="text-center">{ pager && pager.from + index}</td>
                                    <td className="text-center">
                                        <p className="text-sm">{moment(task.task_date).format('DD/MM/YYYY')}</p>
                                        <p className="text-sm font-thin"><b className="mr-1">เวลา</b>{task.task_time}</p>
                                    </td>
                                    <td>
                                        <p>
                                            <b className="mr-1">{task.group?.type?.name}</b>
                                            <span className="font-thin">({task.group?.name})</span>
                                        </p>
                                        <p className="text-xs text-red-500 font-thin">{task.description}</p>
                                    </td>
                                    <td className="text-center">
                                        <span className="badge rounded-pill text-bg-success">
                                            {getPriority(task.priority_id)?.name}
                                        </span>
                                    </td>
                                    <td>
                                        {`${task.reporter?.prefix?.name}${task.reporter?.firstname} ${task.reporter?.lastname}`}
                                        <p><b>{`${task.reporter?.position?.name}${task.reporter?.level ? task.reporter?.level?.name : ''}`}</b></p>
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/task/${task.id}/detail`} className="btn btn-sm btn-info mr-1">
                                            <FaSearch size={'12px'} />
                                        </Link>
                                        <Link to={`/task/${task.id}/edit`} className="btn btn-sm btn-warning mr-1">
                                            <FaPencilAlt size={'12px'} />
                                        </Link>
                                        <button className="btn btn-sm btn-danger">
                                            <FaTrash size={'12px'} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <Pagination
                    pager={pager}
                    onPageClick={handlePageClick}
                />
            </div>
        </div>
    )
}

export default TaskList