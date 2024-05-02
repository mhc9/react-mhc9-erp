import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getContracts, destroy } from '../../features/slices/loan-contract/loanContractSlice'
import { currency, generateQueryString, toShortTHDate } from '../../utils'
import LoanListDetail from './List/ListDetail'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import EmployeeCard from '../../components/Employee/Card'
// import LoanFilteringInputs from '../../../components/loan/FilteringInputs'

const initialFilters = {
    pr_no: '',
    pr_date: '',
    division: '',
    status: ''
};

const LoanContractReport = () => {
    const dispatch = useDispatch();
    const { contracts, pager, isLoading } = useSelector(state => state.loanContract);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getContracts({ url: `/api/loan-contracts/search?page=&status=` }));
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
                <Breadcrumb.Item active>ทะเบียนคุม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">ทะเบียนคุม</h2>

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
                                <th className="text-center w-[20%]">ผู้ยืม</th>
                                <th>โครงการ</th>
                                <th className="text-center w-[8%]">จำนวนเงินยืม</th>
                                <th className="text-center w-[8%]">จำนวนเงิน<br />คืน/เบิกเพิ่ม</th>
                                <th className="text-center w-[8%]">วันที่เงินเข้า</th>
                                <th className="text-center w-[8%]">วันที่ครบกำหนด</th>
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
                                        <p>วันส่งสัญญา <span className="badge rounded-pill text-bg-primary">{toShortTHDate(contract.sent_date)}</span></p>
                                    </td>
                                    <td className="text-sm">
                                        <EmployeeCard employee={contract.loan?.employee} />
                                    </td>
                                    <td className="text-sm">
                                        {contract.loan?.project_name}
                                    </td>
                                    <td className="text-sm text-center">
                                        {currency.format(contract.net_total)}
                                    </td>
                                    <td className="text-sm text-center">
                                        {currency.format(contract.net_total)}
                                    </td>
                                    <td className="text-sm text-center">
                                        {toShortTHDate(contract.sent_date)}
                                    </td>
                                    <td className="text-sm text-center">
                                        {toShortTHDate(contract.sent_date)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* <Pagination
                        pager={pager}
                        onPageClick={(url) => setApiEndpoint(url)}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default LoanContractReport
