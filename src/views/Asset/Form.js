import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormGroup, Col, Row, Form as BsForm } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import api from '../../api';
import OverWriteMomentBE from '../../utils/OverwriteMomentBE'
import { store, update, upload } from '../../features/asset/assetSlice';
import Loading from '../../components/Loading'

const assetSchema = Yup.object().shape({
    asset_no: Yup.string().required(),
    name: Yup.string().required(),
    // description: Yup.string().required(),
    asset_category_id: Yup.string().required(),
    unit_id: Yup.string().required(),
    brand_id: Yup.string().required(),
    // budget_id: Yup.string().required(),
});

const AssetForm = ({ id, asset }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.asset);
    // const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    // const [filteredCategories, setFilteredCategories] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [units, setUnits] = useState([]);
    const [brands, setBrands] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [obtainingTypes, setObtainingTypes] = useState([]);
    const [selectedPurchasedAt, setSelectedPurchasedAt] = useState(moment());
    const [selectedDateIn, setSelectedDateIn] = useState(moment());
    const [selectedFirstYear, setSelectedFirstYear] = useState(moment());
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (asset) {
            setSelectedPurchasedAt(moment(asset.purchased_at));
            setSelectedDateIn(moment(asset.date_in));
            setSelectedFirstYear(moment(`${asset.first_year-543}-01-01`));
        }
    }, [asset]);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, [asset]);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/assets/init/form');
            
            // setTypes(res.data.types);
            setCategories(res.data.categories);
            setGroups(res.data.groups);
            setUnits(res.data.units);
            setBrands(res.data.brands);
            setBudgets(res.data.budgets);
            setObtainingTypes(res.data.obtainingTypes);

            /** If in editting mode. Set filteredGroups data for display in input */
            // if (asset) handleCategorySelected(asset?.asset_category_id);
            if (asset) setFilteredGroups(res.data.groups);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleTypeSelected = (type) => {
    //     const newCategories = categories.filter(category => category.asset_type_id === parseInt(type, 10));

    //     setFilteredCategories(newCategories);
    // };

    const handleCategorySelected = (category) => {
        const newGroups = groups.filter(group => group.category_id === parseInt(category, 10));

        setFilteredGroups(newGroups);
    };

    const handleSubmit = (values, props) => {
        console.log(values);
        // if (asset) {
        //     dispatch(update({ id, data: values }))
        // } else {
        //     dispatch(store(values))
        // }

        // props.resetForm();
    };

    const handleUploadImage = (id) => {
        let data = new FormData();

        data.append('img_url', selectedImage);

        dispatch(upload({ id, data }));
    }

    return (
        <Formik
            enableReinitialize
            initialValues={{
                id: asset ? id : '',
                asset_no: asset ? asset.asset_no : '',
                name: asset ? asset.name : '',
                description: (asset && asset.description) ? asset.description : '',
                asset_type_id: (asset && asset.asset_type_id) ? asset.asset_type_id : '',
                asset_category_id: (asset && asset.asset_category_id) ? asset.asset_category_id : '',
                asset_group_id: (asset && asset.asset_group_id) ? asset.asset_group_id : '',
                price_per_unit: (asset && asset.price_per_unit) ? asset.price_per_unit : '',
                unit_id: asset ? asset.unit_id : '',
                brand_id: asset ? asset.brand_id : '',
                model: (asset && asset.model) ? asset.model : '',
                purchased_at: (asset && asset.purchased_at) ? asset.purchased_at : moment().format('YYYY-MM-DD'),
                date_in: (asset && asset.date_in) ? asset.date_in : moment().format('YYYY-MM-DD'),
                first_year: (asset && asset.first_year) ? asset.first_year : moment().year()+543,
                obtain_type_id: (asset && asset.obtain_type_id) ? asset.obtain_type_id : '',
                budget_id: (asset && asset.budget_id) ? asset.budget_id : '',
                remark: (asset && asset.remark) ? asset.remark : ''
            }}
            validationSchema={assetSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        {asset && (
                            <Row className="mb-3">
                                <Col>
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="rounded-md mt-2 w-[200px] h-[132px] overflow-hidden flex justify-center border mb-2">
                                            {asset?.img_url ? (
                                                <img src={`${process.env.REACT_APP_API_URL}/${asset?.img_url}`} alt="" />
                                            ) : (
                                                <img src={``} alt="" />
                                            )}
                                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="" />}
                                        </div>
                                        <label>
                                            <input
                                                type="file"
                                                onChange={(e) => setSelectedImage(e.target.files[0])}
                                                className="hidden"
                                            />
                                            {!selectedImage ? (
                                                <p className="btn btn-outline-primary btn-sm">
                                                    เปลี่ยนรูป
                                                </p>
                                            ) : (
                                                <button type="button" className="btn btn-outline-success btn-sm">
                                                    อัพโหลด
                                                </button>
                                            )}
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                        )}
                        <Row className="mb-2">
                            <Col sm={6} md={4}>
                                <FormGroup>
                                    <label>เลขที่พัสดุ</label>
                                    <input
                                        type="text"
                                        name="asset_no"
                                        value={formik.values.asset_no}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
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
                                        className="form-control text-sm"
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
                                        className="form-control text-sm"
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
                                    <label>ชนิดพัสดุ</label>
                                    <select
                                        name="asset_category_id"
                                        value={formik.values.asset_category_id} 
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handleCategorySelected(e.target.value);
                                        }}
                                        className="form-control text-sm"
                                    >
                                        <option value="">-- เลือกชนิดพัสดุ --</option>
                                        {categories && categories.map(category => (
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
                            <Col>
                                <FormGroup>
                                    <label>กลุ่มพัสดุ</label>
                                    <select
                                        name="asset_group_id"
                                        value={formik.values.asset_group_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    >
                                        <option value="">-- เลือกกลุ่มพัสดุ --</option>
                                        {filteredGroups && filteredGroups.map(group => (
                                            <option value={group.id} key={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <FormGroup>
                                    <label>ราคาต่อหน่วย</label>
                                    <input
                                        type="text"
                                        name="price_per_unit"
                                        value={formik.values.price_per_unit}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.price_per_unit && formik.touched.price_per_unit) && (
                                        <span className="text-red-500 text-sm">{formik.errors.price_per_unit}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label>หน่วยนับ</label>
                                    <select
                                        name="unit_id"
                                        value={formik.values.unit_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
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
                            <Col md={3}>
                                <FormGroup>
                                    <label>ประเภทการได้มา</label>
                                    <select
                                        name="obtain_type_id"
                                        value={formik.values.obtain_type_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
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
                            <Col md={3}>
                                <FormGroup>
                                    <label>แหล่งงบประมาณ</label>
                                    <select
                                        name="budget_id"
                                        value={formik.values.budget_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
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
                            <Col md={3}>
                                <FormGroup>
                                    <label>ยี่ห้อ/ผู้ผลิต</label>
                                    <select
                                        name="brand_id"
                                        value={formik.values.brand_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
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
                            <Col>
                                <FormGroup>
                                    <label>รุ่น</label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formik.values.model}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.model && formik.touched.model) && (
                                        <span className="text-red-500 text-sm">{formik.errors.model}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <div className="flex flex-col">
                                        <label>วันที่ซื้อ</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedPurchasedAt}
                                                onChange={(date) => {
                                                    setSelectedPurchasedAt(date);
                                                    formik.setFieldValue('purchased_at', date.format('YYYY-MM-DD'));
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {/* <BsForm.Control
                                            type="date"
                                            name="purchased_at"
                                            value={formik.values.purchased_at}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        /> */}
                                        {(formik.errors.purchased_at && formik.touched.purchased_at) && (
                                            <span className="text-red-500 text-sm">{formik.errors.purchased_at}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <div className="flex flex-col">
                                        <label>ปีที่ซื้อ (พ.ศ. เช่น 25xx)</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                views={["year"]}
                                                format="YYYY"
                                                value={selectedFirstYear}
                                                onChange={(date) => {
                                                    setSelectedFirstYear(date);
                                                    formik.setFieldValue('first_year', date.year()+543);
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {/* <input
                                            type="text"
                                            name="first_year"
                                            value={formik.values.first_year}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                            placeholder="ปีที่ซื้อ"
                                        /> */}
                                        {(formik.errors.first_year && formik.touched.first_year) && (
                                            <span className="text-red-500 text-sm">{formik.errors.first_year}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <div className="flex flex-col">
                                        <label>วันที่นำเข้าระบบ</label>
                                        <MuiPickersUtilsProvider utils={OverWriteMomentBE} locale="th">
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedDateIn}
                                                onChange={(date) => {
                                                    setSelectedDateIn(date);
                                                    formik.setFieldValue('date_in', date.format('YYYY-MM-DD'));
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                        {/* <BsForm.Control
                                            type="date"
                                            name="date_in"
                                            value={formik.values.date_in}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        /> */}
                                        {(formik.errors.date_in && formik.touched.date_in) && (
                                            <span className="text-red-500 text-sm">{formik.errors.date_in}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={asset ? 12 : 6}>
                                <FormGroup>
                                    <label>หมายเหตุ</label>
                                    <textarea
                                        rows={asset ? 3 : 8}
                                        name="remark"
                                        value={formik.values.remark}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    >
                                    </textarea>
                                </FormGroup>
                            </Col>
                            {!asset && (
                                <Col md={6}>
                                    <FormGroup>
                                        <label>รูปพัสดุ</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setSelectedImage(e.target.files[0])}
                                            className="form-control text-sm"
                                        />
                                        <div className="border rounded-md mt-2 h-[132px] overflow-hidden flex justify-center">
                                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="" />}
                                        </div>
                                    </FormGroup>
                                </Col>
                            )}
                        </Row>
                        <Row>
                            <Col>
                                <button
                                    type="submit"
                                    className={`btn ${asset ? 'btn-outline-warning' : 'btn-outline-primary'} mt-2 float-right`}
                                    disabled={formik.isSubmitting}
                                >
                                    {loading && <Loading />}
                                    {asset ? 'บันทึกการแกไข' : 'บันทึก'}
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
