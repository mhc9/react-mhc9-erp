import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
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
import { store } from '../../../features/inspection/inspectionSlice';
import ModalOrderList from '../../../components/Modals/Order';
import OrderItems from './OrderItems';

const orderSchema = Yup.object().shape({
    deliver_no: Yup.string().required(),
    deliver_date: Yup.string().required(),
    inspect_date: Yup.string().required(),
    report_no: Yup.string().required(),
    report_date: Yup.string().required(),
    order_id: Yup.string().required(),
    total: Yup.string().required(),
    vat_rate: Yup.string().required(),
    vat: Yup.string().required(),
    net_total: Yup.string().required(),
});

const InspectionForm = () => {
    const dispatch = useDispatch();
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedDeliverDate, setSelectedDeliverDate] = useState(moment());
    const [selectedInspectDate, setSelectedInspectDate] = useState(moment());
    const [selectedReportDate, setSelectedReportDate] = useState(moment());

    const handleSubmit = (values, formik) => {
        dispatch(store(values));
    };

    const handleSelectOrder = (formik, order) => {
        setSelectedOrder(order);
        formik.setFieldValue('order_id', order.id);
        formik.setFieldValue('items', order.details);
        formik.setFieldValue('item_count', order.details.length);
        formik.setFieldValue('item_received', order.details.length);

        formik.setFieldTouched('order_id', true);

        /** คำนวณยอดสุทธิ */
        let netTotal = calculateNetTotal(order.details);
        formik.setFieldValue('net_total', currency.format(netTotal));
        
        /** คำนวณฐานภาษีและภาษีมูลค่าเพิ่ม */
        calcTotal(formik, netTotal, parseInt(formik.values.vat_rate, 10));
    };

    const calcTotal = (formik, netTotal, vatRate) => {
        let _netTotal = currencyToNumber(netTotal);
        let vat = calculateVat(_netTotal, parseInt(vatRate, 10));

        formik.setFieldValue('vat', currency.format(vat));
        formik.setFieldValue('total', currency.format(_netTotal - vat));
    };

    const handleReceive = (formik, id, received) => {
        /** Get received item from items property of formik */
        const receivedItem = formik.values.items.find(item => item.id === id);

        /** Create newItems by replacing item that have same id with receivedItem */
        const newItem = formik.values.items.map(item => {
            if (item.id === id) {
                return {
                    ...receivedItem,
                    is_received: received ? 1 : 0,
                }
            }
            
            return item;
        });

        /** Update items and item_received properties of formik */
        formik.setFieldValue('items', newItem);
        formik.setFieldValue('item_received', countReceivedItem(newItem));
    };

    const countReceivedItem = (items = []) => {
        return items.reduce((sum, item) => sum = item.is_received === 1 ? sum + 1 : sum + 0, 0);
    };

    return (
        <Formik
            initialValues={{
                inspect_date: '',
                report_no: '',
                report_date: '',
                deliver_no: '',
                deliver_date: '',
                order_id: '',
                year: '2566',
                item_count: '',
                item_received: '',
                total: '',
                vat_rate: '7',
                vat: '',
                net_total: '',
                status: '1',
                items: []
            }}
            validationSchema={orderSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <Form>
                    <ModalOrderList
                        isShow={showOrderModal}
                        onHide={() => setShowOrderModal(false)}
                        onSelect={(order) => handleSelectOrder(formik, order)}
                    />

                    <Row className="mb-2">
                        <Col md={4}>
                            <label htmlFor="">ใบสั่งซื้อ/จ้าง</label>
                            <div className="input-group">
                                <div className="min-h-[34px] form-control font-thin text-sm bg-gray-100">
                                    {selectedOrder &&  <p>เลขที่ {selectedOrder.po_no} วันที่ {toShortTHDate(selectedOrder.po_date)}</p>}
                                </div>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowOrderModal(true)}>
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.order_id && formik.touched.order_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.order_id}</span>
                            )}
                        </Col>
                        <Col md={2}>
                            <label htmlFor="">ปีงบ</label>
                            <select
                                name="year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                className="form-control text-sm"
                            >
                                <option value="2566">2566</option>
                                <option value="2567">2567</option>
                                <option value="2568">2568</option>
                                <option value="2569">2569</option>
                                <option value="2570">2570</option>
                            </select>
                            {(formik.errors.order_id && formik.touched.order_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.order_id}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <label htmlFor="">เลขที่ใบส่งสินค้า</label>
                            <input
                                type="text"
                                name="deliver_no"
                                value={formik.values.deliver_no}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                            {(formik.errors.deliver_no && formik.touched.deliver_no) && (
                                <span className="text-red-500 text-sm">{formik.errors.deliver_no}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <div className="flex flex-col">
                                <label htmlFor="">วันที่ส่งสินค้า</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedDeliverDate}
                                        onChange={(date) => {
                                            setSelectedDeliverDate(date);
                                            formik.setFieldValue('deliver_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            {(formik.errors.deliver_date && formik.touched.deliver_date) && (
                                <span className="text-red-500 text-sm">{formik.errors.deliver_date}</span>
                            )}
                        </Col>
                    </Row>
                    {selectedOrder && (
                        <Row className="mb-2">
                            <Col md={8}>
                                <div className="min-h-[148px] border rounded-sm text-sm font-thin px-3 py-2 bg-gray-100">
                                    <h4 className="font-bold underline mb-1">รายละเอียดคำขอซื้อ</h4>
                                    <p>
                                        {selectedOrder.requisition.requester?.prefix?.name}{selectedOrder.requisition.requester?.firstname} {selectedOrder.requisition.requester?.lastname}
                                        {' ' + selectedOrder.requisition.topic} จำนวน {currency.format(selectedOrder.item_count)} รายการ 
                                        รวมเป็นเงิน {currency.format(selectedOrder.net_total)} บาท
                                    </p>
                                    <p className="text-sm text-blue-600">
                                        ตาม{selectedOrder.requisition.budget?.project?.plan?.name}<br />
                                        {selectedOrder.requisition.budget?.project?.name}<br />
                                        {selectedOrder.requisition.budget?.name}
                                    </p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="min-h-[148px] border rounded-sm text-sm font-thin px-3 py-2 bg-gray-100">
                                    <h4 className="font-bold underline mb-1">ผู้จัดจำหน่าย</h4>
                                    {selectedOrder && (
                                        <div className="font-thin text-sm bg-gray-100">
                                            <b className="text-lg">{selectedOrder.supplier?.name}</b>
                                            <p><b className="mr-1">เลขประจำตัวผู้เสียภาษี</b>{selectedOrder.supplier?.tax_no}</p>
                                            <p>
                                                <b className="mr-1">ที่อยู่</b>{selectedOrder.supplier?.address} 
                                                <span className="mx-1">หมู่</span>{selectedOrder.supplier?.moo ? selectedOrder.supplier?.moo : '-'}
                                                <span className="mx-1">ถนน</span>{selectedOrder.supplier?.raod ? selectedOrder.supplier?.raod : '-'}
                                            </p>
                                            <p>
                                                <span className="mr-1">ต.</span>{selectedOrder.supplier?.tambon?.name}
                                                <span className="mx-1">อ.</span>{selectedOrder.supplier?.amphur?.name}
                                                <span className="mx-1">จ.</span>{selectedOrder.supplier?.changwat?.name}
                                                <span className="ml-1">{selectedOrder.supplier?.zipcode}</span>
                                            </p>
                                            <p>
                                                <b className="mr-1">โทร.</b>{selectedOrder.supplier?.tel}
                                                <b className="mx-1">Fax.</b>{selectedOrder.supplier?.fax}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    )}
                    <Row className="mb-3">
                        <Col md={3}>
                            <div className="flex flex-col">
                                <label htmlFor="">วันที่ตรวจรับ</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedInspectDate}
                                        onChange={(date) => {
                                            setSelectedInspectDate(date);
                                            formik.setFieldValue('inspect_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                        />
                                </MuiPickersUtilsProvider>
                            </div>
                            {(formik.errors.inspect_date && formik.touched.inspect_date) && (
                                <span className="text-red-500 text-sm">{formik.errors.inspect_date}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <label htmlFor="">ครบกำหนดวันที่</label>
                            <div className="form-control text-sm text-center min-h-[34px] bg-gray-100">
                                {toShortTHDate(selectedOrder?.deliver_date)}
                            </div>
                        </Col>
                        <Col md={3}>
                            <label htmlFor="">เลขที่รายงานผล</label>
                            <input
                                type="text"
                                name="report_no"
                                value={formik.values.report_no}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                            {(formik.errors.report_no && formik.touched.report_no) && (
                                <span className="text-red-500 text-sm">{formik.errors.report_no}</span>
                            )}
                        </Col>
                        <Col md={3}>
                            <div className="flex flex-col">
                                <label htmlFor="">วันที่รายงานผล</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedReportDate}
                                        onChange={(date) => {
                                            setSelectedReportDate(date);
                                            formik.setFieldValue('report_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            {(formik.errors.report_date && formik.touched.report_date) && (
                                <span className="text-red-500 text-sm">{formik.errors.report_date}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2 text-sm">
                        <Col>
                            <div className="flex flex-col border p-2 rounded-md">
                                
                                <h3 className="mb-2">รายการสินค้า</h3>

                                <OrderItems
                                    items={formik.values.items}
                                    onReceiveItem={(id, received) => handleReceive(formik, id, received)}
                                />

                                <div className="flex items-center justify-end p-0 mt-1">
                                    <span className="mr-2">รวมเป็นเงิน</span>
                                    <input
                                        type="text"
                                        name="total"
                                        value={formik.values.total}
                                        onChange={formik.handleChange}
                                        className="form-control font-thin text-sm w-[12%] text-right"
                                    />
                                    <div className="w-[11%]"></div>
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
                                    <div className="w-[11%]"></div>
                                </div>
                                <div className="flex items-center justify-end p-0 mt-1">
                                    <span className="mr-2">ยอดสิทธิ</span>
                                    <input
                                        type="text"
                                        name="net_total"
                                        value={formik.values.net_total}
                                        onChange={formik.handleChange}
                                        className="form-control font-thin text-sm w-[12%] text-right"
                                    />
                                    <div className="w-[11%]"></div>
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

export default InspectionForm
