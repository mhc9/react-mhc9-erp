import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api';
import { store } from '../../features/equipment/equipmentSlice';
import Loading from '../../components/Loading'

const assetSchema = Yup.object().shape({
    asset_no: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string().required(),
    asset_category_id: Yup.string().required(),
    budget_id: Yup.string().required(),
});

const AssetForm = () => {
    const dispatch = useDispatch();
    const { loading, success } = useSelector(state => state.equipment);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, []);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/assets/form/init');
            
            setTypes(res.data.types);
            setCategories(res.data.categories);
        } catch (error) {
            
        }
    };

    const handleTypeSelected = (type) => {
        const newCategories = categories.filter(category => category.asset_type_id === parseInt(type, 10));

        setFilteredCategories(newCategories);
    };

    const handleSubmit = (values, props) => {
        console.log(values, props);
        dispatch(store(values))
    };

    return (
        <Formik
            initialValues={{
                id: '',
                asset_no: '',
                name: '',
                description: '',
                asset_type_id: '',
                asset_category_id: '',
                remark: ''
            }}
            validationSchema={assetSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row className="mb-2">
                            <Col sm={6} md={4}>
                                <FormGroup>
                                    <label>เลขที่พัสดุ</label>
                                    <input
                                        type="text"
                                        name="asset_no"
                                        value={formik.values.asset_no}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.asset_no && formik.touched.asset_no) && (
                                        <span className="text-red-500 text-sm">{formik.errors.asset_no}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col sm={6} md={8}>
                                <FormGroup>
                                    <label>ชื่อพัสดุ</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.name && formik.touched.name) && (
                                        <span className="text-red-500 text-sm">{formik.errors.name}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>รายละเอียด</label>
                                    <textarea
                                        rows={3}
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                    </textarea>
                                    {(formik.errors.description && formik.touched.description) && (
                                        <span className="text-red-500 text-sm">{formik.errors.description}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>ประเภทพัสดุ</label>
                                    <select name="asset_type_id" value={formik.values.asset_type_id} className="form-control"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handleTypeSelected(e.target.value);
                                        }}
                                    >
                                        <option value="">-- เลือกประเภท --</option>
                                        {types && types.map(type => (
                                            <option value={type.id} key={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>กลุ่มพัสดุ</label>
                                    <select
                                        name="asset_category_id"
                                        value={formik.values.asset_category_id} 
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกกลุ่ม --</option>
                                        {filteredCategories && filteredCategories.map(category => (
                                            <option value={category.id} key={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.asset_category_id && formik.touched.asset_category_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.asset_category_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>หมายเหตุ</label>
                                    <textarea
                                        rows={3}
                                        name="remark"
                                        value={formik.values.remark}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                    </textarea>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button
                                    type="submit"
                                    className="btn btn-outline-primary mt-2 float-right"
                                    disabled={formik.isSubmitting}
                                >
                                    {loading && <Loading />}
                                    บันทึก
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AssetForm
