import React, { useEffect, useState } from 'react'
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa'
import ModalEmployeeList from '../../Modals/EmployeeList'

const EmployeeSelection = ({ loan }) => {
    const { setFieldValue } = useFormikContext();
    const { loggedInUser } = useSelector(state => state.auth);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        if (loggedInUser) {
            setEmployee(loggedInUser.employee);
            setFieldValue('employee_id', loan ? loan.employee.id : loggedInUser.employee?.id);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (loan) setEmployee(loan.employee);
    }, [loan]);

    return (
        <>
            <ModalEmployeeList
                isShow={showEmployeeModal}
                onHide={() => setShowEmployeeModal(false)}
                onSelect={(employee) => {
                    setEmployee(employee);
                    setFieldValue('employee_id', employee.id);
                }}
            />

            <div className="input-group">
                <div className="form-control text-sm h-[34px] bg-gray-100">
                    {employee?.firstname} {employee?.lastname}
                </div>
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowEmployeeModal(true)}>
                    <FaSearch />
                </button>
            </div>
        </>
    )
}

export default EmployeeSelection