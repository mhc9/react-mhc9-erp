import React, { useEffect, useState } from 'react'
import { Breadcrumb, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getEmployees } from '../../features/employee/employeeSlice';
import Loading from '../../components/Loading';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { employees, pager, loading, success } = useSelector(state => state.employee)
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getEmployees({ url: `/api/employees/search` }));
        } else {
            dispatch(getEmployees({ url: apiEndpoint }));
        }
    }, [apiEndpoint]);

    const handlePageClick = (url) => {
        setApiEndpoint(url);
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>บุคลากร</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">บุคลากร</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มบุคลากรใหม่</Link>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th>ชื่อ-สกุล</th>
                                <th className="text-center w-[30%]">ตำแหน่ง</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {employees && employees.map((employee, index) => (
                                <tr key={employee.id}>
                                    <td className="text-center">{index+pager.from}</td>
                                    <td>{employee.prefix.name}{employee.firstname} {employee.lastname}</td>
                                    <td>{employee.position.name}{employee.level?.name}</td>
                                    <td className="text-center">
                                        <Link to={`/employees/${employee.id}/edit`} className="btn btn-sm btn-warning mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && employees.length <= 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        -- ไม่มีข้อมูล --
                                    </td>
                                </tr>
                            )}
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

export default EmployeeList
