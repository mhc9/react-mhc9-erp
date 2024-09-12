import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../features/slices/employee/employeeSlice';
import { useGetInitialFormDataQuery } from '../../../features/services/employee/employeeApi';
import Loading from '../../Loading';
import FilteringInputs from '../../Employee/FilteringInputs';
import Pagination from '../../../components/Pagination'

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

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton className="py-1">
                <Modal.Title>รายการบุคลากร</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={handleFilter}
                    formData={formData}
                />

                <div>
                    <table className="table table-bordered mb-0 text-sm">
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
                                <tr key={employee.id} className="font-thin">
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
            </Modal.Body>
            <Modal.Footer className="py-1">
                <Pagination
                    pager={pager}
                    onPageClick={(url) => setApiEndpoint(url)}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEmployeeList
