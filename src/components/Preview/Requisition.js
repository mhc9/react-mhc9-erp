import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRequisition } from '../../features/slices/requisition/requisitionSlice'
import { toLongTHDate, currency } from '../../utils'
import { ThaiNumberToText } from '../../utils/currencyText'
import './Preview.css'

const Requisition = () => {
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
                                    ด้วย {requisition.division?.name+ ' '+requisition.division?.department?.name+ ' มีความประสงค์จะ' +((requisition.order_type_id === 1) ? 'ซื้อ' : '') +requisition.category?.name}
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
                                            <span className="ml-1">{requisition.category?.name}</span>
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
            {/* END PAGE 1 */}

            <div style={{ pageBreakBefore: 'always' }}></div>

            {/* PAGE 2 */}
            <div className="paper-container">
                <div className="px-[1.5cm] py-5 text-center">
                    <h1 className="text-2xl font-bold mb-2">รายละเอียดที่ขอซื้อ</h1>

                    <div className="mt-2 mb-1 pl-[10%] flex flex-col items-start justify-center">
                        1. รายละเอียดของพัสดุที่จะ{(requisition?.order_type_id === 1 ? 'ซื้อ' : '') +requisition?.category?.name} โดยวิธีเฉพาะเจาะจง จำนวน {requisition?.item_count} รายการ
                    </div>

                    <div>
                        <table className="table table-bordered mb-2">
                            <tr className="text-[14pt]">
                                <th className="w-[5%]">ลำดับ</th>
                                <th className="text-left pl-2">รายการ</th>
                                <th className="text-left pl-2 w-[30%]">รายละเอียดคุณลักษณะเฉพาะ</th>
                                <th className="w-[6%]">จำนวน</th>
                                <th className="w-[8%]">หน่วยนับ</th>
                                <th className="w-[10%]">ราคาต่อหน่วย</th>
                                <th className="w-[12%]">รวมเป็นเงิน</th>
                            </tr>
                            {requisition?.details.map((detail, index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td className="text-left pl-2">{detail.item?.name}</td>
                                    <td className="text-left text-[14pt] pl-2">{detail.description}</td>
                                    <td>{detail.amount}</td>
                                    <td>{detail.item?.unit?.name}</td>
                                    <td>{currency.format(detail.price)}</td>
                                    <td>{currency.format(detail.total)}</td>
                                </tr>
                            ))}

                            <tr className="font-bold">
                                <td colSpan={6}>รวมเป็นเงินทั้งสิ้น</td>
                                <td>{currency.format(requisition?.details.reduce((sum, curVal) => sum = sum + curVal.total, 0))}</td>
                            </tr>
                        </table>
                    </div>

                    <div className="mt-1 pl-[10%] flex flex-col items-start justify-center">
                        <p className="text-left">2. กำหนดเวลาที่ต้องการส่งมอบหรือให้งานแล้วเสร็จภายใน 5 วันทำการ นับตั้งแต่วันถัดจากวันทำข้อตกลงเป็นหนังสือหรือใบสั่งซื้อสั่งจ้างหรือสัญญา</p>
                        <p>3. หลักเกณฑ์การพิจารณาคัดเลือกข้อเสนอ การพิจารณาคัดเลือกข้อเสนอโดยใช้ เกณฑ์ราคา</p>
                        <p>4. สถานที่ส่งมอบพัสดุ ศูนย์สุขภาพจิตที่ 9 กรณี เติมน้ำมันระบุเป็น “สถานบริการน้ำมันเชื้อเพลิง”</p>
                    </div>

                    {/* ###################### signature ###################### */}
                    <div className="flex mt-[40px]">
                        <div className="w-[20%]">&nbsp;</div>
                        <div className="w-[80%] flex justify-center gap-4">
                            <div className="mt-[20px] text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="w-[220px] border-dashed border-b"></p>
                                    <div className="signature">
                                        <p>({requisition?.requester?.prefix?.name+requisition?.requester?.firstname+ ' ' +requisition?.requester?.lastname})</p>
                                        <p>{requisition?.requester?.position?.name}{requisition?.requester?.level?.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5px text-left leading-6">
                                ผู้กำหนดรายละเอียดขอบเขตของงาน<br />หรือรายละเอียดคุณลักษณะเฉพาะ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END PAGE 2 */}

            <div style={{ pageBreakBefore: 'always' }}></div>

            {/* PAGE 3 */}
            <div className="paper-container">
                <div className="memo-wrapper">
                    <div className="memo-box">
                        <div className="memo-header text-center">
                            <h1 className="text-xl font-bold mb-2">
                                แบบแสดงความบริสุทธิ์ใจในการจัดซื้อจัดจ้างทุกวิธีของหน่วยงาน (วงเงินเล็กน้อยไม่เกิน 100,000 บาท)<br />
                                ในการเปิดเผยข้อมูลความขัดแย้งทางผลประโยชน์<br />
                                ของหัวหน้าเจ้าหน้าที่พัสดุ เจ้าหน้าที่พัสดุและผู้ตรวจรับพัสดุ<br />
                            </h1>
                            <hr className="my-4" />
                        </div>
                        {requisition && (
                            <div className="memo-content">
                                <div className="memo-paragraph">
                                    <div className="mb-2 flex flex-row justify-start items-start gap-2">
                                        ข้าพเจ้า
                                        <p className="w-[320px] indent-0 border-dotted border-b text-center">นางณัฏฐา ศิริผล</p>
                                        <span className="indent-0">(หัวหน้าเจ้าหน้าที่)</span>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    <div className="mb-2 flex flex-row justify-start items-start gap-2">
                                        ข้าพเจ้า
                                        <p className="w-[320px] indent-0 border-dotted border-b text-center">นางสาวทิพปภา สีมาธรรมการย์</p>
                                        <span className="indent-0">(เจ้าหน้าที่)</span>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    <div className="mb-2 flex flex-row justify-start items-start gap-2">
                                        ข้าพเจ้า
                                        <p className="w-[320px] indent-0 border-dotted border-b text-center">
                                            {requisition?.requester?.prefix?.name+requisition?.requester?.firstname+ ' ' +requisition?.requester?.lastname}
                                        </p>
                                        <span className="indent-0">(ผู้ตรวจรับพัสดุ)</span>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    <p className="leading-8">
                                        ขอให้คำรับรองว่าไม่มีความเกี่ยวข้องหรือมีส่วนได้เสียไม่ว่าโดยตรงหรือโดยอ้อมหรือผลประโยชน์ใดๆ ที่ก่อให้เกิดความขัดแย้งทางผลประโยชน์กับผู้ขาย ผู้รับจ้าง ผู้เสนองาน หรือผู้ชนะการประมูล หรือผู้มีส่วนเกี่ยวข้องที่เข้ามามีนิติสัมพันธ์ และวางตัวเป็นกลางในการดำเนินการเกี่ยวกับการพัสดุ ปฏิบัติหน้าที่ด้วยจิตสำนึก ด้วยความโปร่งใส สามารถให้ผู้มีส่วนเกี่ยวข้องตรวจสอบได้ทุกเวลามุ่งประโยชน์ส่วนรวมเป็นสำคัญ ตามที่ระบุไว้ในประกาศกรมสุขภาพจิตว่าด้วยแนวทางปฏิบัติงานเพื่อตรวจสอบบุคลากร ในหน่วยงานด้านการจัดซื้อจัดจ้าง พ.ศ. 2561
                                    </p>
                                </div>
                                <div className="memo-paragraph">
                                    <p className="leading-8">
                                        หากปรากฏว่าเกิดความขัดแย้งทางผลประโยชน์ระหว่างข้าพเจ้ากับผู้ขาย ผู้รับจ้าง ผู้เสนองานหรือผู้ชนะการประมูล หรือผู้มีส่วนเกี่ยวข้องที่เข้ามามีนิติสัมพันธ์ ข้าพเจ้าจะรายงานให้ทราบโดยทันที
                                    </p>
                                </div>

                                {/* ###################### signature ###################### */}
                                <div className="flex mt-[20px]">
                                    <div  className="w-1/2 flex justify-center">
                                        <div className="mt-[35px] text-center w-[60%]">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-[200px] border-dashed border-b"></p>
                                                <div className="signature">
                                                    <p>(หัวหน้าเจ้าหน้าที่)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div  className="w-1/2 flex justify-center">
                                        <div className="mt-[35px] text-center w-[60%]">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-[200px] border-dashed border-b"></p>
                                                <div className="signature">
                                                    <p>(หัวหน้าเจ้าหน้าที่)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex mt-[20px]">
                                    <div className="w-1/2 flex justify-center">
                                        <div className="mt-[35px] text-center w-full">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-[200px] border-dashed border-b"></p>
                                                <div className="signature">
                                                    <p>({requisition?.requester?.prefix?.name+requisition?.requester?.firstname+ ' ' +requisition?.requester?.lastname})</p>
                                                    <p>{requisition?.requester?.position?.name}{requisition?.requester?.level?.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="w-1/2 flex justify-center">
                                        <div className="mt-[35px] text-center w-full">
                                            <div className="mb-5">
                                                <i className="far fa-square"></i> ทราบ
                                            </div>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-[200px] border-dashed border-b"></p>
                                                <div className="signature">
                                                    <p>( นายนิตย์  ทองเพชรศรี )</p>
                                                    <p>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p>
                                                    <p>ปฏิบัติราชการแทนอธิบดีกรมสุขภาพจิต</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="mt-5">
                                    หมายเหตุ  หากเพิ่มเติมคณะกรรมการสามารถดำเนินการภายใต้แบบแสดงความบริสุทธิ์ใจ ฯ นี้ได้โดยอนุโลม
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* END PAGE 3 */}
        </>
    )
}

export default Requisition