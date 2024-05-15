import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Pagination } from 'react-bootstrap'
import { getPlaces } from '../../../features/slices/place/placeSlice';
import Loading from '../../Loading';

const ModalPlaceList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { places, pager, isLoading } = useSelector(state => state.place);
    const [params, setParams] = useState('');
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getPlaces({ url: '/api/places/search?page=' }));
        } else {
            dispatch(getPlaces({ url: `${apiEndpoint}${params}` }));
        }
    }, [apiEndpoint, params]);

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>รายการสถานที่</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <table className="table table-bordered text-sm">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                {/* <th className="text-center w-[15%]">เลขที่พัสดุ</th> */}
                                <th>สถานที่</th>
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
                            {places && places.map((place, index) => (
                                <tr key={place?.id} className="font-thin">
                                    <td className="text-center">{index+pager.from}</td>
                                    <td>
                                        <p className="font-bold">{place?.name}</p>
                                        <p className="font-thin text-sm">อ.{place?.amphur?.name} จ.{place?.changwat?.name}</p>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onHide();
                                                onSelect(place);
                                            }}
                                        >
                                            เลือก
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pager && (
                    <Pagination>
                        <Pagination.First disabled={pager.current_page === 1} onClick={() => setApiEndpoint(pager.first_page_url)} />
                        <Pagination.Prev disabled={!pager.prev_page_url} onClick={() => setApiEndpoint(pager.prev_page_url)} />
                        {/* <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item> */}
                        <Pagination.Next disabled={!pager.next_page_url} onClick={() => setApiEndpoint(pager.next_page_url)} />
                        <Pagination.Last disabled={pager.current_page === pager.last_page} onClick={() => setApiEndpoint(pager.last_page_url)} />
                    </Pagination>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ModalPlaceList