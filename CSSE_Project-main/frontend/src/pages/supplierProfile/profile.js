import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';

function SupplierProfile() {
  // State variables
  const [AllPeddingReqs, setAllPeddingReqs] = useState([]);
  const [AllReject, setAllReject] = useState([]);
  const [AllAccept, setAllAccept] = useState([]);
  const [AllSend, setAllSend] = useState([]);
  const [CompleteService, setAllServiceComplete] = useState([]);

  useEffect(() => {
    // Fetch pending requests
    axios.get("http://localhost:5000/stockReq/pending")
      .then(res => setAllPeddingReqs(res.data))
      .catch(error => console.log('Error fetching pending requests:', error));

    // Fetch rejected requests
    axios.get("http://localhost:5000/stockReq/reqReject")
      .then(res => setAllReject(res.data))
      .catch(error => console.log('Error fetching rejected requests:', error));

    // Fetch accepted requests
    axios.get("http://localhost:5000/stockReq/reqAccept")
      .then(res => setAllAccept(res.data))
      .catch(error => console.log('Error fetching accepted requests:', error));

    // Fetch sent requests
    axios.get("http://localhost:5000/stockReq/reqSend")
      .then(res => setAllSend(res.data))
      .catch(error => console.log('Error fetching sent requests:', error));

    // Fetch completed service requests
    axios.get("http://localhost:5000/stockReq/reqComplete")
      .then(res => setAllServiceComplete(res.data))
      .catch(error => console.log('Error fetching completed service requests:', error));
  }, []);

  function complete(id) {
    const status = "Shipped";
    const statusUpdate = { status };

    axios.put("http://localhost:5000/stockReq/statusUpdate/" + id, statusUpdate)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Status Updated!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"
        }).then(okay => {
          if (okay.isConfirmed) {
            window.location.href = "/supplierpro";
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Status Not Updated!",
          icon: 'error',
          confirmButtonText: "OK",
          type: "error"
        });
      });
  }

  return (
    <Layout>
      <div className="dashboard-main-wrapper">
        <div className="dashboard-wrapper">
          <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
            <h4 className="text-uppercase d-letter-spacing fw-bold" style={{ color: 'black' }}><i class="fas fa-home"></i>Supplier Dashboard</h4>
            <hr />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
              <center>
                <h2 className="text-uppercase text-black">Orders</h2>
              </center>
            </div>
            <br />
            <br />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '1%', paddingBottom: '2%', paddingRight: '5%' }}>
              <h5 className='mt-5' id="Accept">Accepted Request</h5>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Item Name</h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}> Email</h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}> Phone</h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Supplier </h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Date </h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Time </h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Status</h6></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {AllAccept.map((Accept, key) => (
                    <tr className="bg-light">
                      <td style={{ fontSize: '18px' }} key={Accept._id}>{Accept.name}</td>
                      <td style={{ fontSize: '18px' }} key={Accept._id}>{Accept.email}</td>
                      <td style={{ fontSize: '18px' }} key={Accept._id}>{Accept.telephone1}</td>
                      <td style={{ fontSize: '18px' }} key={Accept._id}>{Accept.supplier}</td>
                      <td style={{ fontSize: '18px' }} key={Accept._id}>{Accept.Date}</td>
                      <td style={{ fontSize: '18px' }} key={Accept._id}>{Accept.Time}</td>
                      <td>
                        <MDBBtn size='sm' className="shadow-0" color='success' onClick={() => complete(Accept._id)}>Shipped</MDBBtn>{''}&nbsp;&nbsp;
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <br />
            <br />
            <br />
            <div>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Item Name</h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}> Email</h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}> Phone</h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Supplier </h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Date </h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Time </h6></th>
                    <th scope='col'><h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>Status</h6></th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {AllSend.map((Sends, key) => (
                    <tr className="bg-light">
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.name}</td>
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.email}</td>
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.telephone1}</td>
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.supplier}</td>
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.Date}</td>
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.Time}</td>
                      <td style={{ fontSize: '18px' }} key={Sends._id}>{Sends.status}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SupplierProfile;
