import React, { useEffect, useState } from 'react'
import { Modal, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../../features/budget/budgetSlice';
import Loading from '../../Loading';
import FilteringInputs from './FilteringInputs';

const initialFilters = {
    name: '',
    type: '',
    project: '',
};

const ModalBudgetList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { budgets, pager, isLoading } = useSelector(state => state.budget);
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getBudgets({ url: '/api/budgets/search' }));
        } else {
            dispatch(getBudgets({ url: apiEndpoint }));
        }
    }, [apiEndpoint]);

    const handlePageClick = (url) => {
        /** ============== Generate query string param list ============== */
        // query string param list here
        const queryStr = '';
        /** ============================ */

        setApiEndpoint(`${url}${queryStr}`);
    };

    const handleFilter = (queryStr) => {
        console.log(queryStr);
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>รายการงบประมาณ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={handleFilter}
                    formData={{ types: [{ id: 1, name: 'งบบุคลากร' }, { id: 2, name: 'งบดำเนินงาน' }] }}
                />

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                {/* <th className="text-center w-[15%]">เลขที่พัสดุ</th> */}
                                <th>รายการงบประมาณ</th>
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
                            {budgets && budgets.map((budget, index) => (
                                <tr key={budget.id}>
                                    <td className="text-center">{index+pager.from}</td>
                                    {/* <td className="text-center">{budget.budget_no}</td> */}
                                    <td>
                                        <p className="text-gray-400 text-sm">{budget.project?.plan?.name}</p>
                                        <p className="text-gray-400 text-sm">{budget.project?.name}</p>
                                        <p>{budget.name}</p>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                onHide();
                                                onSelect(budget);
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

export default ModalBudgetList
