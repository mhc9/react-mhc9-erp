import React, { useEffect, useState } from 'react'
import { Modal, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../../features/item/itemSlice';
import Loading from '../../Loading';
import FilteringInputs from './FilteringInputs';
import CardList from './CardList';
import TableList from './TableList';
import ControlButtons from './ControlButtons';

const ModalItemList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { items, pager, loading } = useSelector(state => state.item);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [isListMode, setIsListMode] = useState(false);

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getItems({ url: '/api/items/search' }));
        } else {
            dispatch(getItems({ url: apiEndpoint }));
        }
    }, [apiEndpoint]);

    const handlePageClick = (url) => {
        /** ============== Generate query string param list ============== */
        // query string param list here
        const queryStr = '';
        /** ============================ */

        setApiEndpoint(`${url}${queryStr}`);
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
                    <ControlButtons isListMode={isListMode} onIsListModeClick={setIsListMode} />
                </div>
            </Modal.Header>
            <Modal.Body>
                <FilteringInputs />

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

                {pager && (
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
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ModalItemList
