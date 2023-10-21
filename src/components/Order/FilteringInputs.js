import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'
import { useGetInitialFormDataQuery } from '../../services/order/orderApi'
import { generateQueryString } from '../../utils';
import Loading from '../Loading';

const initialFormData = {
    suppliers: []
};

const OrderFilteringInputs = ({ initialFilters, onFilter }) => {
    const [filters, setFilters] = useState(initialFilters);
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFilters({ ...filters, [name]: value })
    };

    const handleFilter = () => {
        onFilter(generateQueryString(filters));
    };

    const handleClearInputs = () => {
        setFilters(initialFilters);

        onFilter(generateQueryString(initialFilters));
    };

    return (
        <Row className="mb-3">
            <Col>
                <div className="filtering-wrapper border rounded-md flex flex-row gap-2 p-2">
                    <FormGroup>
                        <input
                            type="btn"
                            name="po_no"
                            value={filters.po_no}
                            onChange={handleInputChange}
                            placeholder="เลขที่ใบสั่งซื้อ/จ้าง"
                            className="form-control text-sm font-thin"
                        />
                    </FormGroup>
                    <FormGroup>
                        <input
                            type="date"
                            name="po_date"
                            value={filters.po_date}
                            onChange={handleInputChange}
                            placeholder="วันที่ใบสั่งซื้อ/จ้าง"
                            className="form-control text-sm font-thin"
                        />
                    </FormGroup>
                    <FormGroup>
                        {isLoading && <div className="form-control text-sm text-center"><Loading /></div>}
                        {!isLoading && (
                            <select
                                name="supplier"
                                value={filters.supplier}
                                onChange={handleInputChange}
                                className="form-control text-sm font-thin"
                            >
                                <option value="">-- ผู้จัดจำหน่าย --</option>
                                {formData.suppliers && formData.suppliers.map(supplier => (
                                    <option value={supplier.id} key={supplier.id}>
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleInputChange}
                            className="form-control text-sm font-thin"
                        >
                            <option value="">-- สถานะ --</option>
                            <option value="1">รอดำเนินการ</option>
                            <option value="2">สั่งซื้อแล้ว</option>
                            <option value="9">ยกเลิก</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <button type="button" className="btn btn-outline-secondary text-sm" onClick={handleFilter}>
                            ตกลง
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger text-sm ml-1"
                            onClick={handleClearInputs}
                        >
                            เคลียร์
                        </button>
                    </FormGroup>
                </div>
            </Col>
        </Row>
    )
}

export default OrderFilteringInputs
