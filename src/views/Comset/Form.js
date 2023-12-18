import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../features/slices/comset/comsetSlice';
import Loading from '../../components/Loading'
import ModalAssetList from '../../components/Modals/AssetList';

const comsetSchema = Yup.object().shape({
    asset_id: Yup.string().required(),
    description: Yup.string().required(),
});

const ComsetForm = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.comset);
    const [showAssetList, setShowAssetList] = useState(false);
    const [asset, setAsset] = useState(null);

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
                asset_id: '',
                description: '',
                remark: ''
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

export default ComsetForm
