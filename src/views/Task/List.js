import React, { useEffect } from 'react'
import { Breadcrumb, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaSearch, FaPencilAlt, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import { getTasks } from '../../features/task/taskSlice'
import Loading from '../../components/Loading'
import { getPriority } from '../../utils'

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
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th className="w-[12%] text-center">วันที่แจ้ง</th>
                                <th>รายละเอียดปัญหา</th>
                                <th className="w-[8%] text-center">ความเร่งด่วน</th>
                                <th className="w-[20%] text-center">ผู้แจ้ง</th>
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
                                <tr key={task.id}>
                                    <td className="text-center">{ pager && pager.from + index}</td>
                                    <td className="text-center">
                                        <p className="text-sm">{moment(task.task_date).format('DD/MM/YYYY')}</p>
                                        <p className="text-sm font-thin">เวลา {task.task_time}</p>
                                    </td>
                                    <td>
                                        <p>{task.group?.type?.name} <span className="font-thin">({task.group?.name})</span></p>
                                        <p className="text-xs text-red-500 font-thin">{task.description}</p>
                                    </td>
                                    <td className="text-center">
                                        <span className="py-1 px-2 bg-green-600 rounded-full text-xs text-white">
                                            {getPriority(task.priority_id)?.name}
                                        </span>
                                    </td>
                                    <td className="text-center">{`${task.reporter.firstname} ${task.reporter.lastname}`}</td>
                                    <td className="text-center">
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
                {pager && (
                    <Pagination>
                        <Pagination.First disabled={pager.current_page === 1} onClick={() => handlePageClick(pager.first_page_url)} />
                        <Pagination.Prev disabled={!pager.prev_page_url} onClick={() => handlePageClick(pager.prev_page_url)} />
                        {/* <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item> */}
                        <Pagination.Next disabled={!pager.next_page_url} onClick={() => handlePageClick(pager.next_page_url)} />
                        <Pagination.Last disabled={pager.current_page === pager.last_page} onClick={() => handlePageClick(pager.last_page_url)} />
                    </Pagination>
                )}
            </div>
        </div>
    )
}

export default TaskList