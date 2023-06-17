import React from 'react'
import { Col, FormGroup, Modal, Row, Form as BsForm } from 'react-bootstrap'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Autocomplete from '../../../components/FormControls/Autocomplete';

const ownershipSchema = Yup.object().shape({
    owned_at: Yup.string().required(),
    owned_id: Yup.string().required(),
});

const items = [
    { id: 1, name: 'test1' },
    { id: 2, name: 'test2' },
    { id: 3, name: 'test3' },
    { id: 4, name: 'test4' },
    { id: 5, name: 'test5' },
];

const OwnershipForm = ({ isOpen, handleHide }) => {
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
                        asset_id: '',
                        owned_at: '',
                        owner_id: '',
                        condition: '',
                        remark: '',
                    }}
                    validationSchema={ownershipSchema}
                    onSubmit={() => console.log()}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <Row className="mb-2">
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>วันที่รับ</label>
                                            <BsForm.Control
                                                type="date"
                                                name="owned_at"
                                                className="form-control"
                                            />
                                            {(formik.errors.owned_at && formik.touched.owned_at) && (
                                                <span className="text-red-500 text-sm">{formik.errors.owned_at}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label>ผู้รับผิดชอบ</label>
                                            {/* <div className="input-group has-validation">
                                                <div type="text" name="owner" className="form-control">
                                                    
                                                </div>
                                                <input
                                                    type="hidden"
                                                    name="owner_id"
                                                    value={formik.values.owner_id}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                                <button type="button" className="btn btn-outline-secondary" onClick={() => console.log()}>
                                                    ค้นหา
                                                </button>
                                            </div> */}
                                            <Autocomplete
                                                inputName="owned_id"
                                                items={items}
                                                onSelect={(item) => {
                                                    console.log(item);
                                                    formik.setFieldValue(item.id);
                                                }} 
                                            />
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