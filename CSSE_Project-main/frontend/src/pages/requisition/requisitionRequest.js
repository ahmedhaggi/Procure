import React, { useState, useEffect } from 'react';
import {
  MDBIcon
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';

import Layout from '../../components/Layout.js';
import { useSelector } from 'react-redux';

function RequisitionReq() {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone1, setPhone] = useState("");
  const [supplier, setSupplier] = useState("");
  const [Date, setDate] = useState("");
  const [Time, setTime] = useState("");
  const [Quantity, setQuantity] = useState("");

  const { user } = useSelector((state) => state.user);
  const userName = user?.name;

  // Fetch suppliers data
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/supplier/allSuppliers")
      .then(res => setSuppliers(res.data))
      .catch(error => console.log('Error fetching suppliers:', error));
  }, []);

  // Fetch user's requests
  const [yourrequests, setYourrequests] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/stockReq/allreqests/${userName}`)
      .then(res => setYourrequests(res.data))
      .catch(error => console.log('Error fetching user requests:', error));
  }, [userName]);

  // Function to save a new request
  function save(e) {
    e.preventDefault();

    const request = { name, email, telephone1, supplier, Date, Time, userName, Quantity };

    axios.post("http://localhost:5000/stockReq/addreqest", request)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "stockReq send Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
        }).then(okay => {
          if (okay.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "stockReq send not Success",
          icon: 'error',
          confirmButtonText: "OK",
          type: "error"
        });
      });
  }

  // Function to remove a request
  function remove(id) {
    axios.delete(`http://localhost:5000/stockReq/deleteReq/${id}`)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Request Deleted",
          icon: 'success',
          confirmButtonText: "OK",
          confirmButtonColor: '#8a0a0a',
          type: "success"
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Request Not Deleted",
          icon: 'error',
          confirmButtonText: "OK",
          confirmButtonColor: '#8a0a0a',
          type: "error"
        });
      });
  }

  // Function to validate email format
  const [isValidCFpassword, setIsValidCfpassword] = useState(false);
  const [emailStatus, setemailStatus] = useState('');

  function set_Email(e) {
    const email_pre = e;
    var atposition = email_pre.indexOf("@");
    var dotposition = email_pre.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email_pre.length) {
      setemailStatus('InValid Email');
      setIsValidCfpassword(false);
    } else {
      setIsValidCfpassword(true);
      setemailStatus('Valid Email');
    }

    setEmail(e);
  }

  // Function to edit a request
  function edit(_id, name, email, telephone1, supplier, Date, Time) {
    reactLocalStorage.setObject("BookingEdit", [_id, name, email, telephone1, supplier, Date, Time]);
    window.location.href = "/requisition_req_edit";
  }

  return (
    <Layout>
      <div>
        <div className='bg-image'>
          <img src='https://img.freepik.com/free-vector/customer-online-review-rating-feedback-set_124507-8052.jpg?size=626&ext=jpg' className='img-fluid' alt='Sample' />
          <div className='mask' style={{ backgroundColor: '#292929' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <p className='text-white h1 mb-0 text-uppercase' style={{ fontSize: '55px', letterSpacing: '2px' }}>Request send</p>
            </div>
          </div>
        </div>
        <br />
        <br />
        <center>
          <div className="row container-fluid" style={{ marginTop: '7%', marginBottom: '26%' }}>
            <div className="col-sm-8">
              <div className="card shadow-0 bg-light">
                <div className="card-body text-left">
                  <center>
                    <h4 className="mt-4">Your Requests</h4>
                  </center>
                  <table className="table">
                    <thead>
                      <tr className="bg-dark">
                        <th scope="col" className="text-white d-letter-spacing h6">Name</th>
                        <th scope="col" className="text-white d-letter-spacing h6">Date</th>
                        <th scope="col" className="text-white d-letter-spacing h6">Supplier</th>
                        <th scope="col" className="text-white d-letter-spacing h6">Time</th>
                        <th scope="col" className="text-white d-letter-spacing h6">Status</th>
                        <th scope="col" className="text-white d-letter-spacing h6">Edit Your Booking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yourrequests.map((yourrequest, key) => (
                        <tr key={key}>
                          <td style={{ fontSize: '18px' }}>{yourrequest.name}</td>
                          <td style={{ fontSize: '18px' }}>{yourrequest.Date}</td>
                          <td style={{ fontSize: '18px' }}>{yourrequest.supplier}</td>
                          <td style={{ fontSize: '18px' }}>{yourrequest.Time}</td>
                          <td style={{ fontSize: '18px' }}>{yourrequest.status}</td>
                          <td style={{ fontSize: '18px' }}>
                            <button type="button" className="btn btn-dark btn-sm d-letter-spacing shadow-0" onClick={() => edit(
                              yourrequest._id,
                              yourrequest.name, yourrequest.email, yourrequest.telephone1, yourrequest.supplier, yourrequest.Date, yourrequest.Time, yourrequest.status
                            )}>
                              <MDBIcon fas icon="edit" />
                            </button>
                            <button type="button" className="btn btn-danger d-letter-spacing" style={{ fontSize: "14px" }} onClick={() => remove(yourrequest._id)}>
                              Cancel Request
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card shadow-0 bg-light">
                <div className="card-body text-left">
                  <center>
                    <h4 className="mt-4">Add New Request</h4>
                  </center>
                  <div className="mb-3">
                    <label className="form-label h5">Name</label>
                    <input type="text" className="form-control" onChange={(e) => {
                      setName(e.target.value);
                    }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label h5">Suppliers</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => {
                      setSupplier(e.target.value);
                    }}>
                      <option selected>Select Supplier</option>
                      {suppliers.map((Supplier1, key) => (
                        <option value={Supplier1.name}>{Supplier1.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label h5">Email</label>
                    <input type="email" className="form-control" onChange={(e) => {
                      set_Email(e.target.value);
                    }} />
                    <span style={{ fontSize: '12px', margin: '0px', padding: '0px' }} className={`messageCfpassword ${isValidCFpassword ? 'success' : 'error'}`}>
                      {emailStatus}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label h5">Phone Number</label>
                    <NumberFormat format="0## ### ####" className="form-control" placeholder="071 192 9098" onChange={(e) => {
                      setPhone(e.target.value);
                    }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label h5">Select Time</label>
                    <select className="form-select" aria-label="Default select example" onChange={(e) => {
                      setTime(e.target.value);
                    }}>
                      <option selected>Select Time:</option>
                      <option value="9am">9</option>
                      <option value="10am">10</option>
                      <option value="11am">11</option>
                      <option value="12am">12</option>
                      <option value="13pm">13</option>
                      <option value="14pm">14</option>
                      <option value="15pm">15</option>
                      <option value="16pm">16</option>
                      <option value="17pm">17</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label h5" style={{ fontSize: "20px" }}>Date</label>
                    <input type="date" className="form-control" style={{ fontSize: "17px" }} onChange={(e) => {
                      setDate(e.target.value);
                    }} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label h5">Quantity</label>
                    <input type="text" className="form-control" onChange={(e) => {
                      setQuantity(e.target.value);
                    }} />
                  </div>
                  <div className="mb-3 text-right">
                    <button type="button" className="btn btn-success d-letter-spacing" onClick={save}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </Layout>
  );
}

export default RequisitionReq;
