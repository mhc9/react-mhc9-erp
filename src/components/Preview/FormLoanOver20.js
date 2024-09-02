import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRefund } from '../../features/slices/loan-refund/loanRefundSlice'
import { currency, toLongTHDate, toShortTHDate, replaceExpensePatternFromDesc } from '../../utils'
import { ThaiNumberToText } from '../../utils/currencyText'
import './Preview.css'

const FormLoanOver20 = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { refund } = useSelector(state => state.loanRefund);

    useEffect(() => {
        if (id) dispatch(getRefund(id));
    }, [dispatch, id]);

    return (
        <>
            {/* PAGE 1 */}
            {(refund && refund?.is_over20) && <div className="paper-container">
                <div className="memo-wrapper">
                    <div className="memo-top">
                        <div className="memo-logo">
                            <img src={`${process.env.REACT_APP_API_URL}/img/krut.jpg`} />
                        </div>
                        <h1>บันทึกข้อความ</h1>
                    </div>
                    <div className="memo-box">
                        <div className="memo-header">
                            <div className="memo-header-text">
                                <h3>ส่วนราชการ</h3>
                                <div className="memo-header-value">
                                    <span>{refund.contract?.loan?.department?.name} ศูนย์สุขภาพจิตที่ ๙ โทร o ๔๔๒๕ ๖๗๒๙</span>
                                    {/* refund.contract?.loan?.division?.name+ ' '+ */}
                                </div>
                            </div>
                            <div className="memo-header-text">
                                <div>
                                    <h3>ที่</h3>
                                    <div className="memo-header-value">
                                        <span>{refund.doc_no}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3>วันที่</h3>
                                    <div className="memo-header-value">
                                        <span>{toLongTHDate(moment(refund.doc_date).toDate())}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="memo-header-text">
                                <h3>เรื่อง</h3>
                                <div className="memo-header-value">
                                    <span>ขออนุมัติคืนเงินยืมราาชการเกิน 20%</span>
                                </div>
                            </div>
                            <div className="memo-header-text">
                                <h3>เรียน</h3>
                                <span>อธิบดีกรมสุขภาพจิต</span>
                            </div>
                        </div>
                        <div className="memo-content">
                            <div className="memo-paragraph">
                                ตามที่ {refund.contract?.loan?.department?.name}
                                {refund.contract?.loan?.loan_type_id === 1 
                                    ? <span className="ml-1">ได้ขออนุมัติยืมเงินราชการในการจัด{refund.contract?.loan?.project_name}</span>
                                    : <span className="ml-1">เรื่อง ขออนุมัติยืมเงินราชการ เพื่อเป็นค่าใช้จ่ายในการเดินทางไปราชการเข้าร่วม{refund.contract?.loan?.project_name}</span>
                                }
                                <span className="ml-1">
                                    ระหว่างวันที่ {toLongTHDate(moment(refund.contract?.loan?.project_sdate).toDate())} ถึงวันที่ {toLongTHDate(moment(refund.contract?.loan?.project_edate).toDate())}
                                </span>
                                {refund.contract?.loan?.courses.length === 1 && refund.contract?.loan?.courses.map((course, index) => (
                                    <span className="mx-1" key={course.id}>
                                        ณ {course.place?.name} จ.{course.place?.changwat?.name}
                                    </span>
                                ))}
                                จากงบประมาณศูนย์สุขภาพจิตที่ 9
                                {refund.contract?.loan?.budgets && refund.contract?.loan?.budgets.map((data, index) => (
                                    <span className="ml-1" key={data.budget_id}>
                                        ตามแผนงาน{data.budget?.project?.plan?.name} {data.budget?.project?.name} {data.budget?.name}
                                    </span>
                                ))}
                                <span className="ml-1">
                                    รวมจำนวนเงินทั้งสิ้น {currency.format(refund.contract?.loan?.budget_total)} บาท ({ThaiNumberToText(refund.contract?.loan?.budget_total)})
                                </span>
                                <span className="ml-1">
                                    โดยเป็นค่าใช้จ่ายโครงการ เป็นจำนวนเงินทั้งสิ้น {currency.format(refund.net_total)} บาท ({ThaiNumberToText(refund.net_total)})
                                </span>
                                <span className="ml-1">
                                    {refund.over20_reason}
                                </span> นั้น
                            </div>

                            <div className="memo-paragraph">
                                ในการนี้ ข้าพเจ้า{refund.contract?.loan.employee.prefix.name+refund.contract?.loan.employee.firstname+ ' ' +refund.contract?.loan.employee.lastname}
                                <span className="ml-1">{refund.contract?.loan.employee.position?.name}{refund.contract?.loan.employee.level?.name}</span>
                                <span className="ml-1">
                                    จึงขอส่งคืนเงินยืมราชการเกิน 20% เป็นจำนวนเงิน {currency.format(refund.balance)} บาท ({ThaiNumberToText(refund.balance)})
                                </span>
                            </div>

                            <div className="memo-paragraph">
                                จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติและดำเนินการต่อไปด้วย จะเป็นพระคุณ
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
                                    <div style={{ width: '40%' }}>
                                        <div style={{ width: '100%', height: '100px' }}>
                                            <div className="text-center">
                                                <p className="text-lg font-bold">อนุมัติ</p>
                                            </div>
                                            <div className="pt-[40px] flex flex-col items-center justify-center">
                                                <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                <div className="signature">
                                                    <p>( นายนิตย์  ทองเพชรศรี )</p>
                                                    <p>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p>
                                                    {/* <p>รักษาราชการแทนผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p> */}
                                                    <p>ปฏิบัติราชการแทนอธิบดีกรมสุขภาพจิต</p>
                                                    <div className="signature-date">
                                                        <p>วันที่</p>
                                                        <div style={{ width: '150px', borderBottom: '1px dashed black' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            {/* END PAGE 1 */}
        </>
    )
}

export default FormLoanOver20