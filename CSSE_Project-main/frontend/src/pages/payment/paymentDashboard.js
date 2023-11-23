import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from "../adminNav";

function PaymentDashboard() {
    // State variables for search input and payment data
    const [searchName, setsearchName] = useState("");
    const [allPayment, setallPayment] = useState([]);

    // Fetch payment data based on search input
    useEffect(() => {
        if (searchName === '' || searchName === null) {
            axios.get(global.APIUrl + "/payment/allOrderPayment")
                .then(res => setallPayment(res.data))
                .catch(error => console.log(error));
        } else {
            axios.get(global.APIUrl + "/payment/allOrderPayment/" + searchName)
                .then(res => setallPayment(res.data))
                .catch(error => console.log(error));
        }
    }, [searchName]);

    // Function to accept a payment and update its status
    function Accept(id) {
        const status = "Shipped";
        const statusUpdate = { status };
        axios.put(global.APIUrl + "/payment/statusPaymentUpdate/" + id, statusUpdate).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/orderdas";
                }
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Status Not Updated!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
        });
    }

    // Function to reject a payment and update its status
    function Reject(id) {
        const status = "Cancel Order";
        const statusUpdate = { status };
        axios.put(global.APIUrl + "/payment/statusPaymentUpdate/" + id, statusUpdate).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Status Updated!",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            }).then(okay => {
                if (okay) {
                    window.location.href = "/orderdas";
                }
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Status Not Updated!",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
        });
    }

    // Function to view payment details
    function View(_id, accountHold, cardNumber, expireDate, ccv, paymentMethod, reason, Amount, userName, paymentTitle, status) {
        reactLocalStorage.setObject("viewPayment", [_id, accountHold, cardNumber, expireDate, ccv, paymentMethod, reason, Amount, userName, paymentTitle, status]);
        window.location.href = "/PaymentView";
    }

    // Function to delete a payment
    function DeletePay(id) {
        axios.delete(global.APIUrl + "/payment/deletePayment/" + id).then(() => {
            Swal.fire({
                title: "Success!",
                text: "Payment Delete",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"
            });
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Payment Not Deleted",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
        });
    }

    return (
        <div className="dashboard-main-wrapper">
            <Navbar />
            <div className="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase d-letter-spacing fw-bold" style={{ color: 'black' }}>
                        <i className="fas fa-home"></i>Admin Dashboard
                    </h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
                        <center>
                            <h2 className="text-uppercase text-black">Order MANAGEMENT</h2>
                        </center>
                        <div className="text-end mt-5">
                            <h6>Search Using Payment Amount</h6>
                            <MDBInput className="mt-3 bg-white" id='form1' type='text' onChange={(e) => {
                                setsearchName(e.target.value);
                            }} />
                        </div>
                        <h5 className='mt-5' id="Sale">Customer Orders</h5>
                        <MDBTable hover>
                            <MDBTableHead className="bg-dark">
                                <tr>
                                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Payment Id</h6></th>
                                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Amount</h6></th>
                                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Date</h6></th>
                                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Description</h6></th>
                                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Status</h6></th>
                                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Action</h6></th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {allPayment.map((allPayments, key) => (
                                    <tr className="bg-light" key={key}>
                                        <td style={{ fontSize: '18px' }}>{allPayments._id}</td>
                                        <td style={{ fontSize: '18px' }}>RS.{allPayments.Amount}</td>
                                        <td style={{ fontSize: '18px' }}>{allPayments.createdAt}</td>
                                        <td style={{ fontSize: '18px' }}>{allPayments.reason}</td>
                                        <td style={{ fontSize: '18px' }}>{allPayments.status}</td>
                                        <td>
                                            <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => Reject(allPayments._id)}>
                                                <MDBIcon fas icon="times-circle" />
                                            </MDBBtn>
                                            <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => Accept(allPayments._id)}>
                                                <MDBIcon fas icon="edit" />
                                            </MDBBtn>
                                            <MDBBtn size='sm' className="shadow-0" color='dark' onClick={() => View(
                                                allPayments._id,
                                                allPayments.accountHold,
                                                allPayments.cardNumber,
                                                allPayments.expireDate,
                                                allPayments.ccv,
                                                allPayments.paymentMethod,
                                                allPayments.reason,
                                                allPayments.Amount,
                                                allPayments.userName,
                                                allPayments.paymentTitle,
                                                allPayments.status
                                            )}>
                                                <MDBIcon fas icon="eye" />
                                            </MDBBtn>
                                            <MDBBtn size='sm' className="shadow-0" color='danger' outline onClick={() => DeletePay(allPayments._id)}>
                                                <MDBIcon fas icon="trash" />
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentDashboard;
