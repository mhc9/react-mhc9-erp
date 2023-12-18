import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRequisition } from '../../features/slices/requisition/requisitionSlice'
import { toLongTHDate, currency } from '../../utils'
import { ThaiNumberToText } from '../../utils/currencyText'
import './Preview.css'

const Preview = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition } = useSelector(state => state.requisition);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    return (
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
                                    <span>{requisition.topic}</span>
                                </div>
                            </div>
                            <div className="memo-header-text">
                                <h3>เรียน</h3>
                                <span>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</span>
                            </div>
                        </div>
                        <div className="memo-content">
                            <div className="memo-paragraph">
                                ด้วย {requisition.division?.name+ ' '+requisition.division?.department?.name+ ' มีความประสงค์จะ' +((requisition.order_type_id == 1) ? 'ซื้อ' : '') +requisition.category?.name}
                                โดยใช้เงินงบประมาณปี {requisition.year} ตามแผนงาน{requisition.budget?.project?.plan?.name} {requisition.budget?.project?.name} {requisition.budget?.name}
                                รวมจำนวนเงินทั้งสิ้น {currency.format(requisition.net_total)} บาท ({ThaiNumberToText(requisition.net_total)}) รายละเอียดตามเอกสารแนบ
                            </div>
                            <div className="memo-paragraph">
                                เหตุผลและความจำเป็นที่ต้องจัดซื้อจัดจ้าง
                                <p>
                                    เพื่อ{requisition.reason ? requisition.reason : 'เพื่อใช้ในการดำเนินงานภายในศูนย์สุขภาพจิตที่ 9'} ปีงบประมาณ {requisition.year} 
                                    พร้อมทั้งขอเสนอชื่อแต่งตั้งผู้รับผิดชอบ หรือคณะกรรมการตรวจรับพัสดุ (กรณีวงเงินไม่เกิน ๑oo,ooo บาท) ดังต่อไปนี้
                                </p>
                            </div>
                            <div className="memo-paragraph">
                                ผู้กำหนดร่างขอบเขตของงานหรือรายละเอียดคุณลักษณะเฉพาะ
                                <p>
                                    {requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname}
                                    {' '}ตำแหน่ง {requisition.requester.position?.name}{requisition.requester.level?.name}
                                </p>
                            </div>
                            <div className="memo-paragraph">
                                ผู้ตรวจรับพัสดุ
                                {requisition.committees.map((com, index) => (
                                    <p key={com.id}>
                                        {requisition.committees.length > 1 && <span>{index+1}. </span>}
                                        {com.employee.prefix.name+com.employee.firstname+ ' ' +com.employee.lastname}
                                        {' '}ตำแหน่ง {com.employee.position?.name}{com.employee.level?.name}
                                    </p>
                                ))}
                            </div>
                            <div className="memo-paragraph">
                                จึงเรียนมาเพื่อโปรดพิจารณา หากเห็นชอบขอได้โปรดอนุมัติหลักการให้จัดซื้อจัดจ้างพัสดุ ตามรายการดังกล่าวข้างต้น และแต่งตั้งกรรมการดำเนินการตามที่เสนอ
                            </div>
                            <div className="memo-approvement">
                                <div className="memo-row">
                                    <div style={{ width: '40%' }}>&nbsp;</div>
                                    <div style={{ width: '60%' }}>
                                        <div style={{ textAlign: 'center', width: '100%' }}>
                                            <div className="signature">
                                                <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p>
                                                <p>{requisition.requester.position?.name}{requisition.requester.level?.name}</p>
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
                                            <div className="signature">
                                                {/* <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p> */}
                                                <p>(นางสาวทิพปภา สีมาธรรมการย์)</p>
                                                <p>นักวิชาการพัสดุ</p>
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
                                    <div style={{ width: '60%' }}>
                                        <div style={{ textAlign: 'center', width: '100%', height: '120px' }}>
                                            <div style={{ marginTop: '60px' }}>
                                                <i className="far fa-square"></i> อนุมัติ&nbsp;&nbsp;&nbsp;&nbsp;
                                                <i className="far fa-square"></i> ไม่อนุมัติ
                                            </div>
                                            <div className="signature">
                                                <p>( นางสาวศิริลักษณ์ แก้วเกียรติพงษ์ )</p>
                                                <p>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p>
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
                )}
            </div>
        </div>
    )
}

export default Preview