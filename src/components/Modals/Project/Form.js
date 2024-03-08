import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { Col, FormGroup, Modal, Row } from 'react-bootstrap'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'
import Autocomplete from '../../../components/FormControls/Autocomplete'

const ModalProjectForm = ({ isShow, onHide, onSubmit }) => {
    const [selectedFromDate, setSelectedFromDate] = useState(moment());
    const [selectedToDate, setSelectedToDate] = useState(moment());

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>เพิ่มโครงการ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik>
                    {(formik) => {
                        return (
                            <Form className="p-3">
                                <Row className="mb-2">
                                    <Col md={3}>
                                        <label htmlFor="">ประเภทโครงการ</label>
                                        <select name="" className="form-control text-sm">
                                            <option value="">-- ประเภทโครงการ --</option>
                                            <option value="1">โครงการ</option>
                                        </select>
                                    </Col>
                                    <Col>
                                        <label htmlFor="">เจ้าของโครงการ</label>
                                        <Autocomplete
                                            inputName="owner_id"
                                            items={[]}
                                            onSelect={(employee) => {
                                                formik.setFieldTouched('owner_id', true);

                                                if (employee) {
                                                    formik.setFieldValue('owner_id', employee.id);
                                                } else {
                                                    formik.setFieldValue('owner_id', '');
                                                }
                                            }} 
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">ชื่อโครงการ</label>
                                        <select name="" className="form-control text-sm">
                                            <option value="">-- ประเภทโครงการ --</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        <label htmlFor="">สถานที่</label>
                                        <select name="" className="form-control text-sm">
                                            <option value="">-- ประเภทโครงการ --</option>
                                        </select>
                                    </Col>
                                    {/* <Col>
                                        <FormGroup>
                                            <label>ที่อยู่ เลขที่</label>
                                            <input
                                                type="text"
                                                name="address_no"
                                                value={formik.values.address_no}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm text-sm"
                                            />
                                            {(formik.errors.address_no && formik.touched.address_no) && (
                                                <span className="text-red-500 text-sm">{formik.errors.address_no}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label>หมู่ที่</label>
                                            <input
                                                type="text"
                                                name="moo"
                                                value={formik.values.moo}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm text-sm"
                                            />
                                            {(formik.errors.moo && formik.touched.moo) && (
                                                <span className="text-red-500 text-sm">{formik.errors.moo}</span>
                                            )}
                                        </FormGroup>
                                    </Col> */}
                                </Row>
                                {/* <Row className="mb-2">
                                    <Col>
                                        <FormGroup>
                                            <label>ถนน</label>
                                            <input
                                                type="text"
                                                name="road"
                                                value={formik.values.road}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm text-sm"
                                            />
                                            {(formik.errors.road && formik.touched.road) && (
                                                <span className="text-red-500 text-sm">{formik.errors.road}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label>รหัสไปรษณีย์</label>
                                            <input
                                                type="text"
                                                name="zipcode"
                                                value={formik.values.zipcode}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm text-sm"
                                            />
                                            {(formik.errors.zipcode && formik.touched.zipcode) && (
                                                <span className="text-red-500 text-sm">{formik.errors.zipcode}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row> */}
                                <Row className="mb-3">
                                    <Col>
                                        <div className="flex flex-col">
                                            <label htmlFor="">จากวันที่</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedFromDate}
                                                onChange={(date) => {
                                                    setSelectedFromDate(date);
                                                    // formik.setFieldValue('doc_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="flex flex-col">
                                            <label htmlFor="">ถึงวันที่</label>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedToDate}
                                                onChange={(date) => {
                                                    setSelectedToDate(date);
                                                    // formik.setFieldValue('doc_date', date.format('YYYY-MM-DD'));
                                                }}
                                                variant="outlined"
                                            />
                                        </div>
                                    </Col>
                                    {/* <Col>
                                        <FormGroup>
                                            <label>จังหวัด</label>
                                            <select
                                                name="changwat_id"
                                                value={formik.values.changwat_id}
                                                onChange={(e) => {
                                                    setFilteredAmphurs(filterAmphursByChangwat(e.target.value, formData.amphurs));
                                                    formik.setFieldValue('changwat_id', e.target.value)
                                                }}
                                                className="form-control text-sm text-sm"
                                            >
                                                <option value=""></option>
                                                {formData && formData.changewats.map(changewat => (
                                                    <option value={changewat.id} key={changewat.id}>
                                                        {changewat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {(formik.errors.changwat_id && formik.touched.changwat_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.changwat_id}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label>อำเภอ</label>
                                            <select
                                                name="amphur_id"
                                                value={formik.values.amphur_id}
                                                onChange={(e) => {
                                                    setFilteredTambons(filterTambonsByAmphur(e.target.value, formData.tambons));
                                                    formik.setFieldValue('amphur_id', e.target.value)
                                                }}
                                                className="form-control text-sm text-sm"
                                            >
                                                <option value=""></option>
                                                {filteredAmphurs.map(amphur => (
                                                    <option value={amphur.id} key={amphur.id}>
                                                        {amphur.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {(formik.errors.amphur_id && formik.touched.amphur_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.amphur_id}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label>ตำบล</label>
                                            <select
                                                name="tambon_id"
                                                value={formik.values.tambon_id}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm text-sm"
                                            >
                                                {filteredTambons.map(tambon => (
                                                    <option value={tambon.id} key={tambon.id}>
                                                        {tambon.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {(formik.errors.tambon_id && formik.touched.tambon_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.tambon_id}</span>
                                            )}
                                        </FormGroup>
                                    </Col> */}
                                </Row>
                                <Row>
                                    <Col>
                                        <button type="submit" className="btn btn-outline-primary float-right">
                                            บันทึก
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default ModalProjectForm