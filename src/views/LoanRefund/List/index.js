import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getRefunds, destroy, resetSuccess } from '../../../features/slices/loan-refund/loanRefundSlice'
import { currency, generateQueryString, toShortTHDate } from '../../../utils'
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
    const { refunds, pager, isLoading, isSuccess } = useSelector(state => state.loanRefund);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccess());
            toast.success('ลบรายการหักล้างเงินยืมสำเร็จ!!');

            /** Reset ค่าของ apiEndpoint เพื่่อ re-render page */
            setApiEndpoint(prev => prev === '' ? `/api/loan-refunds/search?page=&status=1` : '')
        }
    }, [isSuccess]);

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
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
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
                                            {refund.status === 'N' && <span className="badge rounded-pill bg-danger">ยังไม่เคลียร์</span>}
                                            {refund.status === 'Y' && <span className="badge rounded-pill bg-success">เคลียร์แล้ว</span>}
                                            {refund.status === 'C' && <span className="badge rounded-pill bg-dark">ยกเลิก</span>}
                                        </div>
                                    </td>
                                    <td className="text-sm">
                                        <p className={`font-bold ${refund.contract?.loan?.loan_type_id === 1 ? 'text-blue-600' : 'text-red-500'}`}>
                                            <span className="mr-2">เลขที่สัญญา {refund.contract?.contract_no}</span>
                                            <span>: {refund.contract?.loan?.loan_type_id === 1 ? 'ยืมเงินโครงการ' : 'ยืมเงินเดินทางไปราชการ'}</span>
                                        </p>
                                        <div>
                                            {refund.contract?.loan?.project_name}
                                            <span className="ml-1">
                                                เป็นเงินทั้งสิ้น 
                                                <span className="ml-1 text-blue-600">{currency.format(refund.contract?.net_total)}</span> บาท
                                            </span>
                                            <span className="ml-1">
                                                และ{refund.refund_type_id === 1 ? 'คืนเงิน' : 'เบิกเงินเพิ่ม'} จำนวน
                                                <span className={`ml-1 ${refund.refund_type_id === 1 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {currency.format(refund.balance)}
                                                </span> บาท
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-sm">
                                        <EmployeeCard employee={refund.contract?.loan?.employee} />
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/loan-refund/${refund.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        {refund.status === 'N' && (
                                            <>
                                                <Link to={`/loan-refund/${refund.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                                    <FaPencilAlt />
                                                </Link>
                                                <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(refund.id)}>
                                                    <FaTrash />
                                                </button>
                                            </>
                                        )}
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
