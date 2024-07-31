import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRequisition } from '../../../features/slices/requisition/requisitionSlice'
import { toLongTHDate, currency } from '../../../utils'
import { ThaiNumberToText } from '../../../utils/currencyText'
import '../Preview.css'

const RequisitionConsideration = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition } = useSelector(state => state.requisition);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    return (
        <>
            {/* PAGE 1 */}
            <div className="paper-container">
                <div className="memo-wrapper">
                    <div className="memo-top">
                        <div className="memo-logo">
                            <img src={`${process.env.REACT_APP_API_URL}/img/krut.jpg`} />
                        </div>
                        <h1>บันทึกข้อความ</h1>
                    </div>
                    {requisition && (
                        <div className="memo-box">
                            <div className="memo-header">
                                <div className="memo-header-text">
                                    <h3>ส่วนราชการ</h3>
                                    <div className="memo-header-value">
                                        <span>{requisition.division?.department?.name} ศูนย์สุขภาพจิตที่ ๙ โทร o ๔๔๒๕ ๖๗๒๙</span>
                                        {/* requisition.division?.name+ ' '+ */}
                                    </div>
                                </div>
                                <div className="memo-header-text">
                                    <div>
                                        <h3>ที่</h3>
                                        <div className="memo-header-value">
                                            <span>{requisition.pr_no}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>วันที่</h3>
                                        <div className="memo-header-value">
                                            <span>{toLongTHDate(moment(requisition.pr_date).toDate())}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="memo-header-text">
                                    <h3>เรื่อง</h3>
                                    <div className="memo-header-value">
                                        <span>{requisition.topic} โดยวิธีเฉพาะเจาะจง</span>
                                    </div>
                                </div>
                                <div className="memo-header-text">
                                    <h3>เรียน</h3>
                                    <span>อธิบดีกรมสุขภาพจิต (ผ่านหัวหน้าเจ้าหน้าที่)</span>
                                </div>
                            </div>
                            <div className="memo-content">
                                <div className="memo-paragraph">
                                    ด้วย {requisition.division?.name+ ' '+requisition.division?.department?.name}
                                    <span className="ml-1">มีความประสงค์จะ{requisition.order_type_id === 1 ? 'ซื้อ' + requisition.category?.name : requisition.contract_desc}</span>
                                    <span className="ml-1">จำนวน {requisition.item_count} รายการ</span>
                                    <span className="ml-1">{requisition.reason ? requisition.reason : 'เพื่อใช้ในการดำเนินงานภายในศูนย์สุขภาพจิตที่ 9'}</span>
                                    <span className="ml-1">โดยใช้เงินงบประมาณปี {requisition.year} ตาม{requisition.budget?.project?.plan?.name} {requisition.budget?.project?.name} {requisition.budget?.name}</span>
                                    <span className="ml-1">รวมจำนวนเงินทั้งสิ้น {currency.format(requisition.net_total)} บาท ({ThaiNumberToText(requisition.net_total)}) รายละเอียดตามเอกสารแนบ</span>
                                </div>
                                <div className="memo-paragraph">
                                    <div className="mb-2">
                                        เหตุผลและความจำเป็นที่ต้องจัดซื้อจัดจ้าง
                                        <p>
                                            <span>{requisition.reason ? requisition.reason : 'เพื่อใช้ในการดำเนินงานภายในศูนย์สุขภาพจิตที่ 9'}</span>
                                            <span className="ml-1">{requisition.order_type_id === 1 ? requisition.category?.name : requisition.contract_desc}</span>
                                            <span className="ml-1">จำนวน {requisition.item_count} รายการ</span>
                                            <span className="ml-1">ปีงบประมาณ {requisition.year}</span>
                                            <span className="ml-1">พร้อมทั้งขอเสนอชื่อแต่งตั้งผู้รับผิดชอบ หรือคณะกรรมการตรวจรับพัสดุ (กรณีวงเงินไม่เกิน ๑oo,ooo บาท) ดังต่อไปนี้</span>
                                        </p>
                                    </div>
                                    <div className="indent-[2.5cm] mb-2">
                                        ผู้กำหนดรายละเอียดขอบเขตของงานหรือรายละเอียดคุณลักษณะเฉพาะ
                                        <p className="indent-[3cm]">
                                            {requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname}
                                            {' '}ตำแหน่ง {requisition.requester.position?.name}{requisition.requester.level?.name}
                                        </p>
                                    </div>
                                    <div className="indent-[2.5cm]">
                                        ผู้ตรวจรับพัสดุ
                                        {requisition.committees.map((com, index) => (
                                            <p key={com.id} className="indent-[3cm]">
                                                {requisition.committees.length > 1 && <span>{index+1}. </span>}
                                                {com.employee.prefix.name+com.employee.firstname+ ' ' +com.employee.lastname}
                                                {' '}ตำแหน่ง {com.employee.position?.name}{com.employee.level?.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    <span className="with-compressed-2x">จึงเรียนมาเพื่อโปรดพิจารณา หากเห็นชอบขอได้โปรดอนุมัติหลักการและขออนุมัติงบประมาณ</span>
                                    <span>ให้จัดซื้อจัดจ้างพัสดุตามรายการดังกล่าวข้างต้น และแต่งตั้งกรรมการดำเนินการตามที่เสนอ</span>
                                </div>
                                <div className="memo-approvement">
                                    <div className="memo-row">
                                        <div style={{ width: '40%' }}>&nbsp;</div>
                                        <div style={{ width: '60%' }}>
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p>
                                                        <p>{requisition.requester.position?.name}{requisition.requester.level?.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="memo-row">
                                        <div style={{ width: '100%' }}>
                                            <div style={{ width: '100%', padding: '1pt 0 1pt' }}>
                                                <div>
                                                    <p>เรียน อธิบดีกรมสุขภาพจิต</p>
                                                    <p style={{ textIndent: '1cm' }}>งานพัสดุ ได้ตรวจสอบความถูกต้องของเอกสารเรียบร้อยแล้ว จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="memo-row">
                                        <div style={{ width: '40%' }}>&nbsp;</div>
                                        <div style={{ width: '60%' }}>
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        {/* <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p> */}
                                                        <p>(นางสาวทิพปภา สีมาธรรมการย์)</p>
                                                        <p>นักวิชาการพัสดุ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="memo-row">
                                        <div style={{ width: '40%' }}>
                                            <div style={{ width: '100%', height: '100px' }}>
                                                <div>
                                                    <p>เรียน อธิบดีกรมสุขภาพจิต</p>
                                                    <p style={{ textIndent: '1cm' }}>- เพื่อโปรดพิจารณาอนุมัติ</p>
                                                </div>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        {/* <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p> */}
                                                        <p>(นางณัฏฐา ศิริผล)</p>
                                                        <p>หัวหน้าเจ้าหน้าที่</p>
                                                        <div className="signature-date">
                                                            <p>วันที่</p>
                                                            <div style={{ width: '150px', borderBottom: '1px dashed black' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[60%]">
                                            <div className="text-center w-[100%] h-[120px]">
                                                <div className="mt-[60px] ml-[20%] flex flex-col justify-start items-start gap-1">
                                                    <p><i className="far fa-square"></i> อนุมัติ</p>
                                                    <p><i className="far fa-square"></i> ไม่อนุมัติ เนื่องจาก............................</p>
                                                </div>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        <p>( นายนิตย์  ทองเพชรศรี )</p>
                                                        <p>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p>
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
                    )}
                </div>
            </div>
        </>
    )
}

export default RequisitionConsideration