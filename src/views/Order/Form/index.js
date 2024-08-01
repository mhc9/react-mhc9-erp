import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import {
    currency,
    currencyToNumber,
    calculateNetTotal,
    calculateVat,
    toShortTHDate
} from '../../../utils';
import OverWriteMomentBE from '../../../utils/OverwriteMomentBE'
import { store } from '../../../features/slices/order/orderSlice';
import OrderItems from './OrderItems';
import ModalRequisitionList from '../../../components/Modals/Requisition';
import ModalSupplierList from '../../../components/Modals/Supplier';

const orderSchema = Yup.object().shape({
    po_no: Yup.string().required('กรุณาระุบเลขที่ใบสั่งซื้อ'),
    po_date: Yup.string().required('กรุณาเลือกวันที่ใบสั่งซื้อ'),
    requisition_id: Yup.string().required('กรุณาเลือกรายการคำขอ'),
    year: Yup.string().required('กรุณาเลือกปีงบประมาณ'),
    total: Yup.string().required('กรุณาระบุยอดรวมเป็นเงิน'),
    vat_rate: Yup.string().required('กรุณาระุบอัตราภาษีฯ'),
    vat: Yup.string().required('กรุณาระุบยอดภาษีฯ'),
    net_total: Yup.string().required('กรุณาระุบยอดยอดสุทธิ'),
    items: Yup.mixed().test('Items Count', 'ไม่พบการรายการสินค้า/บริการ', val => val.filter(item => !item.removed).length > 0),
});

