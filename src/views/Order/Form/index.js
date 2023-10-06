import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
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
import ModalRequisitionList from '../../../components/Modals/Requisition';
import ModalSupplierList from '../../../components/Modals/Supplier';
import OrderItems from './OrderItems';

const orderSchema = Yup.object().shape({
    pr_id: Yup.string().required(),
    po_no: Yup.string().required(),
    po_date: Yup.string().required(),
    supplier_id: Yup.string().required(),
    total: Yup.string().required(),
    vat_rate: Yup.string().required(),
    vat: Yup.string().required(),
    net_total: Yup.string().required(),
});

const OrderForm = () => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [showRequisitionModal, setShowRequisitionModal] = useState(false);
    const [selectedRequisition, setSelectedRequisition] = useState(null);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const handleSubmit = (values, formik) => {
        console.log(values);
    };

    const handleSelectRequisition = (formik, requisition) => {
        setSelectedRequisition(requisition);
        formik.setFieldValue('pr_id', requisition.pr_id);
        formik.setFieldValue('items', requisition.details);
        formik.setFieldValue('item_count', requisition.details.length);

        /** คำนวณยอดสุทธิ */
        let netTotal = calculateNetTotal(requisition.details);
        formik.setFieldValue('net_total', currency.format(netTotal));
        
        /** คำนวณฐานภาษีและภาษีมูลค่าเพิ่ม */
        calcTotal(formik, netTotal, parseInt(formik.values.vat_rate, 10));
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

    return (
        <Formik
            initialValues={{
                po_no: '',
                po_date: '',
                pr_id: '',
                supplier_id: '',
                item_count: '',
                total: '',
                vat_rate: '7',
                vat: '',
                net_total: '',
                items: []
            }}
            validationSchema={orderSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
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
                                <input
                                    type="hidden"
                                    name="pr_id"
                                    value={formik.values.pr_id}
                                    onChange={formik.handleChange}
                                />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowRequisitionModal(true)}>
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.pr_id && formik.touched.pr_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.pr_id}</span>
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
                                <label htmlFor="">วันที่เอกสาร</label>
                                <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedDate}
                                        onChange={(date) => {
                                            setSelectedDate(date);
                                            formik.setFieldValue('po_date', date.format('YYYY-MM-DD'));
                                        }}
                                        variant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                                {/* <input
                                    type="text"
                                    name="pr_date"
                                    value={formik.values.pr_date}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                /> */}

                            </div>
                            {(formik.errors.pr_date && formik.touched.pr_date) && (
                                <span className="text-red-500 text-sm">{formik.errors.pr_date}</span>
                            )}
                        </Col>
                    </Row>
                    {selectedRequisition && <Row className="mb-2">
                        <Col>
                            <div className="border rounded-sm text-sm font-thin px-3 py-2 bg-gray-100">
                                <h4 className="font-bold underline mb-1">รายละเอียดคำขอซื้อ</h4>
                                <p>
                                    {selectedRequisition.requester?.prefix?.name}{selectedRequisition.requester?.firstname} {selectedRequisition.requester?.lastname}
                                    {' ' + selectedRequisition.topic} จำนวน {currency.format(selectedRequisition.item_count)} รายการ 
                                    รวมเป็นเงิน {currency.format(selectedRequisition.net_total)} บาท
                                </p>
                                <p className="text-xs text-blue-600">ตาม{selectedRequisition.budget?.project?.plan?.name} {selectedRequisition.budget?.project?.name} {selectedRequisition.budget?.name}</p>
                            </div>
                        </Col>
                    </Row>}
                    <Row className="mb-3">
                        <Col>
                            <label htmlFor="">ผู้จัดจำหน่าย</label>
                            <div className="input-group">
                                <div className="min-h-[34px] form-control font-thin text-sm bg-gray-100">
                                    {selectedSupplier && selectedSupplier.tax_no+ ' ' +selectedSupplier.name}
                                </div>
                                <input
                                    type="hidden"
                                    name="supplier_id"
                                    value={formik.values.supplier_id}
                                    onChange={formik.handleChange}
                                />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSupplierModal(true)}>
                                    <FaSearch />
                                </button>
                            </div>
                            {(formik.errors.supplier_id && formik.touched.supplier_id) && (
                                <span className="text-red-500 text-sm">{formik.errors.supplier_id}</span>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2 text-sm">
                        <Col>
                            <h3 className="mb-2">รายการสินค้า</h3>

                            <OrderItems items={formik.values.items} />

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
            )}}
        </Formik>
    )
}

export default OrderForm
