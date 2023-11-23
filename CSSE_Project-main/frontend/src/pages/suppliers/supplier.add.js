import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reactLocalStorage } from 'reactjs-localstorage';
import NumberFormat from 'react-number-format';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Layout from '../../components/Layout';

function Supplier() {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone1, setTelephoneOne] = useState('');
  const [address, setiAddress] = useState('');

  const [emailStatus, setemailStatus] = useState('');

  function set_Email(e) {
    const email_pre = e;
    var atposition = email_pre.indexOf('@');
    var dotposition = email_pre.lastIndexOf('.');
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email_pre.length) {
      setemailStatus('InValid Email');
    } else {
      setemailStatus('Valid Email');
    }
    setEmail(e);
  }

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    // Fetch suppliers
    axios.get('http://localhost:5000/supplier/allSuppliers')
      .then((res) => setSuppliers(res.data))
      .catch((error) => console.log('Error fetching suppliers:', error));
  }, []);

  function Save(e) {
    e.preventDefault();

    const addSupplier = { name, email, telephone1, address };

    axios.post('http://localhost:5000/supplier/addNewSupplier', addSupplier)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Supplier Added!',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        }).then((okay) => {
          if (okay) {
            window.location.href = '/supplier_add';
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Supplier Not Added!',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  }

  function pdfDownload() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        pdf.setTextColor(254, 8, 8);
        pdf.text(20, 20, 'Supplier List');
        pdf.addImage(imgData, 'JPEG', 10, 10);
        pdf.save('supplier.pdf');
      });
  }

  function remove(id) {
    axios.delete(`http://localhost:5000/supplier/deleteSupplier/${id}`)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Supplier Deleted',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        }).then((okay) => {
          if (okay) {
            window.location.href = '/supplier_add';
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Supplier Not Deleted',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  }

  function edit(_id, name, email, telephone1, address) {
    reactLocalStorage.setObject('service_center', [_id, name, email, telephone1, address]);
    window.location.href = '/supplier_edit';
  }

  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/supplier/search/${key}`);
      result = await result.json();

      if (result) {
        setSuppliers(result);
      }
    } else {
      let result = await fetch(`http://localhost:5000/supplier/allSuppliers`);
      result = await result.json();
      if (result) {
        setSuppliers(result);
      }
    }
  };

  return (
    <Layout>
      <div class="dashboard-main-wrapper">
        <div class="dashboard-wrapper">
          <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
            <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Admin Dashboard</h4>
            <hr />
            <div class="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
              <center>
                <h3 className="text-uppercase">All Suppliers </h3>
              </center>
              <div class="alert alert-dark mt-3 mb-3 text-left" role="alert">
                <h5 className="text-uppercase" style={{ letterSpacing: '2px', textAlign: "left" }}>ALL Registered Suppliers: {suppliers.length}</h5>
              </div>
              <MDBRow className='mt-3'>
                <MDBCol sm='15'>
                  <MDBCard className='shadow-0'>
                    <MDBCardBody id="divToPrint">
                      <div className='text-end'>
                        <button type="button" class="btn btn-dark d-letter-spacing " onClick={pdfDownload}><MDBIcon fas icon="download" /></button>
                      </div>
                      <MDBBtn className='btn-sm' style={{ fontSize: '14px', fontWeight: 'light', letterSpacing: '2px' }} outline color='dark' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add New Supplier
                      </MDBBtn>
                      <div class="mb-3 mt-4">
                        <h6>Search Supplier</h6>
                        <MDBInput className="mt-3 bg-white" id='form1' type='text' placeholder="Search Supplier" onChange={searchHandle} />
                      </div>
                      <MDBTable borderless className='mt-3'>
                        <MDBTableHead>
                          <tr className="bg-dark">
                            <th scope='col' className="text-white d-letter-spacing h6">Name</th>
                            <th scope='col' className="text-white d-letter-spacing h6">email</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Telephone number</th>
                            <th scope='col' className="text-white d-letter-spacing h6">Address</th>
                            <th scope='col' className="text-white d-letter-spacing h6 text-center">Action</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {suppliers.map((supplier, key) => (
                            <tr className="bg-light" key={supplier._id}>
                              <td>
                                <h6>
                                  {supplier.name}
                                </h6>
                              </td>
                              <td>
                                <h6>
                                  {supplier.email}
                                </h6>
                              </td>
                              <td>
                                <h6>
                                  {supplier.telephone1}
                                </h6>
                              </td>
                              <td>
                                <h6>
                                  {supplier.address}
                                </h6>
                              </td>
                              <td className="text-center">
                                <MDBBtn size='sm' className="shadow-0" color='danger' onClick={() => remove(supplier._id)}><MDBIcon fas icon="trash-alt" /></MDBBtn>{' '}&nbsp;&nbsp;
                                <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => edit(supplier._id, supplier.name, supplier.email, supplier.telephone1, supplier.address)}><MDBIcon fas icon="edit" /></MDBBtn>{' '}&nbsp;&nbsp;
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          </div>
        </div>

        <div class="modal fade bg-light" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered  modal-xl">
            <div class="modal-content">
              <div class="modal-header bg-dark">
                <h3 class="modal-title text-white d-letter-spacing" id="staticBackdropLabel">Add New Supplier</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body  p-4">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="card shadow-0">
                      <div class="card-body text-start">
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label h6">Supplier Name</label>
                          <input type="text" class="form-control" placeholder="Enter Name" onChange={(e) => {
                            setName(e.target.value);
                          }} />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label h6">Email</label>
                          <input type="email" class="form-control" placeholder="Enter Email Address" onChange={(e) => {
                            set_Email(e.target.value);
                          }} />
                          <span style={{ fontSize: '12px', margin: '0px', padding: '0px' }} >
                            {emailStatus}
                          </span>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label h6">Telephone Number</label>
                          <NumberFormat format="0## ### ####" class="form-control" placeholder="0## ### ## ##" onChange={(e) => {
                            setTelephoneOne(e.target.value);
                          }} />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label h6">Address</label>
                          <input type="text" class="form-control" placeholder="Enter Address" onChange={(e) => {
                            setiAddress(e.target.value);
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="card shadow-0">
                      <div class="card-body text-start">
                        {/* Add content for the right column here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer border-0">
                <button type="button" class="btn btn-outline-dark" style={{ fontSize: "15px" }} data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success d-letter-spacing" onClick={Save}>Save</button>&nbsp;&nbsp;&nbsp;
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Supplier;
