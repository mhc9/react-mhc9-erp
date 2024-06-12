import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa'
import moment from 'moment'
import { getRefund } from '../../features/slices/loan-refund/loanRefundSlice'
import { currency, toLongTHDate, toShortTHDate, replaceExpensePatternFromDesc } from '../../utils'
import { ThaiNumberToText } from '../../utils/currencyText'
import './Preview.css'

const FormLoanRefundBill = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { refund } = useSelector(state => state.loanRefund);

    useEffect(() => {
        if (id) dispatch(getRefund(id));
    }, [dispatch, id]);

    return (
        <>
            {/* PAGE 1 */}
            <div className="paper-container">
                <div className="form-wrapper form-bill">
                    <div className="form-top mb-4">
                        <h1 className="text-2xl font-bold">ใบรับใบสำคัญ</h1>
                    </div>
                    {refund && (
                        <div className="form-box">
                            <div className="form-header mb-2">
                                <div className="flex flex-row justify-between items-start">
                                    <div className="memo-header-text">
                                        <h3>เลขที่</h3>
                                        <span>................./.................</span>
                                    </div>
                                    <div className="flex flex-col w-[40%]">
                                        <div><h3>ศูนย์สุขภาพจิตที่ 9</h3></div>
                                        <div className="flex flex-row items-center gap-2">
                                            <h3>วันที่</h3>
                                            <span>............................................</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="memo-content">
                                <div className="memo-paragraph">
                                    ได้รับใบสำคัญจาก...{refund.contract?.loan.employee.prefix.name+refund.contract?.loan.employee.firstname+ ' ' +refund.contract?.loan.employee.lastname}...
                                    <span className="ml-1">ตำแหน่ง......{refund.contract?.loan.employee.position?.name}{refund.contract?.loan.employee.level?.name}........</span>
                                    <div className="flex flex-row items-center gap-2 indent-0">
                                        <span>สังกัดศูนย์สุขภาพจิตที่ 9 เพื่อส่งใช้เงินยืม</span>
                                        <div className="flex flex-row items-center gap-1">
                                            {refund.contract?.loan.money_type_id === 1 ? <FaCheckSquare /> : <FaRegSquare /> } เงินทดลองราชการ
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            {refund.contract?.loan.money_type_id === 2 ? <FaCheckSquare /> : <FaRegSquare /> } เงินยืมนอกงบประมาณ
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            {refund.contract?.loan.money_type_id === 3 ? <FaCheckSquare /> : <FaRegSquare /> } เงินยืมราชการ
                                        </div>
                                    </div>
                                    <span>ตามสัญญายืมเลขที่ {refund.contract?.contract_no} ลงวันที่ {toLongTHDate(moment(refund.contract?.approved_date).toDate())}</span>
                                    <span>
                                        เป็นจำนวนเงิน {currency.format(refund.contract?.net_total)} บาท ({ThaiNumberToText(refund.contract?.net_total)})
                                    </span>
                                    <span className="ml-1">
                                        และได้ส่งใช้ใบสำคัญ จำนวน............ ชุด............ฉบับ เป็นเงิน {currency.format(refund.net_total)} บาท ({ThaiNumberToText(refund.net_total)})
                                    </span>
                                    <div className="flex flex-row indent-0 mt-1 ml-[10px]">
                                        <div className="w-[5%]">โดย</div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row gap-1">
                                                <FaRegSquare /> ส่งใช้ใบสำคัญเท่ากับจำนวนเงินที่ยืม
                                            </div>
                                            <div className="flex flex-row gap-1">
                                                <FaRegSquare /> ส่งใช้ใบสำคัญสูงกว่าจำนวนเงินที่ยืม
                                                <span>คงเหลือรับจริง...{currency.format(refund.balance)}...บาท</span>
                                            </div>
                                            <div className="flex flex-row gap-1">
                                                <FaRegSquare /> ส่งใช้ใบสำคัญน้อยกว่าจำนวนเงินที่ยืม
                                                <span>และส่งใช้ด้วยเงินสด...{currency.format(refund.balance)}...บาท</span>
                                            </div>
                                            <p className="indent-6">ตามใบเสร็จรับเงินเลขที่......................ลงวันที่......................</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="memo-approvement">
                                    <div className="memo-row">
                                        <div style={{ width: '40%' }}>&nbsp;</div>
                                        <div style={{ width: '60%' }}>
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        <p>({refund.contract?.loan?.employee.prefix.name+refund.contract?.loan?.employee.firstname+ ' ' +refund.contract?.loan?.employee.lastname})</p>
                                                        <p>{refund.contract?.loan?.employee.position?.name}{refund.contract?.loan?.employee.level?.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="memo-row">
                                        <div className="mt-[40px]">
                                            เลขที่ฎีกา...........................................ลงวันที่................................เบิกเงินจาก...............................
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* END PAGE 1 */}
        </>
    )
}

export default FormLoanRefundBill