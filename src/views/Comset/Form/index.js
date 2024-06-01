import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../../features/slices/comset/comsetSlice';
import Loading from '../../../components/Loading'
import ModalAssetList from '../../../components/Modals/AssetList';
import ModalEquipmentForm from '../../../components/Modals/Equipment/Form'

const comsetSchema = Yup.object().shape({
    asset_id: Yup.string().required(),
    name: Yup.string().required(),
});

const ComsetForm = ({ comset }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.comset);
    const [showAssetList, setShowAssetList] = useState(false);
    const [showEquipmentForm, setShowEquipmentForm] = useState(false);
    const [asset, setAsset] = useState(null);

    const handleAssetSelected = (formik, asset) => {
        setAsset(asset);
        formik.setFieldValue('asset_id', asset.id);
    };

    const handleAddEquipment = (formik, equipment) => {
        formik.setFieldValue('equipments', [ ...formik.values.equipments, equipment ]);
    };

    const handleSubmit = (values, props) => {
        console.log(values, props);
        dispatch(store(values));
    };

    return (
        <Formik
            initialValues={{
                id: comset ? comset.id : '',
                name: comset ? comset.name : '',
                description: comset ? comset.description : '',
                asset_id: comset ? comset.asset_id : '',
                remark: comset ? comset.remark : '',
                equipments: [],
                assets: []
            }}
            validationSchema={comsetSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalAssetList
                            isShow={showAssetList}
                            handleHide={() => setShowAssetList(false)}
                            handleSelect={(asset) => handleAssetSelected(formik, asset)}
                        />

                        <ModalEquipmentForm
                            isShow={showEquipmentForm}
                            onHide={() => setShowEquipmentForm(false)}
                            onSubmit={(equipment) => handleAddEquipment(formik, equipment)}
                        />

                        <Row className="mb-2">
                            <Col md={4}>
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
                            <Col md={8}>
                                <FormGroup>
                                    <label>ชื่อชุดคอมพิวเตอร์</label>
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
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-row items-center justify-between mb-2">
                                    <h4 className="text-lg font-bold">อุปกรณ์ภายใน</h4>
                                    
                                    <div className="flex flex-row">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm text-sm"
                                            onClick={() => setShowEquipmentForm(true)}
                                        >
                                            เพิ่มอุปกรณ์
                                        </button>
                                    </div>
                                </div>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="w-[5%] text-center">#</th>
                                            <th className="w-[12%] text-center">ประเภทอุปกรณ์</th>
                                            <th>รายละเอียด</th>
                                            <th className="w-[8%] text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formik.values.equipments.map((eq, index) => (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default ComsetForm
