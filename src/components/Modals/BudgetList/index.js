import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { generateQueryString, getUrlParam } from '../../../utils';
import { getBudgets } from '../../../features/slices/budget/budgetSlice';
import { useGetInitialFormDataQuery } from '../../../features/services/budget/budgetApi';
import FilteringInputs from './FilteringInputs';
import Loading from '../../Loading';
import Pagination from '../../Pagination';

const initialFilters = {
    name: '',
    type: '',
    plan: '',
    year: moment().year(),
};

const ModalBudgetList = ({ isShow, onHide, onSelect }) => {
    const dispatch = useDispatch();
    const { budgets, pager, isLoading } = useSelector(state => state.budget);
    const [year, setYear] = useState(moment().year())
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));
    const { data: formData } = useGetInitialFormDataQuery({ year });

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getBudgets({ url: `/api/budgets/search?page=&limit=5${params}` }));
        } else {
            dispatch(getBudgets({ url: `${apiEndpoint}&limit=5${params}` }));
        }
    }, [apiEndpoint]);

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
                    onFilter={(queryStr) => {
                        setParams(queryStr);
                        setApiEndpoint(prev => prev === '' ? `/api/budgets/search?page=` : '');
                        setYear(getUrlParam(queryStr));
                    }}
                    formData={formData}
                />

                <div>
                    <table className="table table-bordered table-striped table-hover mb-0">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                {/* <th className="text-center w-[15%]">เลขที่พัสดุ</th> */}
                                <th>รายการงบประมาณ</th>
                                <th className="text-center w-[10%]">ปีงบประมาณ</th>
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
                                        <p className="text-gray-400 text-sm">{budget.activity?.project?.plan?.plan_no} {budget.activity?.project?.plan?.name}</p>
                                        <p className="text-sm font-semibold">{budget.activity?.project?.name}</p>
                                        <p className="text-blue-500 text-sm">
                                            {budget.activity?.name}
                                            <BudgetTypeBadge type={budget.type}/>
                                        </p>
                                    </td>
                                    <td className="text-center">{budget.activity?.year && budget.activity?.year + 543}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                setApiEndpoint('');
                                                onSelect(budget);
                                                onHide();
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

export default ModalBudgetList;

const BudgetTypeBadge = ({ type }) => {
    return (
        <span className="ml-1 text-sm">
            {type.id === 1 && <span className="badge rounded-pill bg-success">{type?.name}</span>}
            {type.id === 2 && <span className="badge rounded-pill bg-primary">{type?.name}</span>}
            {type.id === 3 && <span className="badge rounded-pill bg-danger">{type?.name}</span>}
        </span>
    )
}
