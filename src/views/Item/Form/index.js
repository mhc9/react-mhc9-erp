import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useGetInitialFormDataQuery } from '../../../services/item/itemApi'

const itemSchema = Yup.object().shape({

});

const ItemForm = () => {
    const { data: formData } = useGetInitialFormDataQuery();

    const handleSubmit = () => {

    };

    return (
        <Formik
            initialValues={{

            }}
            validationSchema={itemSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col md={8}>
                                <FormGroup>
                                    <lable>ชื่อสินค้า/บริการ</lable>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <lable>ประเทภสินค้า/บริการ</lable>
                                    <select
                                        className="form-control"
                                    >
                                        <option value="">-- ประเทภสินค้า/บริการ --</option>
                                        {formData && formData.categories.map(category => (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <lable>ราคาทุน</lable>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <lable>ราคาขาย</lable>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <lable>หน่วยนับ</lable>
                                    <select
                                        className="form-control"
                                    >
                                        <option value="">-- หน่วยนับ --</option>
                                        {formData && formData.units.map(unit => (
                                            <option value={unit.id} key={unit.id}>
                                                {unit.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <lable>รายละเอียด</lable>
                                    <textarea
                                        rows={3}
                                        className="form-control"
                                    ></textarea>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <lable>รูปภาพ</lable>
                                    <input type="file" className="ml-2" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary float-right"
                                    >
                                        บันทึก
                                    </button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ItemForm
