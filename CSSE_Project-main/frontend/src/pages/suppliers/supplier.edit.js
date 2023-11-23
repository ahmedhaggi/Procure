import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import NavBar from '../../components/navbar';

function SupplierEdit() {
    // Retrieve data from local storage
    var service_center = reactLocalStorage.getObject('service_center');
    const id = service_center[0];

    const [name, setName] = useState(service_center[1]);
    const [email, setEmail] = useState(service_center[2]);
    const [telephone1, setTelephoneOne] = useState(service_center[3]);
    const [address, setiAddress] = useState(service_center[4]);

    // Email validation status and email address format
    const [isValidCFpassword, setIsValidCfpassword] = useState(false);
    const [emailStatus, setemailStatus] = useState('');

    // Validate email address and set emailStatus and isValidCFpassword
    function set_Email(e) {
        const email_pre = e;
        var atposition = email_pre.indexOf('@');
        var dotposition = email_pre.lastIndexOf('.');
        if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email_pre.length) {
            setemailStatus('Invalid Email');
            setIsValidCfpassword(false);
        } else {
            setIsValidCfpassword(true);
            setemailStatus('Valid Email');
        }
        setEmail(e);
    }

    // Handle edit operation and update supplier data
    function Edit(e) {
        e.preventDefault();
        const SupplierUp = { name, email, telephone1, address };

        axios.put(`http://localhost:5000/supplier/supllierUpdate/${id}`, SupplierUp)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Supplier data Updated!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    type: 'success'
                }).then(okay => {
                    if (okay) {
                        window.location.href = '/supplier_add';
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Supplier data Not Updated!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    type: 'error'
                });
            });
    }

    return (
        <div className="dashboard-main-wrapper">
            <NavBar />
            <div className="dashboard-wrapper">
                <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
                    <h4 className="text-uppercase d-letter-spacing fw-bold" style={{ color: 'black' }}>
                        <i className="fas fa-home"></i>Admin Dashboard
                    </h4>
                    <hr />
                    <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
                        <center>
                            <h3 className="text-uppercase">Edit Supplier Details</h3>
                        </center>
                        <MDBRow className="mt-3">
                            <MDBCol sm="6">
                                <MDBCard className="shadow-0">
                                    <MDBCardBody className="bg-light">
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label h6">Supplier Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Location"
                                                value={name}
                                                onChange={e => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label h6">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={e => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                            <span
                                                style={{ fontSize: '12px', margin: '0px', padding: '0px' }}
                                                className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`}>
                                                {emailStatus}
                                            </span>
                                        </div>

                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label h6">Telephone Number 1</label>
                                            <NumberFormat
                                                format="0## ### ####"
                                                className="form-control"
                                                placeholder="0## ### ## ##"
                                                value={telephone1}
                                                onChange={e => {
                                                    setTelephoneOne(e.target.value);
                                                }}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label h6">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Address"
                                                value={address}
                                                onChange={e => {
                                                    setiAddress(e.target.value);
                                                }}
                                            />
                                        </div>

                                        <div className="text-end">
                                            <button type="button" className="btn btn-dark d-letter-spacing " onClick={Edit}>
                                                Edit
                                            </button>
                                            <a href="/supplier_add">
                                                <MDBBtn
                                                    className="btn-sm"
                                                    outline
                                                    style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }}
                                                    color="dark">
                                                    Back
                                                </MDBBtn>
                                            </a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupplierEdit;
