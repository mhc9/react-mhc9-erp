import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Pagination } from 'react-bootstrap'
import { getLoans } from '../../../features/slices/loan/loanSlice';
import { currency, toShortTHDate } from '../../../utils'
import Loading from '../../Loading';

const ModalLoanList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { loans, pager, isLoading } = useSelector(state => state.loan);

    useEffect(() => {
        dispatch(getLoans({ url: '/api/loans/search?page=&status=1' }))
    }, []);

    const handlePageClick = (url) => {

    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>รายการคำขอยืมเงิน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เอกสาร</th>
                                <th>รายการคำขอ</th>
                                <th className="text-center w-[10%]">เลือก</th>
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
                            {(loans && loans.length > 0) ? loans.map((loan, index) => (
                                <tr key={loan.id} className="font-thin text-sm">
                                    <td className="text-center">{index+pager.from}</td>
                                    <td>
                                        <p><b>เลขที่เอกสาร</b> {loan.doc_no}</p>
                                        <p><b>วันที่เอกสาร</b> {toShortTHDate(loan.doc_date)}</p>
                                    </td>
                                    <td>
                                        {/* <p className="text-gray-400 text-sm">{loan?.project.plan?.name}</p> */}
                                        {/* <p className="text-blue-500">
                                            {loan?.budget?.name}
                                            <span className="font-thin ml-1">{loan?.budget?.project?.plan?.name} / {loan?.budget?.project?.name}</span>
                                        </p> */}
                                        <p>
                                            <span className="text-blue-600">{loan?.project_name}</span>
                                            <span className="ml-1"><b>ระหว่างวันที่</b> {toShortTHDate(loan?.project_sdate)} - {toShortTHDate(loan?.project_edate)}</span>
                                            <span className="ml-2"><b>ยอดเงินยืม</b><span className="font-bold text-red-600 mx-1">{currency.format(loan?.net_total)}</span>บาท</span>
                                        </p>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onHide();
                                                onSelect(loan);
                                            }}
                                        >
                                            เลือก
                                        </button>
                                    </td>
                                </tr>
                            )) : !isLoading && (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        <span className="text-red-500 text-sm font-thin">-- ไม่มีรายการ --</span>
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

export default ModalLoanList