const OrderForm = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedYear, setSelectedYear] = useState(moment());
    const [showRequisitionModal, setShowRequisitionModal] = useState(false);
    const [selectedRequisition, setSelectedRequisition] = useState(null);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const handleSubmit = (values, formik) => {
        dispatch(store(values));
    };

    const handleSelectRequisition = (formik, requisition) => {
        setSelectedRequisition(requisition);
        formik.setFieldValue('requisition_id', requisition.id);
        formik.setFieldValue('items', requisition.details);
        formik.setFieldValue('item_count', requisition.details.length);

        setTimeout(() => formik.setFieldTouched('requisition_id', true), 600);

        /** คำนวณยอดสุทธิ */
        let netTotal = calculateNetTotal(requisition.details);
        formik.setFieldValue('net_total', currency.format(netTotal));
        
        /** คำนวณฐานภาษีและภาษีมูลค่าเพิ่ม */
        calcTotal(formik, netTotal, parseInt(formik.values.vat_rate, 10));
        
        /** เซต supplier_id และ selectedSupplier local state จากข้อมูล requisition */
        setSelectedSupplier(requisition.approvals[0].supplier);
        formik.setFieldValue('supplier_id', requisition.approvals[0].supplier_id);
    };

    const handleSelectSupplier = (formik, supplier) => {
        setSelectedSupplier(supplier);
        formik.setFieldValue('supplier_id', supplier.id);
    };

    const calcTotal = (formik, netTotal, vatRate) => {
        let _netTotal = currencyToNumber(netTotal);
        let vat = calculateVat(_netTotal, parseInt(vatRate, 10));

        formik.setFieldValue('vat', currency.format(vat));
        formik.setFieldValue('total', currency.format(_netTotal - vat));
    };

    const calcDeliverDate = (formik, fromDate, days) => {
        let deliverDate = moment(fromDate).add(days, "days").format('YYYY-MM-DD');

        formik.setFieldValue('deliver_date', toShortTHDate(deliverDate));
    };

    return (
        <Formik
            initialValues={{
                po_no: '',
                po_date: '',
                requisition_id: '',
                supplier_id: '',
                item_count: '',
                total: '',
                vat_rate: '7',
                vat: '',
                net_total: '',
                deliver_days: '30',
                deliver_date: '',
                year: '',
                items: []
            }}
            validationSchema={orderSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <Form>
                    <ModalRequisitionList
                        isShow={showRequisitionModal}
                        onHide={() => setShowRequisitionModal(false)}
                        onSelect={(requisition) => handleSelectRequisition(formik, requisition)}
                    />

                    <ModalSupplierList
                        isShow={showSupplierModal}
                        onHide={() => setShowSupplierModal(false)}
                        onSelect={(supplier) => handleSelectSupplier(formik, supplier)}
                    />

                    <Row className="mb-2">
                        <Col md={6}>
                            <label htmlFor="">เลขที่คำขอ</label>
                            <div className="input-group">
                                <div className="min-h-[34px] form-control font-thin text-sm bg-gray-100">
                                    {selectedRequisition &&  <p>เลขที่ {selectedRequisition.pr_no} วันที่ {toShortTHDate(selectedRequisition.pr_date)}</p>}
                                </div>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowRequisitionModal(true)}>
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.requisition_id && formik.touched.requisition_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.requisition_id}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <label htmlFor="">เลขที่ใบสั่งซื้อ</label>
                            <input
                                type="text"
                                name="po_no"
                                value={formik.values.po_no}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                            {(formik.errors.po_no && formik.touched.po_no) && (
                                <span className="text-red-500 text-sm">{formik.errors.po_no}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <div className="flex flex-col">
                                <label htmlFor="">วันที่ใบสั่งซื้อ</label>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    value={selectedDate}
                                    onChange={(date) => {
                                        setSelectedDate(date);
                                        formik.setFieldValue('po_date', date.format('YYYY-MM-DD'));
                                        setTimeout(() => formik.setFieldTouched('po_date', true), 600);

                                        calcDeliverDate(formik, date.format('YYYY-MM-DD'), formik.values.deliver_days);
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            {(formik.errors.po_date && formik.touched.po_date) && (
                                <span className="text-red-500 text-sm">{formik.errors.po_date}</span>
                            )}
                        </Col>
                    </Row>
                    {selectedRequisition && (
                        <Row className="mb-2">
                            <Col>
                                <Row>
                                    <Col md={8}>
                                        <div className="border rounded-md text-sm font-thin px-3 py-2 bg-orange-200 min-h-[160px]">
                                            <h4 className="font-bold underline mb-1">รายละเอียดคำขอซื้อ</h4>
                                            <p>
                                                <b>เรื่อง</b> {selectedRequisition.topic} จำนวน {currency.format(selectedRequisition.item_count)} รายการ
                                                <b className="ml-2">รวมเป็นเงิน</b> {currency.format(selectedRequisition.net_total)} บาท
                                            </p>
                                            <p>
                                                <b>ผู้ขอ</b> {selectedRequisition.requester?.prefix?.name}{selectedRequisition.requester?.firstname} {selectedRequisition.requester?.lastname}
                                                <b className="ml-2">ตำแหน่ง</b> {selectedRequisition.requester?.position?.name}{selectedRequisition.requester?.level && selectedRequisition.requester?.level?.name}
                                                <b className="ml-2">หน่วยงาน</b> {selectedRequisition.division?.name}
                                            </p>
                                            <p><b>เหตุผลที่ขอ</b> {selectedRequisition.reason}</p>
                                            <p className="text-sm text-blue-600">
                                                <b>ตาม</b> {selectedRequisition.budget?.project?.plan?.name} {selectedRequisition.budget?.project?.name}
                                                <span className="ml-2">{selectedRequisition.budget?.name}</span>
                                            </p>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="border rounded-md text-sm font-thin px-3 py-2 bg-green-300 min-h-[160px]">
                                            <h4 className="font-bold underline mb-1">ผู้จัดจำหน่าย</h4>
                                            {selectedSupplier && (
                                                <div className="mb-1">
                                                    {selectedSupplier.name}
                                                    <p><b>ผู้ประจำตัวผู้เสียภาษี</b> {selectedSupplier.tax_no}</p>
                                                    <p><b>โทร.</b> {selectedSupplier.tel}</p>
                                                    <p><b>ที่อยู่</b> -</p>
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )}
                    <Row className="mb-3">
                        <Col md={4}>
                            <div className="flex flex-col">
                                <label htmlFor="">ปีงบประมาณ</label>
                                <DatePicker
                                    format="YYYY"
                                    views={['year']}
                                    value={selectedYear}
                                    onChange={(date) => {
                                        setSelectedYear(date);
                                        formik.setFieldValue('year', date.year());
                                    }}
                                />
                            </div>
                            {(formik.errors.year && formik.touched.year) && (
                                <span className="text-red-500 text-sm">{formik.errors.year}</span>
                            )}
                        </Col>
                        <Col md={4}>
                            <label htmlFor="">กำหนดส่งมอบ</label>
                            <div className="flex justify-center items-center gap-2">
                                <input
                                    type="number"
                                    name="deliver_days"
                                    value={formik.values.deliver_days}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        calcDeliverDate(formik, formik.values.po_date, e.target.value);
                                    }}
                                    className="form-control text-sm text-center min-h-[34px]"
                                />
                                <span>วัน</span>
                            </div>
                        </Col>
                        <Col md={4}>
                            <label htmlFor="">ครบกำหนดวันที่</label>
                            <input
                                type="text"
                                name="deliver_date"
                                value={formik.values.deliver_date}
                                onChange={formik.handleChange}
                                className="form-control text-sm text-center min-h-[34px] bg-gray-100"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2 text-sm">
                        <Col>
                            <div className="flex flex-col border p-2 rounded-md">
                                
                                <h3 className="mb-2">รายการสินค้า/บริการ</h3>

                                <OrderItems items={formik.values.items} />

                                {(formik.errors.items && formik.touched.items) && (
                                    <span className="text-red-500 text-sm">{formik.errors.items}</span>
                                )}

                                <div className="flex items-center justify-end p-0 mt-1">
                                    <span className="mr-2 font-bold">รวมเป็นเงิน</span>
                                    <input
                                        type="text"
                                        name="total"
                                        value={formik.values.total}
                                        onChange={formik.handleChange}
                                        className="form-control font-bold text-sm w-[12%] text-right"
                                    />
                                    {/* <div className="w-[11%]"></div> */}
                                </div>
                                <div className="flex items-center justify-end p-0 mt-1">
                                    <span className="mr-2">ภาษีมูลค่าเพิ่ม</span>
                                    <select
                                        name="vat_rate"
                                        value={formik.values.vat_rate}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            calcTotal(formik, formik.values.net_total, e.target.value)
                                        }}
                                        className="form-control font-thin text-sm w-[8%] text-center mr-1"
                                    >
                                        <option value="1">1%</option>
                                        <option value="7">7%</option>
                                        <option value="10">10%</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="vat"
                                        value={formik.values.vat}
                                        onChange={formik.handleChange}
                                        className="form-control font-thin text-sm w-[12%] text-right"
                                    />
                                    {/* <div className="w-[11%]"></div> */}
                                </div>
                                <div className="flex items-center justify-end p-0 mt-1">
                                    <span className="mr-2 text-lg font-bold">ยอดสิทธิ</span>
                                    <input
                                        type="text"
                                        name="net_total"
                                        value={formik.values.net_total}
                                        onChange={formik.handleChange}
                                        className="form-control text-green-600 text-lg font-bold w-[12%] text-right"
                                    />
                                    {/* <div className="w-[11%]"></div> */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <button type="submit" className="btn btn-outline-primary text-sm">
                                บันทึก
                            </button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default OrderForm
