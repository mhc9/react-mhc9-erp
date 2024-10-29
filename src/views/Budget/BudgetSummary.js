import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBudgets } from '../../features/slices/budget/budgetSlice'

const BudgetSummary = () => {
    const dispatch = useDispatch();
    const { budgets, isLoading } = useSelector(state => state.budget);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        dispatch(getBudgets({ url: `/api/budgets` }));
    }, []);

    useEffect(() => {
        if (!isLoading && (budgets && budgets.length > 0)) {
            const personnel = budgets.filter(budget => budget.budget_type_id === 1);
            const operation = budgets.filter(budget => budget.budget_type_id === 2);
        }
    }, [budgets]);

    return (
        <div className="border rounded-md py-3 px-5 mb-2">
            <div className="flex flex-row mb-3">
                <h3 className="w-[50%]">งบบุคลากร</h3>
                <div className="border w-[50%] flex flex-row justify-around">
                    <div>
                        <h5>เป้าหมาย</h5>
                        <span></span>
                    </div>
                    <div>
                        <h5>ได้รับ</h5>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <h3 className="w-[50%]">งบดำเนินงาน</h3>
                <div className="border w-[50%] flex flex-row justify-around">
                    <div className="flex flex-col">
                        <h5>เป้าหมาย</h5>
                        <span></span>
                    </div>
                    <div className="flex flex-col">
                        <h5>ได้รับ</h5>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetSummary