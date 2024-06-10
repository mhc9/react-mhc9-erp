import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import { store, update } from '../../../features/slices/comset/comsetSlice';
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

    useEffect(() => {
        if (comset) {
            setAsset(comset.asset)
        }
    }, [comset]);

    const handleAssetSelected = (formik, asset) => {
        setAsset(asset);
        formik.setFieldValue('asset_id', asset.id);
    };

    const handleAddEquipment = (formik, equipment) => {
        formik.setFieldValue('equipments', [ ...formik.values.equipments, equipment ]);
    };

    const handleSubmit = (values, props) => {
        if (comset) {
            dispatch(update({ id: comset.id, data: values }));
        } else {
            dispatch(store(values));
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: comset ? comset.name : '',
                description: (comset && comset.description) ? comset.description : '',
                asset_id: comset ? comset.asset_id : '',
                remark: (comset && comset.remark) ? comset.remark : '',
                equipments: comset ? comset.equipments : [],
                assets: comset ? comset.assets : []
            }}
            validationSchema={comsetSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <ModalAssetList
                            isShow={showAssetList}
                            onHide={() => setShowAssetList(false)}
                            onSelect={(asset) => handleAssetSelected(formik, asset)}
                        />

                        <ModalEquipmentForm
                            isShow={showEquipmentForm}
                            onHide={() => setShowEquipmentForm(false)}
                            onSubmit={(equipment) => handleAddEquipment(formik, equipment)}
                        />

                        <Row className="mb-2">
                            <Col md={4}>
                                <FormGroup>
                                    <label>หมายเลขครุภัณฑ์/เลข FSN</label>
                                    <div className="input-group has-validation">
                                        <div type="text" name="asset" className="form-control text-sm text-center bg-gray-100 min-h-[34px]">
                                            {asset?.asset_no ? asset?.asset_no : asset?.fsn_no}
                                        </div>
                                        <input
                                            type="hidden"
                                            name="asset_id"
                                            value={formik.values.asset_id}
                                            onChange={formik.handleChange}
                                        />
                                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setShowAssetList(true)}>ค้นหา</button>
                                    </div>
                                    {(formik.errors.asset_id && formik.touched.asset_id) && (
                                        <span className="text-red-500 text-sm">{formik.errors.asset_id}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col md={8}>
                                <FormGroup>
                                    <label>รายละเอียดครุภัณฑ์</label>
                                    <div className="form-control text-sm bg-gray-100 min-h-[34px]">
                                        {asset?.name}
                                        <span className="ml-1">ยี่ห้อ {asset?.brand?.name}</span>
                                        <span className="ml-1">รุ่น {asset?.model ? asset?.model : '-'}</span>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <FormGroup>
                                    <label>ชื่อชุดคอมพิวเตอร์</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    {(formik.errors.name && formik.touched.name) && (
                                        <span className="text-red-500 text-sm">{formik.errors.name}</span>
                                    )}
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <label>รายละเอียด</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    >
                                    </input>
                                    {(formik.errors.description && formik.touched.description) && (
                                        <span className="text-red-500 text-sm">{formik.errors.description}</span>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mb-4">
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
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => setShowEquipmentForm(true)}
                                        >
                                            เพิ่มอุปกรณ์
                                        </button>
                                    </div>
                                </div>

                                <table className="table table-bordered text-sm">
                                    <thead>
                                        <tr>
                                            <th className="w-[5%] text-center">#</th>
                                            <th className="w-[20%] text-center">ประเภทอุปกรณ์</th>
                                            <th>รายละเอียด</th>
                                            <th className="w-[8%] text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formik.values.equipments.map((equipment, index) => (
                                            <tr key={equipment.id}>
                                                <td className="text-center">{index+1}</td>
                                                <td className="text-center">{equipment.type?.name}</td>
                                                <td>
                                                    <span>{equipment.brand?.name}</span>
                                                    <span className="mx-1">{equipment.model}</span>
                                                    <span>{equipment.capacity}</span>
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-sm btn-warning px-1 mr-1">
                                                        <FaPencilAlt />
                                                    </a>
                                                    <a href="#" className="btn btn-sm btn-danger px-1">
                                                        <FaTrash />
                                                    </a>
                                                </td>
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
                                    className="btn btn-outline-primary float-right"
                                    disabled={formik.isSubmitting}
                                >
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
