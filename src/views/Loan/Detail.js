import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Col, Row, Tab, Tabs } from 'react-bootstrap'
import moment from 'moment'
import { getLoan } from '../../features/slices/loan/loanSlice'
import { useGetInitialFormDataQuery } from '../../features/services/loan/loanApi'
import { currency, toLongTHDate, getFormDataItem, sortObjectByDate } from '../../utils'
import Loading from '../../components/Loading'
import BudgetList from './Form/BudgetList'
import OrderList from './Form/OrderList'
import ExpenseList from '../../components/Expense/ExpenseList'

const LoanDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loan, isLoading } = useSelector(state => state.loan);
    const { data: formData, isLoading: loading } = useGetInitialFormDataQuery();

    useEffect(() => {
        if (id) {
            dispatch(getLoan(id));
        }
    }, [id]);

    return (
        <div className="content-wrapper">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ยืมเงินราชการ</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/loan' }}>รายการคำขอ</Breadcrumb.Item>
                <Breadcrumb.Item active>รายละเอียดคำขอ</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                {isLoading && <div className="text-center"><Loading /></div>}
                {!isLoading && (
                    <>
                        <Row className="mb-2">
                            <Col md={3}>
                                <label htmlFor="">เลขที่เอกสาร</label>
                                <div className="form-control text-sm">
                                    {loan?.doc_no}
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="flex flex-col">
                                    <label htmlFor="">วันที่เอกสาร</label>
                                    <div className="form-control text-sm">
                                        {toLongTHDate(moment(loan?.doc_date).toDate())}
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <label>ประเภทการยืม</label>
                                <div className="form-control text-sm">
                                    {getFormDataItem(formData, 'loanTypes', loan?.loan_type_id)?.name}
                                </div>
                            </Col>
                            <Col md={3}>
                                <label htmlFor="">ประเภทเงินยืม</label>
                                <div className="form-control text-sm">
                                    {getFormDataItem(formData, 'moneyTypes', loan?.money_type_id)?.name}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={4}>
                                <label htmlFor="">หน่วยงาน</label>
                                <div className="form-control text-sm">
                                    {loan?.department?.name}
                                </div>
                            </Col>
                            <Col md={6}>
                                <label htmlFor="">ผู้ขอ/เจ้าของโครงการ</label>
                                <div className="form-control text-sm">
                                    {loan?.employee?.firstname} {loan?.employee?.lastname}
                                </div>
                            </Col>
                            <Col md={2}>
                                <label htmlFor="">ปีงบ</label>
                                <div className="form-control text-sm">
                                    {loan?.year && loan?.year+543}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">รายละเอียดโครงการ</h1>

                                    <Row className="mb-2">
                                        <Col md={2}>
                                            <label htmlFor="">เลขที่ขออนุมติ</label>
                                            <div className="form-control text-sm">
                                                {loan?.project_no}
                                            </div>
                                        </Col>
                                        <Col md={2}>
                                            <label htmlFor="">วันที่ขออนุมติ</label>
                                            <div className="form-control text-sm">
                                                {toLongTHDate(moment(loan?.project_date).toDate())}
                                            </div>
                                        </Col>
                                        <Col>
                                            <label htmlFor="">ชื่อโครงการ</label>
                                            <div className="form-control text-xs">
                                                {loan?.project_name}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col>
                                            <label htmlFor="">วันที่จัด</label>
                                            <div className="form-control text-sm">
                                                {toLongTHDate(moment(loan?.project_sdate).toDate())}
                                            </div>
                                        </Col>
                                        <Col>
                                            <label htmlFor="">ถึงวันที่</label>
                                            <div className="form-control text-sm">
                                                {toLongTHDate(moment(loan?.project_edate).toDate())}
                                            </div>
                                        </Col>
                                        <Col>
                                            <label htmlFor="">การคิดค่าใช้จ่าย</label>
                                            <div className="form-control text-sm">
                                                {loan?.expense_calc === 1 && <span className="badge rounded-pill bg-success">คิดค่าใช้จ่ายรวม</span>}
                                                {loan?.expense_calc === 2 && <span className="badge rounded-pill bg-danger">คิดค่าใช้จ่ายแยกวันที่</span>}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="alert alert-primary py-1 px-1 mb-0">
                                                <h3 className="text-blue-900 ml-1 underline">รายการรุ่น</h3>

                                                <ul className="text-sm font-thin">
                                                    {loan && [...loan?.courses]
                                                        .sort((a, b) => sortObjectByDate(a.course_date, b.course_date))
                                                        .map((course, index) => (
                                                            <li key={index} className="hover:bg-blue-300 py-1 px-2 rounded-md">
                                                                {/* - รุ่นที่ {course.seq_no} */}
                                                                {++index}.{course?.course_date && <span className="ml-1">วันที่ {toLongTHDate(moment(course?.course_date).toDate())}</span>} 
                                                                <span className="ml-1">
                                                                    ณ {course?.room && <span className="mr-1">{course.room}</span>}
                                                                    {course?.place?.name} จ.{course?.place?.changwat?.name}
                                                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col md={12}>
                                <div className="flex flex-col border p-2 rounded-md">
                                    <h1 className="font-bold text-lg mb-1">งบประมาณ</h1>

                                    <BudgetList budgets={loan?.budgets} showButtons={false} />

                                    <div className="flex flex-row justify-end items-center">
                                        <div className="mr-2">งบประมาณทั้งสิ้น</div>
                                        <div className="w-[15%]">
                                            <div className="form-control font-bold float-right text-right text-green-500">
                                                {currency.format(loan?.budget_total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <div className="flex flex-col">
                                    <Tabs id="" defaultActiveKey="expense">
                                        <Tab eventKey="expense" title="รายการค่าใช้จ่าย">
                                            <ExpenseList
                                                items={loan?.details.filter(item => item.expense_group === 1)}
                                                courses={loan && [...loan?.courses].sort((a, b) => sortObjectByDate(a.course_date, b.course_date))}
                                                showButtons={false}
                                            />
                                            <div className="flex flex-row items-center gap-2">
                                                <div className="w-[85%] text-right">รวมค่าใช้จ่ายทั้งสิ้น</div>
                                                <div className="form-control min-h-[34px] w-[15%] text-right text-sm">
                                                    {currency.format(loan?.item_total)}
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="orders" title="รายการจัดซื้อจัดจ้าง">
                                            <OrderList
                                                orders={loan?.details.filter(item => item.expense_group === 2)}
                                                showButtons={false}
                                            />
                                            <div className="flex flex-row items-center gap-2">
                                                <div className="w-[85%] text-right">รวมจัดซื้อจัดจ้างทั้งสิ้น</div>
                                                <div className="form-control min-h-[34px] w-[15%] text-right text-sm">
                                                    {currency.format(loan?.order_total)}
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>

                                    <div className="flex flex-row justify-end items-center mt-2 px-[10px]">
                                        <div className="text-lg font-bold mr-2">รวมเป็นเงินทั้งสิ้น</div>
                                        <div className="w-[15%]">
                                            <div className="form-control font-bold float-right text-right text-red-500">
                                                {currency.format(loan?.net_total)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2">
                            <Col>
                                <label htmlFor="">หมายเหตุ</label>
                                <div className="form-control text-sm min-h-[68px]">
                                    {loan?.remark}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-2 mt-4">
                            <Col className="flex justify-center">
                                <Link to={`/preview/${id}/loan/form`} target="_blank" className="btn btn-primary mr-2">
                                    <i className="fas fa-print mr-1"></i>
                                    พิมพ์คำขอ
                                </Link>
                                <Link to={`/preview/${id}/project/verify`} target="_blank" className="btn btn-secondary mr-2">
                                    <i className="fas fa-print mr-1"></i>
                                    พิมพ์บันทึกทวนสอบ
                                </Link>
                                <Link to={`/preview/${id}/project/review`} target="_blank" className="btn btn-success mr-2">
                                    <i className="fas fa-print mr-1"></i>
                                    พิมพ์บันทึกทบทวน
                                </Link>
                                <Link to={`/preview/${id}/loan-contract/form`} target="_blank" className="btn btn-danger mr-2">
                                    <i className="fas fa-print mr-1"></i>
                                    พิมพ์สัญญาเงินยืม
                                </Link>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </div>
    )
}

export default LoanDetail