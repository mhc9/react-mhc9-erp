import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ModalAssetList from '../../components/Modals/AssetList';
import api from '../../api';
import { store } from '../../features/equipment/equipmentSlice';
import Loading from '../../components/Loading'

const equipmentSchema = Yup.object().shape({
    asset_id: Yup.string().required(),
    description: Yup.string().required(),
    equipment_group_id: Yup.string().required(),
});

const EquipmentForm = () => {
    const dispatch = useDispatch();
    const { loading, success } = useSelector(state => state.equipment);
    const [showAssetList, setShowAssetList] = useState(false);
    const [asset, setAsset] = useState(null);
    const [types, setTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [filteredGroupss, setFilteredGroups] = useState([]);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, []);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/equipments/form/init');
            
            setTypes(res.data.types);
            setGroups(res.data.groups);
        } catch (error) {
            
        }
    };

    const handleTypeSelected = (type) => {
        console.log(typeof type);
        const newGroups = groups.filter(group => group.equipment_type_id === parseInt(type, 10));

        setFilteredGroups(newGroups);
    };

    const onAssetSelected = (formik, asset) => {
        setAsset(asset);
        formik.setFieldValue('asset_id', asset.id);
    };

    const handleSubmit = (values, props) => {
        console.log(values, props);
        dispatch(store(values))
    };

    return (
        <Formik
            initialValues={{
                id: '',
                description: '',
                equipment_type_id: '',
                equipment_group_id: '',
                asset_id: '',
                remark: ''
            }}
            validationSchema={equipmentSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalAssetList
                            isShow={showAssetList}
                            handleHide={() => setShowAssetList(false)}
                            handleSelect={(asset) => onAssetSelected(formik, asset)}
                        />

                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>เลขที่พัสดุ</label>
                                    <div className="input-group has-validation">
                                        <div type="text" name="asset" className="form-control">
                                            {asset?.asset_no} {asset?.name}
                                        </div>
                                        <input
                                            type="hidden"
                                            name="asset_id"
                                            value={formik.values.asset_id}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAssetList(true)}>ค้นหา</button>
                                    </div>
                                    {(formik.errors.asset_id && formik.touched.asset_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.asset_id}</span>
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
                                    <label>ประเภทอุปกรณ์</label>
                                    <select name="equipment_type_id" value={formik.values.equipment_type_id} className="form-control"
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
                                    <label>กลุ่มอุปกรณ์</label>
                                    <select
                                        name="equipment_group_id"
                                        value={formik.values.equipment_group_id} 
                                        onChange={formik.handleChange}
                                        className="form-control"
                                    >
                                        <option value="">-- เลือกกลุ่ม --</option>
                                        {filteredGroupss && filteredGroupss.map(group => (
                                            <option value={group.id} key={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                    {(formik.errors.equipment_group_id && formik.touched.equipment_group_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.equipment_group_id}</span>
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

export default EquipmentForm
