import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getRefunds, destroy } from '../../../features/slices/loan-refund/loanRefundSlice'
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

const LoanRefundList = () => {
    const dispatch = useDispatch();
    const { refunds, pager, isLoading } = useSelector(state => state.loanRefund);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getRefunds({ url: `/api/loan-refunds/search?page=&status=1` }));
        } else {
            dispatch(getRefunds({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params])

    const handleFilter = (queryStr) => {
        setParams(queryStr);

        setApiEndpoint(`/api/loan-refunds/search?page=`);
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
                <Breadcrumb.Item active>รายการหักล้างเงินยืม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการหักล้างเงินยืม</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มรายการ</Link>
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
                                <th className="text-center w-[15%]">เอกสารหักล้าง</th>
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
                            {(!isLoading && refunds) && refunds.map((refund, index) => (
                                <tr key={refund.id}>
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td className="text-sm">
                                        <p>เลขที่ <span className="badge rounded-pill text-bg-primary">{refund.doc_no}</span></p>
                                        <p>วันที่ <span className="badge rounded-pill text-bg-primary">{toShortTHDate(refund.doc_date)}</span></p>
                                        <div className="text-lg text-center mt-1">
                                            {refund.contract?.status === 0 && <span className="badge rounded-pill text-bg-secondary">รออนุมัติ</span>}
                                            {refund.contract?.status === 1 && <span className="badge rounded-pill text-bg-success">อนุมัติแล้ว</span>}
                                            {refund.contract?.status === 2 && <span className="badge rounded-pill text-bg-info">เคลียร์แล้ว</span>}
                                            {refund.contract?.status === 9 && <span className="badge rounded-pill text-bg-danger">ยกเลิก</span>}
                                        </div>
                                    </td>
                                    <td className="text-sm">
                                        <p className={`font-bold ${refund.contract?.loan?.loan_type_id === 1 ? 'text-blue-600' : 'text-red-500'}`}>
                                            <span className="mr-2">เลขที่สัญญา {refund.contract?.contract_no}</span>
                                            <span>: {refund.contract?.loan?.loan_type_id === 1 ? 'ยืมเงินโครงการ' : 'ยืมเงินเดินทางไปราชการ'}</span>
                                        </p>
                                        <div>
                                            {refund.contract?.loan?.project_name}
                                            <span className="ml-1">เป็นเงินทั้งสิ้น {currency.format(refund.contract?.net_total)} บาท</span>
                                            <span className="ml-1">โดยมีรายการ{refund.refund_type_id === 1 ? 'คืนเงิน' : 'เบิกเงินเพิ่ม'} ดังนี้</span>
                                        </div>
                                        <LoanListDetail items={refund.details} />
                                    </td>
                                    <td className="text-sm">
                                        <EmployeeCard employee={refund.contract?.loan?.employee} />
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/loan-refund/${refund.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/loan-refund/${refund.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(refund.id)}>
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

export default LoanRefundList