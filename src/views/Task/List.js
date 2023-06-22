import React, { useEffect } from 'react'
import { Breadcrumb, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../../features/task/taskSlice'
import Loading from '../../components/Loading'

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
                <Breadcrumb.Item href="/">บริการ</Breadcrumb.Item>
                <Breadcrumb.Item active>สถานะการซ่อม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">สถานะการซ่อม</h2>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th>รายละเอียด</th>
                                <th className="w-[10%] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={3} className="text-center"><Loading /></td>
                                </tr>
                            )}
                            {tasks && tasks.map((task, index) => (
                                <tr key={task.id}>
                                    <td className="text-center">{ pager && pager.from + index}</td>
                                    <td>{task.description}</td>
                                    <td className="text-center">

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