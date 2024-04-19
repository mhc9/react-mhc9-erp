import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getContracts, destroy } from '../../../features/slices/loan-contract/loanContractSlice'
import { currency, generateQueryString, toShortTHDate } from '../../../utils'
import LoanListDetail from './ListDetail'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'
import EmployeeCard from '../../../components/Employee/Card'
// import LoanFilteringInputs from '../../../components/loan/FilteringInputs'

const initialFilters = {
    pr_no: '',
    pr_date: '',
    division: '',
    status: '1'
};

const LoanContractList = () => {
    const dispatch = useDispatch();
    const { contracts, pager, isLoading } = useSelector(state => state.loanContract);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getContracts({ url: `/api/loan-contracts/search?page=&status=1` }));
        } else {
            dispatch(getContracts({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params])

    const handleFilter = (queryStr) => {
        setParams(queryStr);

        setApiEndpoint(`/api/loan-contracts/search?page=`);
    };

    const handleDelete = (id) => {
        if (window.confirm(`คุณต้องการลบสัญญาเงินยืมรหัส ${id} ใช่หรือไม่`)) {
            dispatch(destroy(id));
        }
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการสัญญา</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการสัญญา</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มสัญญา</Link>
                </div>

                <div>
                    {/* <LoanFilteringInputs
                        initialFilters={initialFilters}
                        onFilter={handleFilter}
                    /> */}

                    <table className="table table-bordered mb-2">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เอกสาร</th>
                                <th>รายการ</th>
                                <th className="text-center w-[25%]">ผู้ขอ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={6}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && contracts) && contracts.map((contract, index) => (
                                <tr key={contract.id}>
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td className="text-sm">
                                        <p>เลขที่สัญญา <span className="badge rounded-pill text-bg-primary">{contract.contract_no}</span></p>
                                        <p>วันที่สัญญา <span className="badge rounded-pill text-bg-primary">{toShortTHDate(contract.contract_date)}</span></p>
                                        <div className="text-lg text-center mt-1">
                                            {contract.status === 0 && <span className="badge rounded-pill text-bg-secondary">รออนุมัติ</span>}
                                            {contract.status === 1 && <span className="badge rounded-pill text-bg-success">อนุมัติแล้ว</span>}
                                            {contract.status === 2 && <span className="badge rounded-pill text-bg-info">เคลียร์แล้ว</span>}
                                            {contract.status === 9 && <span className="badge rounded-pill text-bg-danger">ยกเลิก</span>}
                                        </div>
                                    </td>
                                    <td className="text-sm">
                                        <div className="text-blue-600">
                                            {contract.loan?.project_name}
                                            <span className="ml-1">เป็นเงินทั้งสิ้น {currency.format(contract.net_total)} บาท</span>
                                        </div>

                                        <LoanListDetail items={contract.details} />
                                    </td>
                                    <td className="text-sm">
                                        <EmployeeCard employee={contract.loan?.employee} />
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/loan/${contract.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/loan/${contract.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(contract.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        pager={pager}
                        onPageClick={(url) => setApiEndpoint(url)}
                    />
                </div>
            </div>
        </div>
    )
}

export default LoanContractList
