import React, { useEffect, useState } from 'react'
import { Breadcrumb, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { destroy, getEmployees } from '../../features/employee/employeeSlice'
import { useGetInitialFormDataQuery } from '../../services/employee/employeeApi'
import Loading from '../../components/Loading'
import FilteringInputs from '../../components/Employee/FilteringInputs'

const initialFilters = {
    name: '',
    division: ''
};

const initialFormData = {
    divisions: []
};

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { employees, pager, isLoading } = useSelector(state => state.employee);
    const { data: formData = initialFormData } = useGetInitialFormDataQuery();
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getEmployees({ url: `/api/employees/search` }));
        } else {
            dispatch(getEmployees({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handlePageClick = (url) => {
        setApiEndpoint(url);
    };

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/employees/search?page=`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`คุณต้องการลบรายการบุคลากรรหัส ${id} ใช่หรือไม่?`)) {
            dispatch(destroy(id));
        }
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>บุคลากร</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">บุคลากร</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มบุคลากรใหม่</Link>
                </div>

                <div>
                    <FilteringInputs
                        initialFilters={initialFilters}
                        onFilter={handleFilter}
                        formData={formData}
                    />

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[8%]">เลขที่</th>
                                <th>ชื่อ-สกุล</th>
                                <th className="text-center w-[30%]">ตำแหน่ง</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {(!isLoading && employees) && employees.map((employee, index) => (
                                <tr key={employee.id} className="font-thin">
                                    <td className="text-center">{index+pager.from}</td>
                                    <td className="text-center">{employee.employee_no}</td>
                                    <td>{employee.prefix.name}{employee.firstname} {employee.lastname}</td>
                                    <td>{employee.position.name}{employee.level?.name}</td>
                                    <td className="text-center p-1">
                                        <Link to={`/employee/${employee.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/employee/${employee.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(employee.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!isLoading && employees.length <= 0 && (
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
                    <div className="flex flex-row items-center justify-between gap-4">
                        <div className="text-sm font-thin flex flex-row items-center justify-between gap-4 w-3/5">
                            <span>หน้าที่ {pager.current_page}/{pager.last_page}</span>
                            <span>จำนวนทั้งสิ้น {pager.total} รายการ</span>
                        </div>

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
                    </div>
                )}
            </div>
        </div>
    )
}

export default EmployeeList
