import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../../features/slices/budget/budgetSlice';
import { useGetInitialFormDataQuery } from '../../../features/services/budget/budgetApi'
import Loading from '../../Loading';
import FilteringInputs from './FilteringInputs';
import Pagination from '../../../components/Pagination'

const initialFilters = {
    name: '',
    type: '',
    plan: '',
};

const ModalBudgetList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { budgets, pager, isLoading } = useSelector(state => state.budget);
    const { data: formData } = useGetInitialFormDataQuery();
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getBudgets({ url: `/api/budgets/search?page=&limit=5${params}` }));
        } else {
            dispatch(getBudgets({ url: `${apiEndpoint}&limit=5${params}` }));
        }
    }, [apiEndpoint, params]);

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='xl'
        >
            <Modal.Header closeButton className="py-1">
                <Modal.Title>รายการงบประมาณ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FilteringInputs
                    initialFilters={initialFilters}
                    onFilter={(queryStr) => setParams(queryStr)}
                    formData={formData}
                />

                <div>
                    <table className="table table-bordered table-striped table-hover mb-0">
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
                                        <p className="text-gray-400 text-sm">{budget.project?.plan?.plan_no} {budget.project?.plan?.name}</p>
                                        <p className="text-gray-400 text-sm">{budget.project?.name}</p>
                                        <p className="text-sm">{budget.name}</p>
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
            </Modal.Body>
            {pager && (
                <Modal.Footer className="py-1">
                    <Pagination
                        pager={pager}
                        onPageClick={(url) => setApiEndpoint(url)}
                    />
                </Modal.Footer>
            )}
        </Modal>
    )
}

export default ModalBudgetList
