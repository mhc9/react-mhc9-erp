import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import ModalAssetList from '../../components/Modals/AssetList';

const equipmentSchema = Yup.object().shape({
    equipment_type_id: Yup.string().required(),
    asset_id: Yup.string().required()
});

const EquipmentForm = () => {
    const [showAssetList, setShowAssetList] = useState(false);
    const [asset, setAsset] = useState(null);

    const onAssetSelected = (formik, asset) => {
        console.log(asset);
        setAsset(asset);
        formik.setFieldValue('asset_id', asset.id);
    };

    return (
        <Formik
            initialValues={{
                id: '',
                description: '',
                equipment_type_id: '',
                asset_id: '',
            }}
            validationSchema={equipmentSchema}
            onSubmit={() => console.log('on submitting...')}
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
                                    <label>รายละเอียด</label>
                                    <textarea
                                        rows={3}
                                        name="description"
                                        className="form-control"
                                    >
                                    </textarea>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>ประเภทอุปกรณ์</label>
                                    <select name="description" className="form-control">
                                        <option value=""></option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>กลุ่มอุปกรณ์</label>
                                    <select type="text" name="equipment_type_id" className="form-control">
                                        <option value=""></option>
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <FormGroup>
                                    <label>เลขที่พัสดุ</label>
                                    <div className="input-group">
                                        <div type="text" name="asset" className="form-control">
                                            {asset?.asset_no} {asset?.name}
                                        </div>
                                        <input type="hidden" name="asset_id" className="form-control" />
                                        <button className="btn btn-secondary" onClick={() => setShowAssetList(true)}>ค้นหา</button>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <button className="btn btn-primary mt-2 float-right">บันทึก</button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default EquipmentForm
