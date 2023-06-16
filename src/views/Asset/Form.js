import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormGroup, Col, Row, Form as BsForm } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api';
import { store } from '../../features/asset/assetSlice';
import Loading from '../../components/Loading'

const assetSchema = Yup.object().shape({
    asset_no: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string().required(),
    asset_category_id: Yup.string().required(),
    // budget_id: Yup.string().required(),
});

const AssetForm = ({ id, asset }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.asset);
    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [brands, setBrands] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [obtainingTypes, setObtainingTypes] = useState([]);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, []);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/assets/form/init');
            
            setTypes(res.data.types);
            setCategories(res.data.categories);
            setUnits(res.data.units);
            setBrands(res.data.brands);
            setBudgets(res.data.budgets);
            setObtainingTypes(res.data.obtainingTypes);
        } catch (error) {
            console.log(error);
        }
    };

    const handleTypeSelected = (type) => {
        const newCategories = categories.filter(category => category.asset_type_id === parseInt(type, 10));

        setFilteredCategories(newCategories);
    };

    const handleSubmit = (values, props) => {
        dispatch(store(values))
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: asset ? id : '',
                asset_no: asset ? asset.asset_no : '',
                name: asset ? asset.name : '',
                description: asset ? asset.description : '',
                asset_type_id: asset ? asset.asset_type_id : '',
                asset_category_id: asset ? asset.asset_category_id : '',
                price_per_unit: asset ? asset.price_per_unit : '',
                unit_id: asset ? asset.unit_id : '',
                brand_id: asset ? asset.brand_id : '',
                model: asset ? asset.model : '',
                purchased_at: asset ? asset.purchased_at : '',
                date_in: asset ? asset.date_in : '',
                first_year: asset ? asset.first_year : '',
                obtain_type_id: asset ? asset.obtain_type_id : '',
                budget_id: asset ? asset.budget_id : '',
                remark: asset ? asset.remark : ''
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
                                        placeholder="เลขที่พัสดุ"
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
                                        placeholder="ชื่อพัสดุ"
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
                                        placeholder="รายละเอียด"
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
                                    <label>ราคาต่อหน่วย</label>
                                    <input
                                        type="text"
                                        name="price_per_unit"
                                        value={formik.values.price_per_unit}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.price_per_unit && formik.touched.price_per_unit) && (
                                        <span className="text-red-500 text-sm">{formik.errors.price_per_unit}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>หน่วยนับ</label>
                                    <select
                                        name="unit_id"
                                        value={formik.values.unit_id}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกหน่วยนับ --</option>
                                        {units && units.map(unit => (
                                            <option value={unit.id} key={unit.id}>{unit.name}</option>
                                        ))}
                                    </select>
                                    {(formik.errors.unit_id && formik.touched.unit_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.unit_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ยี่ห้อ/ผู้ผลิต</label>
                                    <select
                                        name="brand_id"
                                        value={formik.values.brand_id}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกยี่ห้อ/ผู้ผลิต --</option>
                                        {brands && brands.map(brand => (
                                            <option value={brand.id} key={brand.id}>{brand.name}</option>
                                        ))}
                                    </select>
                                    {(formik.errors.brand_id && formik.touched.brand_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.brand_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>รุ่น</label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formik.values.model}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.model && formik.touched.model) && (
                                        <span className="text-red-500 text-sm">{formik.errors.model}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ประเภทการได้มา</label>
                                    <select
                                        name="obtain_type_id"
                                        value={formik.values.obtain_type_id}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกประเภทการได้มา --</option>
                                        {obtainingTypes && obtainingTypes.map(ob => (
                                            <option key={ob.id} value={ob.id}>
                                                {ob.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.obtain_type_id && formik.touched.obtain_type_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.obtain_type_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>แหล่งงบประมาณ</label>
                                    <select
                                        name="budget_id"
                                        value={formik.values.budget_id}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกแหล่งงบประมาณ --</option>
                                        {budgets && budgets.map(budget => (
                                            <option key={budget.id} value={budget.id}>
                                                {budget.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.budget_id && formik.touched.budget_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.budget_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>วันที่ซื้อ</label>
                                    <BsForm.Control
                                        type="date"
                                        name="purchased_at"
                                        value={formik.values.purchased_at}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.purchased_at && formik.touched.purchased_at) && (
                                        <span className="text-red-500 text-sm">{formik.errors.purchased_at}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>ปีที่ซื้อ (พ.ศ. เช่น 25xx)</label>
                                    <input
                                        type="text"
                                        name="first_year"
                                        value={formik.values.first_year}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                        placeholder="ปีที่ซื้อ"
                                    />
                                    {(formik.errors.first_year && formik.touched.first_year) && (
                                        <span className="text-red-500 text-sm">{formik.errors.first_year}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>วันที่นำเข้าระบบ</label>
                                    <BsForm.Control
                                        type="date"
                                        name="date_in"
                                        value={formik.values.date_in}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    />
                                    {(formik.errors.date_in && formik.touched.date_in) && (
                                        <span className="text-red-500 text-sm">{formik.errors.date_in}</span>
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
