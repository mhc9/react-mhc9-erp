import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import moment from 'moment'
import { getReport } from '../../features/slices/loan-contract/loanContractSlice'
import { currency, generateQueryString, toShortTHDate } from '../../utils'
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
            dispatch(getReport(2024));
        } else {
            dispatch(getReport(2024));
        }
    }, [dispatch, apiEndpoint, params])

    const handleFilter = (queryStr) => {
        setParams(queryStr);

        setApiEndpoint(`/api/loan-contracts/search?page=`);
    };

    const renderRefundTotal = (type, total) => {
        return (
            <div className={`${type === 1 ? 'text-green-600' : 'text-red-600'} font-bold`}>
                {type === 1 ? '+' : '-'}{currency.format(total)} 
            </div>
        )
    }

    const isOverRefund = (refundDate, clearDate) => {
        return moment(clearDate).diff(moment(refundDate), 'days') > 1;
    }

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item active>ทะเบียนคุม</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-bold">ทะเบียนคุม</h1>
                </div>

                <div>
                    {/* <LoanFilteringInputs
                        initialFilters={initialFilters}
                        onFilter={handleFilter}
                    /> */}

                    <table className="table table-bordered mb-2">
                        <thead>
                            <tr>
                                <th className="text-center w-[3%]">#</th>
                                <th className="text-center w-[8%]">เอกสาร</th>
                                <th className="text-center w-[15%]">ผู้ยืม</th>
                                <th className="text-center">โครงการ</th>
                                <th className="text-center w-[8%]">จำนวนเงินยืม</th>
                                <th className="text-center w-[8%]">
                                    จำนวนเงิน<br />
                                    <span className="text-green-600">คืน</span>/
                                    <span className="text-red-600">เบิกเพิ่ม</span>
                                </th>
                                <th className="text-center w-[8%]">วันที่เงินเข้า</th>
                                <th className="text-center w-[8%]">วันที่ครบกำหนด</th>
                                <th className="text-center w-[8%]">วันที่เคลียร์</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={9}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && contracts) && contracts.map((contract, index) => (
                                <tr key={contract.id}>
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td className="text-sm">
                                        <p className="p-0 m-0">เลขที่สัญญา :</p>
                                        <span className="badge rounded-pill text-bg-primary mb-1">{contract.contract_no}</span>
                                        <p className="p-0 m-0">วันส่งสัญญา :</p>
                                        <span className="badge rounded-pill text-bg-primary">{toShortTHDate(contract.sent_date)}</span>
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
                                        {contract.refund && renderRefundTotal(contract.refund?.refund_type_id, contract.refund?.net_total)}
                                    </td>
                                    <td className="text-sm text-center">
                                        {toShortTHDate(contract.deposited_date)}
                                    </td>
                                    <td className="text-sm text-center">
                                        {toShortTHDate(contract.refund_date)}
                                    </td>
                                    <td className="text-sm text-center font-bold">
                                        {(contract.refund_date && contract.refund) && isOverRefund(contract.refund_date, contract.refund?.doc_date)
                                            ? <span className="text-red-600">{toShortTHDate(contract.refund?.doc_date)}</span>
                                            : <span className="text-green-600">{toShortTHDate(contract.refund?.doc_date)}</span>
                                        }
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

export default LoanContractReport
