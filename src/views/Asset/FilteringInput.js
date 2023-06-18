import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import api from '../../api'

const initialFilters = {
    assetNo: '',
    name: '',
    category: '',
    owner: '',
};

const FilteringInput = () => {
    const [categories, setCategories] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        getFormInitialData();

        return () => getFormInitialData();
    }, []);

    const getFormInitialData = async () => {
        try {
            const res = await api.get('/api/assets/form/init');

            setCategories(res.data.categories);
            setEmployees(res.data.employees);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setFilters(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="flex flex-col gap-2 my-2">
            <Row>
                <Col md={4}>
                    <input
                        type="text"
                        name="name"
                        value={filters.name}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="ชื่อพัสดุ"
                    />
                </Col>
                <Col md={4}>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option>-- ชนิดพัสดุ --</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Col>
                <Col md={4}>
                    <select
                        name="employee"
                        value={filters.employee}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option>-- ผู้รับผิดชอบ --</option>
                        {employees && employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {`${employee.firstname} ${employee.lastname}`}
                            </option>
                        ))}
                    </select>
                </Col>
                <Col></Col>
            </Row>
        </div>
    )
}

export default FilteringInput
