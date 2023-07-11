import React, { useEffect, useState } from 'react'
import { Modal, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getEmployees } from '../../../features/employee/employeeSlice';
import Loading from '../../Loading';
import FilteringInputs from './FilteringInputs';
import { useGetInitialFormDataQuery } from '../../../services/employee/employeeService';

const initialFilters = {
    name: '',
    division: ''
};

const initialFormData = {
    divisions: []
};

const ModalEmployeeList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { employees, pager, isLoading } = useSelector(state => state.employee)
    const [apiEndpoint, setApiEndpoint] = useState('');
    const { data: formData = initialFormData } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getEmployees({ url: `/api/employees/search` }));
        } else {
            dispatch(getEmployees({ url: apiEndpoint }));
        }
    }, [apiEndpoint]);

    const handleFilter = (queryStr) => {
        if (apiEndpoint === '') {
            setApiEndpoint(`/api/employees/search?page=` + queryStr);
        } else {
            setApiEndpoint(apiEndpoint + queryStr);
        }
    };

    const handlePageClick = (url) => {
        setApiEndpoint(url);
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>รายการบุคลากร</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={handleFilter}
                    formData={formData}
                />

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
                            {isLoading && (
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
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => {
                                                onSelect(employee);
                                                onHide();
                                            }}
                                        >
                                            เลือก
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
            </Modal.Body>
        </Modal>
    )
}

export default ModalEmployeeList
