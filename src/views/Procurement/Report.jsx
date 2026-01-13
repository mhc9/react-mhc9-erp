import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { currency, generateQueryString, toShortTHDate } from '../../utils'
import { getReports } from '../../features/slices/requisition/requisitionSlice';

const ProcurementReport = () => {
    const [cookies] = useCookies();
    const initialFilters = {
        sdate: '2025-12-01',
        edate: '2025-12-31',
        division: '',
        status: '>=,3',
        limit: 100,
        year: '', //cookies.budgetYear,
    };
    const dispatch = useDispatch();
    const { requisitions, pager, isLoading, isDeleted } = useSelector(state => state.requisition);
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString(initialFilters));

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getReports({ url: `/api/requisitions/report/data?page=${params}` }));
        } else {
            dispatch(getReports({ url: `${apiEndpoint}${params}` }));
        }
    }, [apiEndpoint]);

    console.log(requisitions);
    
    return (
        <div>
            <div className='flex flex-col items-center'>
                <h1>แบบสรุปผลการดำเนินการจัดซื้อจัดจ้าง</h1>
                
                <p>หน่วยงาน  ศูนย์สุขภาพจิตที่ 9</p>
                <p>วันที่  1 พฤศจิกายน 2568 ถึงวันที่ 13 มกราคม 2569</p>
            </div>

            <table className="table table-bordered text-sm">
                <thead>
                    <tr>
                        <th className="text-center w-[5%]">#</th>
                        <th className="text-center w-[15%]">งานที่จัดซื้อหรือจัดจ้าง</th>
                        <th className="text-center w-[8%]">วงเงินที่จะซื้อหรือจ้าง</th>
                        <th className="text-center w-[8%]">ราคากลาง</th>
                        <th className="text-center w-[10%]">วิธีซื้อหรือจ้าง</th>
                        <th className="text-center w-[15%]">รายชื่อผู้เสนอราคา</th>
                        <th className="text-center w-[15%]">ผู้ได้รับการคัดเลือก<br />และราคาที่เสนอ</th>
                        <th className="text-center w-[10%]">เหตุผลที่<br />คัดเลือกโดยสรุป</th>
                        <th className="text-center">เลขที่และวันที่ของสัญญา<br />หรือข้อตกลงในการซื้อหรือจ้าง</th>
                    </tr>
                </thead>
                <tbody>
                    {requisitions.map((req, index) => (
                        <tr key={req.id}>
                            <td className="text-center">{index + 1}</td>
                            <td>{req.order_type_id === 2 ? req.contract_desc : req.category.name}</td>
                            <td className="text-right">{currency.format(req.net_total)}</td>
                            <td className="text-right">{currency.format(req.budget_total)}</td>
                            <td>{req.approvals[0].procuring?.name}</td>
                            <td>{req.approvals[0].supplier?.name}</td>
                            <td>{req.approvals[0].supplier?.name}</td>
                            <td>ราคาต่ำสุด</td>
                            <td>
                                <p>เลขที่ <span>{req.approvals[0].consider_no}</span></p>
                                <p>วันที่ <span>{toShortTHDate(req.approvals[0].consider_date)}</span></p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProcurementReport