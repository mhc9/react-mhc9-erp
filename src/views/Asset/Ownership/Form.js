import React, { useEffect, useState } from 'react'
import { Col, FormGroup, Modal, Row, Form as BsForm } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Autocomplete from '../../../components/FormControls/Autocomplete';
import api from '../../../api'

const ownershipSchema = Yup.object().shape({
    owned_at: Yup.string().required(),
    owner_id: Yup.string().required(),
});

const OwnershipForm = ({ isOpen, handleHide, assetId }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();

        return () => getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            const res = await api.get('/api/employees');

            setEmployees(res.data.map(emp => ({ id: emp.id, name: `${emp.prefix.name}${emp.firstname} ${emp.lastname}`})));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={isOpen} onHide={handleHide} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>
                    เพิ่มผู้รับผิดชอบ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        asset_id: assetId,
                        owned_at: '',
                        owner_id: '',
                        condition: '',
                        remark: '',
                    }}
                    validationSchema={ownershipSchema}
                    onSubmit={(values, props) => console.log(values, props)}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <Row className="mb-2">
                                    <Col md={12}>
                                        <FormGroup>
                                            <label>ผู้รับผิดชอบ</label>
                                            <Autocomplete
                                                inputName="owner_id"
                                                items={employees}
                                                onSelect={(item) => {
                                                    formik.setFieldTouched('owner_id', true);

                                                    if (item) {
                                                        formik.setFieldValue('owner_id', item.id);
                                                    } else {
                                                        formik.setFieldValue('owner_id', '');
                                                    }
                                                }} 
                                            />
                                            {(formik.errors.owner_id && formik.touched.owner_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.owner_id}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>วันที่รับ</label>
                                            <BsForm.Control
                                                type="date"
                                                name="owned_at"
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                            {(formik.errors.owned_at && formik.touched.owned_at) && (
                                                <span className="text-red-500 text-sm">{formik.errors.owned_at}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>สภาพพัสดุ</label>
                                            <select
                                                name="condition"
                                                value={formik.values.condition}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            >
                                                <option value="">-- เลือกสภาพพัสดุ --</option>
                                                <option value="1">สมบูรณ์</option>
                                                <option value="2">เสียหายบางส่วน</option>
                                                <option value="3">เสียหายใช้งานไม่ได้</option>
                                            </select>
                                            {(formik.errors.owner_id && formik.touched.owner_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.owner_id}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col md={12}>
                                        <FormGroup>
                                            <label>หมายเหตุ</label>
                                            <textarea
                                                rows={3}
                                                name="remark"
                                                value={formik.values.remark}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            ></textarea>
                                            {(formik.errors.owner_id && formik.touched.owner_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.owner_id}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
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

export default OwnershipForm