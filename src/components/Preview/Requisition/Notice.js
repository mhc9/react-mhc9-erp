import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRequisition } from '../../../features/slices/requisition/requisitionSlice'
import { toLongTHDate, toLongTHDateWithBE, currency } from '../../../utils'
import { ThaiNumberToText } from '../../../utils/currencyText'
import '../Preview.css'

const RequisitionNotice = () => {
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
                    <div className="memo-notice">
                        <div className="memo-logo-notice">
                            <img src={`${process.env.REACT_APP_API_URL}/img/krut.jpg`} />
                        </div>
                    </div>

                    {requisition && (
                        <div className="memo-box">
                            <div className="flex flex-col justify-center items-center">
                                <h3>ประกาศ ศูนย์สุขภาพจิตที่ ๙ กรมสุขภาพจิต</h3>
                                <div className="flex justify-center items-center">
                                    <span className="m-0">เรื่อง</span>
                                    <span className="ml-2">
                                        ประกาศผู้ชนะการเสนอราคา {((requisition.order_type_id == 1) ? 'ซื้อ' + requisition.category?.name : requisition.contract_desc)}&nbsp;
                                        จำนวน {requisition.item_count} รายการ โดย{requisition.approvals[0]?.procuring?.name}
                                    </span>
                                </div>
                                <div className="flex my-2"><hr className="w-[180px]" /></div>
                            </div>
                            <div className="memo-content">
                                <div className="memo-paragraph">
                                    ตามที่ ศูนย์สุขภาพจิตที่ ๙ กรมสุขภาพจิต ได้มีโครงการ{((requisition.order_type_id == 1) ? 'ซื้อ' + requisition.category?.name : requisition.contract_desc)}&nbsp;
                                    จำนวน {requisition.item_count} รายการ โดย{requisition.approvals[0]?.procuring?.name} นั้น
                                </div>
                                <div className="memo-paragraph mt-[2.5cm]">
                                    {((requisition.order_type_id == 1) ? 'ซื้อ' + requisition.category?.name : requisition.contract_desc)}&nbsp;
                                    จำนวน {requisition.item_count} รายการ&nbsp;
                                    ผู้ได้รับการคัดเลือก ได้แก่ {requisition.approvals[0]?.supplier?.name}&nbsp;
                                    โดยเสนอราคา เป็นเงินทั้งสิ้น  {currency.format(requisition.net_total)} บาท ({ThaiNumberToText(requisition.net_total)})
                                </div>
                                <div className="memo-paragraph mt-2">
                                    <p className="indent-[4cm]">
                                        ประกาศ ณ วันที่ <span className="ml-2">{toLongTHDateWithBE(requisition.approvals[0]?.notice_date)}</span>
                                    </p>
                                </div>

                                <div className="memo-approvement">
                                    <div className="memo-row">
                                        <div className="w-[40%]"></div>
                                        <div>
                                            <div style={{ textAlign: 'center', width: '100%', height: '120px' }}>
                                                <div className="pt-[60px] flex flex-col items-center justify-center">
                                                    <div className="signature">
                                                        <p>( นายนิตย์  ทองเพชรศรี )</p>
                                                        <p>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p>
                                                        <p>ปฏิบัติราชการแทนอธิบดีกรมสุขภาพจิต</p>
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
        </>
    )
}

export default RequisitionNotice