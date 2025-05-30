import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import moment from 'moment'
import { useGetInitialFormDataQuery } from '../../features/services/place/placeApi'
import { store, update } from '../../features/slices/place/placeSlice'
import { filterAmphursByChangwat, filterTambonsByAmphur } from '../../utils'

const placeSchema = Yup.object().shape({
    name: Yup.string().required('กรุณาระบุชื่อสถานที่'),
    place_type_id: Yup.string().required('กรุณาเลือกประเภทสถานที่'),
    changwat_id: Yup.string().required('กรุณาเลือกจังหวัด')
});

const PlaceForm = ({ id, place }) => {
    const dispatch = useDispatch()
    const { data: formData, isLoading } = useGetInitialFormDataQuery();
    const [filteredAmphurs, setFilteredAmphurs] = useState([]);
    const [filteredTambons, setFilteredTambons] = useState([]);

    useEffect(() => {
        if (place) {
            formData && setFilteredAmphurs(filterAmphursByChangwat(place.changwat_id.toString(), formData.amphurs));
            formData && setFilteredTambons(filterTambonsByAmphur(place.amphur_id.toString(), formData.tambons));
        }
    }, [place]);

    const handleSubmit = (values, formik) => {
        if (place) {
            dispatch(update({ id, data: values }));
        } else {
            dispatch(store(values));
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: place ? place.name : '',
                place_type_id: place ? place.place_type_id : '',
                address_no: (place && place.address_no) ? place.address_no : '',
                road: (place && place.road) ? place.road : '',
                moo: (place && place.moo) ? place.moo : '',
                tambon_id: (place && place.tambon_id) ? place.tambon_id : '',
                amphur_id: (place && place.amphur_id) ? place.amphur_id : '',
                changwat_id: place ? place.changwat_id : '',
                zipcode: (place && place.zipcode) ? place.zipcode : '',
                latitude: (place && place.latitude) ? place.latitude : '',
                longitude: (place && place.longitude) ? place.longitude : '',
            }}
            validationSchema={placeSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form className="p-3">
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">สถานที่</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className={`form-control text-sm ${(formik.errors.name && formik.touched.name) && 'border-red-500'}`}
                                />
                                {(formik.errors.name && formik.touched.name) && (
                                    <span className="text-red-500 text-sm">{formik.errors.name}</span>
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <label htmlFor="">ประเภทสถานที่</label>
                                <select
                                    name="place_type_id"
                                    value={formik.values.place_type_id}
                                    onChange={formik.handleChange}
                                    className={`form-control text-sm ${(formik.errors.place_type_id && formik.touched.place_type_id) && 'border-red-500'}`}
                                >
                                    <option value="">-- ประเภทสถานที่ --</option>
                                    <option value="1">โรงแรม</option>
                                    <option value="2">โรงเรียน/มหาวิทยาลัย</option>
                                    <option value="3">หน่วยงานสาธารณสุข</option>
                                    <option value="4">หน่วยงานท้องถิ่น</option>
                                    <option value="5">หน่วยงานราชการอื่นๆ</option>
                                    <option value="6">บริษัท/เอกชน</option>
                                    <option value="99">อื่นๆ</option>
                                </select>
                                {(formik.errors.place_type_id && formik.touched.place_type_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.place_type_id}</span>
                                )}
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ที่อยู่เลขที่</label>
                                    <input
                                        type="text"
                                        name="address_no"
                                        value={formik.values.address_no}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.address_no && formik.touched.address_no) && (
                                        <span className="text-red-500 text-sm">{formik.errors.address_no}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={3}>
                                <FormGroup>
                                    <label>หมู่ที่</label>
                                    <input
                                        type="text"
                                        name="moo"
                                        value={formik.values.moo}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.moo && formik.touched.moo) && (
                                        <span className="text-red-500 text-sm">{formik.errors.moo}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ถนน</label>
                                    <input
                                        type="text"
                                        name="road"
                                        value={formik.values.road}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.road && formik.touched.road) && (
                                        <span className="text-red-500 text-sm">{formik.errors.road}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FormGroup>
                                    <label>จังหวัด</label>
                                    <select
                                        name="changwat_id"
                                        value={formik.values.changwat_id}
                                        onChange={(e) => {
                                            setFilteredAmphurs(filterAmphursByChangwat(e.target.value, formData.amphurs));
                                            formik.setFieldValue('changwat_id', e.target.value)
                                        }}
                                        className={`form-control text-sm ${(formik.errors.changwat_id && formik.touched.changwat_id) && 'border-red-500'}`}
                                    >
                                        <option value="">-- จังหวัด --</option>
                                        {formData && formData.changwats.map(changwat => (
                                            <option value={changwat.id} key={changwat.id}>
                                                {changwat.name}
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
                                        className="form-control text-sm"
                                    >
                                        <option value="">-- อำเภอ --</option>
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
                                        className="form-control text-sm"
                                    >
                                        <option value="">-- ตำบล --</option>
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
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <FormGroup>
                                    <label>รหัสไปรษณีย์</label>
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={formik.values.zipcode}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.zipcode && formik.touched.zipcode) && (
                                        <span className="text-red-500 text-sm">{formik.errors.zipcode}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ละติจูด</label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={formik.values.latitude}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.latitude && formik.touched.latitude) && (
                                        <span className="text-red-500 text-sm">{formik.errors.latitude}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ลองติจูด</label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={formik.values.longitude}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.longitude && formik.touched.longitude) && (
                                        <span className="text-red-500 text-sm">{formik.errors.longitude}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button type="submit" className={`btn ${place ? 'btn-outline-warning' : 'btn-outline-primary'} float-right`}>
                                    {place ? 'บันทึกการแก้ไข' : 'บันทึก'}
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default PlaceForm