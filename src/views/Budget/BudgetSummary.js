import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUser, FaRandom } from 'react-icons/fa'
import { getAllBudgetsOfYear } from '../../features/slices/budget/budgetSlice'
import { currency } from '../../utils/index'

const BudgetSummary = ({ year }) => {
    const dispatch = useDispatch();
    const { budgets, isLoading } = useSelector(state => state.budget);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        dispatch(getAllBudgetsOfYear({ url: `/api/budgets?year=${year}` }));
        setSummary(null);
    }, [year]);

    useEffect(() => {
        if (!isLoading && (budgets && budgets.length > 0)) {
            const personnel = budgets.reduce((sum, budget) => sum += budget.budget_type_id === 1 ? parseFloat(budget.total) : 0, 0);
            const operation = budgets.reduce((sum, budget) => sum += budget.budget_type_id === 2 ? parseFloat(budget.total) : 0, 0);

            setSummary({ personnel, operation })
        }
    }, [budgets]);

    return (
        <div className="border rounded-md py-3 px-5 mb-2 bg-[#D6EADF]">
            <div className="flex flex-row mb-3">
                <h3 className="w-[50%] text-xl font-semibold flex items-center gap-1"><FaRegUser /> งบบุคลากร</h3>
                <div className="w-[50%] flex flex-row justify-around">
                    <div className="flex flex-col justify-center items-center gap-1 w-[20%]">
                        <h5 className="font-light">เป้าหมาย</h5>
                        <span className="font-bold text-lg">0</span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-[20%]">
                        <h5 className="font-light">ได้รับ</h5>
                        <span className="font-bold text-lg">{currency.format(summary?.personnel)}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <h3 className="w-[50%] text-xl font-semibold flex items-center gap-1"><FaRandom /> งบดำเนินงาน</h3>
                <div className="w-[50%] flex flex-row justify-around">
                    <div className="flex flex-col justify-center items-center gap-1 w-[20%]">
                        <h5 className="font-light">เป้าหมาย</h5>
                        <span className="font-bold text-lg">0</span>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 w-[20%]">
                        <h5 className="font-light">ได้รับ</h5>
                        <span className="font-bold text-lg">{currency.format(summary?.operation)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BudgetSummary