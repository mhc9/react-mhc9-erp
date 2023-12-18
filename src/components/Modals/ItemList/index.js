import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Pagination } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { getItems } from '../../../features/slices/item/itemSlice';
import Loading from '../../Loading';
import FilteringInputs from '../../Item/FilteringInputs';
import CardList from './CardList';
import TableList from './TableList';
import ControlButtons from './ControlButtons';
import { useGetInitialFormDataQuery } from '../../../features/services/item/itemApi';

const initialFilters = {
    name: '',
    category: ''
};

const initialFormData = {
    units: [],
    categories: [],
};

const ModalItemList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { items, pager, loading } = useSelector(state => state.item);
    const [isListMode, setIsListMode] = useState(false);
    const [params, setParams] = useState('');
    const [apiEndpoint, setApiEndpoint] = useState('');
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getItems({ url: `/api/items/search?page=&limit=12${params}` }));
        } else {
            dispatch(getItems({ url: `${apiEndpoint}${params}` }));
        }
    }, [dispatch, apiEndpoint, params]);

    const handlePageClick = (url) => {
        setApiEndpoint(`${url}&limit=12`);
    };

    const handleFilter = (queryStr) => {
        setParams(queryStr);
        setApiEndpoint(`/api/items/search?page=&limit=12`);
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header className="border py-1 px-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <Modal.Title>รายการสินค้า</Modal.Title>
                    <div className="flex flex-row items-center gap-2">
                        <ControlButtons isListMode={isListMode} onIsListModeClick={setIsListMode} />
                        <FaTimes size={'20px'} className="cursor-pointer hover:text-gray-400 text-gray-600" onClick={onHide} />
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
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

                {!isListMode ? (
                    <CardList
                        items={items}
                        onHide={onHide}
                        onSelect={onSelect}
                    />
                ) : (
                    <TableList
                        items={items}
                        pager={pager}
                        onHide={onHide}
                        onSelect={onSelect}
                    />
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

export default ModalItemList
