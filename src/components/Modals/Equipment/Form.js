import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup' 
import { Col, Modal, Row } from 'react-bootstrap'
import { getFormDataItem } from '../../../utils'
import { useGetInitialFormDataQuery } from '../../../features/services/comset/comsetApi'

const equipmentSchema = Yup.object().shape({
    equipment_type_id: Yup.string().required(),
    brand_id: Yup.string().required(),
});

const ModalEquipmentForm = ({ isShow, onHide, onSubmit }) => {
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const handleSubmit = (values, formik) => {
        onSubmit(values);
    };

    return (
        <Modal
            show={isShow}
            onHide={onHide}
            size='lg'
        >
            <Modal.Header>
                <Modal.Title>เพิ่มอุปกรณ์</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        equipment_type_id: '',
                        brand_id: '',
                        model: '',
                        capacity: '',
                        description: '',
                        price: '',
                        equipmentType: null,
                        brand: null
                    }}
                    validationSchema={equipmentSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <Row>
                                    <Col md={12} className="mb-2">
                                        <div className="flex flex-row items-center">
                                            <label className="w-[25%]">ประเภทอุปกรณ์</label>
                                            <select
                                                name="equipment_type_id"
                                                value={formik.values.equipment_type_id}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('equipmentType', getFormDataItem(formData, 'types', parseInt(e.target.value, 10)));
                                                }}
                                                className="form-control text-sm"
                                            >
                                                <option value="">-- เลือกประเภทอุปกรณ์ --</option>
                                                {(formData && formData.types) && formData.types.map(type => (
                                                    <option value={type.id} key={type.id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {(formik.errors.equipment_type_id && formik.touched.equipment_type_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.equipment_type_id}</span>
                                        )}
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div className="flex flex-row items-center">
                                            <label className="w-[25%]">ยี่ห้อ</label>
                                            <select
                                                name="brand_id"
                                                value={formik.values.brand_id}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('brand', getFormDataItem(formData, 'brands', parseInt(e.target.value, 10)));
                                                }}
                                                className="form-control text-sm"
                                            >
                                                <option value="">-- เลือกยี่ห้อ --</option>
                                                {(formData && formData.brands) && formData.brands.map(brand => (
                                                    <option value={brand.id} key={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {(formik.errors.brand_id && formik.touched.brand_id) && (
                                            <span className="text-red-500 text-sm">{formik.errors.brand_id}</span>
                                        )}
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div className="flex flex-row items-center">
                                            <label className="w-[25%]">รุ่น</label>
                                            <input
                                                type="text"
                                                name="model"
                                                value={formik.values.model}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div className="flex flex-row items-center">
                                            <label className="w-[25%]">ขนาด/ความจุ</label>
                                            <input
                                                type="text"
                                                name="capacity"
                                                value={formik.values.capacity}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div className="flex flex-row items-start">
                                            <label className="w-[25%]">รายละเอียด</label>
                                            <textarea
                                                name="description"
                                                rows="4"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            ></textarea>
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <div className="flex flex-row items-start">
                                            <label className="w-[20%]"></label>
                                            <button type="submit" className="btn btn-outline-primary text-sm">
                                                บันทึก
                                            </button>
                                        </div>
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

export default ModalEquipmentForm