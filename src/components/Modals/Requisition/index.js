import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Pagination } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { getRequisitions } from '../../../features/requisition/requisitionSlice';
import Loading from '../../Loading';
// import FilteringInputs from '../../Item/FilteringInputs';
// import { useGetInitialFormDataQuery } from '../../../services/item/itemApi';
import { currency, toShortTHDate } from '../../../utils';

const initialFilters = {
    name: '',
    category: '',
};

const initialFormData = {
    units: [],
    categories: [],
};

const ModalRequisitionList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { requisitions, pager, loading } = useSelector(state => state.requisition);
    const [params, setParams] = useState('');
    const [apiEndpoint, setApiEndpoint] = useState('');
    // const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getRequisitions({ url: `/api/requisitions/search?page=&status=0` }));
        } else {
            dispatch(getRequisitions({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handlePageClick = (url) => {
        setApiEndpoint(`${url}&status=0`);
    };

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/requisitions/search?page=&status=0`);
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header className="border py-1 px-2">
                <Modal.Title>รายการคำขอ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={handleFilter}
                    formData={formData}
                /> */}

                {loading && (
                    <div className="text-center">
                        <Loading />
                    </div>
                )}

                {!loading && requisitions && (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th>รายการคำขอ</th>
                                <th className="text-center w-[15%]">งบประมาณ</th>
                                <th className="text-center w-[10%]">เลือก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requisitions && requisitions.map((requisition, index) => (
                                <tr key={requisition.id}>
                                    <td className="text-center">{index+pager.from}</td>
                                    <td>
                                        <p className="text-sm font-thin">เลขที่ {requisition.pr_no} วันที่ {toShortTHDate(requisition.pr_date)}</p>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-red-500">{currency.format(requisition.net_total)}</span> บาท
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onHide();
                                                onSelect(requisition);
                                            }}
                                        >
                                            เลือก
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {(pager && pager.last_page > 1) && (
                    <div className="flex flex-row items-center justify-between gap-4">
                        <div className="text-sm font-thin flex flex-row items-center justify-between gap-4 w-3/5">
                            <span>หน้าที่ {pager.current_page}/{pager.last_page}</span>
                            <span>จำนวนทั้งสิ้น {pager.total} รายการ</span>
                        </div>

                        <Pagination className="float-right">
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
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ModalRequisitionList
