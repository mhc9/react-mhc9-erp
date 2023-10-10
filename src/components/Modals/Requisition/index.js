import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { getRequisitions } from '../../../features/requisition/requisitionSlice';
import FilteringInputs from '../../Requisition/FilteringInputs';
import { useGetInitialFormDataQuery } from '../../../services/requisition/requisitionApi';
import { currency, toShortTHDate } from '../../../utils';
import Loading from '../../Loading';
import Pagination from '../../Pagination';

const initialFilters = {
    pr_no: '',
    pr_date: '',
    division: '',
    status: '1'
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
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getRequisitions({ url: `/api/requisitions/search?page=&status=1&limit=5` }));
        } else {
            dispatch(getRequisitions({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handlePageClick = (url) => {
        setApiEndpoint(`${url}&status=0`);
    };

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/requisitions/search?page=&status=1&limit=5`);
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
            <Modal.Body className="pb-0">
                <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={handleFilter}
                    formData={formData}
                />

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
                                    <td className="text-sm font-thin">
                                        <p>
                                            เลขที่ <span className="badge text-bg-success mr-1">{requisition.pr_no}</span> 
                                            วันที่ <span className="badge text-bg-success">{toShortTHDate(requisition.pr_date)}</span></p>
                                        <p>
                                            {requisition.requester?.prefix?.name}{requisition.requester?.firstname} {requisition.requester?.lastname}
                                            {' ' + requisition.requester?.position?.name}{requisition.requester?.level && requisition.requester?.level?.name}
                                        </p>
                                        <p>{' ' + requisition.topic} จำนวน {currency.format(requisition.item_count)} รายการ รวมเป็นเงิน {currency.format(requisition.net_total)} บาท</p>
                                        <p className="text-xs font-thin text-blue-600">
                                            ตาม{requisition.budget?.project?.plan?.name} {requisition.budget?.project?.name}<br /> {requisition.budget?.name}
                                        </p>
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
            </Modal.Body>
            <Modal.Footer className="py-1 px-2">
                <Pagination
                    pager={pager}
                    onPageClick={(url) => handlePageClick(url)}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalRequisitionList
