import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { getLoans } from '../../../features/slices/loan/loanSlice'
import { currency, generateQueryString, toShortTHDate } from '../../../utils'
import LoanListDetail from './ListDetail'
import Loading from '../../../components/Loading'
import Pagination from '../../../components/Pagination'
// import LoanFilteringInputs from '../../../components/loan/FilteringInputs'

const initialFilters = {
    pr_no: '',
    pr_date: '',
    division: '',
    status: '1'
};

const LoanList = () => {
    const dispatch = useDispatch();
    const { loans, pager, isLoading } = useSelector(state => state.loan);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getLoans({ url: `/api/loans/search?page=&status=1` }));
        } else {
            dispatch(getLoans({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params])

    const handleFilter = (queryStr) => {
        setParams(queryStr);

        setApiEndpoint(`/api/loans/search?page=`);
    };

    const handleDelete = (id) => {
        console.log(id);
    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการคำขอ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มคำขอ</Link>
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
                                <th className="text-center w-[18%]">ผู้ขอ</th>
                                <th className="text-center w-[6%]">สถานะ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={6}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && loans) && loans.map((loan, index) => (
                                <tr key={loan.id}>
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td className="text-sm">
                                        <p>เลขที่ <span className="badge rounded-pill text-bg-primary">{loan.doc_no}</span></p>
                                        <p>วันที่ <span className="badge rounded-pill text-bg-primary">{toShortTHDate(loan.doc_date)}</span></p>
                                    </td>
                                    <td className="text-sm">
                                        {loan.project && (
                                            <div className="text-blue-600">
                                                {loan.project.name}
                                                <span className="ml-1">เป็นเงินทั้งสิ้น {currency.format(loan.net_total)} บาท</span>
                                            </div>
                                        )}

                                        <LoanListDetail items={loan.details} />
                                    </td>
                                    <td className="text-sm">
                                        {loan.employee?.prefix?.name}{loan.employee?.firstname} {loan.employee?.lastname}
                                        <p className="font-thin">{loan.employee?.position?.name}{loan.employee?.level && loan.employee?.level?.name}</p>
                                    </td>
                                    <td className="text-center">
                                        {loan.status === 1 && <span className="badge rounded-pill text-bg-secondary">รอดำเนินการ</span>}
                                        {loan.status === 2 && <span className="badge rounded-pill text-bg-success">จัดซื้อแล้ว</span>}
                                    </td>
                                    <td className="text-center p-1">
                                        <Link to={`/loan/${loan.id}/detail`} className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to={`/loan/${loan.id}/edit`} className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(loan.id)}>
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

export default LoanList
