import React, { useState, useEffect } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';
import jsPDF from 'jspdf';

function RequisitionDashboard() {
  const [AllPeddingReqs, setAllPeddingReqs] = useState([]);
  const [AllReject, setAllReject] = useState([]);
  const [AllAccept, setAllAccept] = useState([]);
  const [AllSend, setAllSend] = useState([]);
  const [CompleteService, setallServiceComplete] = useState([]);

  useEffect(() => {
    // Fetch pending requisitions
    axios
      .get('http://localhost:5000/stockReq/pending')
      .then((res) => setAllPeddingReqs(res.data))
      .catch((error) => console.error('Error fetching pending requisitions:', error));
  }, []);

  useEffect(() => {
    // Fetch rejected requisitions
    axios
      .get('http://localhost:5000/stockReq/reqReject')
      .then((res) => setAllReject(res.data))
      .catch((error) => console.error('Error fetching rejected requisitions:', error));
  }, []);

  useEffect(() => {
    // Fetch accepted requisitions
    axios
      .get('http://localhost:5000/stockReq/reqAccept')
      .then((res) => setAllAccept(res.data))
      .catch((error) => console.error('Error fetching accepted requisitions:', error));
  }, []);

  useEffect(() => {
    // Fetch sent requisitions
    axios
      .get('http://localhost:5000/stockReq/reqSend')
      .then((res) => setAllSend(res.data))
      .catch((error) => console.error('Error fetching sent requisitions:', error));
  }, []);

  useEffect(() => {
    // Fetch completed service requisitions
    axios
      .get('http://localhost:5000/stockReq/reqComplete')
      .then((res) => setallServiceComplete(res.data))
      .catch((error) => console.error('Error fetching completed service requisitions:', error));
  }, []);

  const accept = (id) => {
    const status = 'Accept';
    const statusUpdate = { status };
    axios
      .put(`http://localhost:5000/stockReq/statusUpdate/${id}`, statusUpdate)
      .then(() => {
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Status Updated!',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        }).then((okay) => {
          if (okay) {
            window.location.href = '/requisition_dash';
          }
        });
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Status Not Updated!',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  };

  const reject = (id) => {
    const status = 'Reject';
    const statusUpdate = { status };
    axios
      .put(`http://localhost:5000/stockReq/statusUpdate/${id}`, statusUpdate)
      .then(() => {
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Status Updated!',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        }).then((okay) => {
          if (okay) {
            window.location.href = '/requisition_dash';
          }
        });
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Status Not Updated!',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  };

  const complete = (id) => {
    const status = 'Complete';
    const statusUpdate = { status };
    axios
      .put(`http://localhost:5000/stockReq/statusUpdate/${id}`, statusUpdate)
      .then(() => {
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Status Updated!',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        }).then((okay) => {
          if (okay) {
            window.location.href = '/requisition_dash';
          }
        });
      })
      .catch((err) => {
        console.error('Error updating status:', err);
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Status Not Updated!',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  };

  const rejectDelete = (id) => {
    axios
      .delete(`http://localhost:5000/stockReq/deletereq/${id}`)
      .then(() => {
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Reject Booking Delete',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        });
      })
      .catch((err) => {
        console.error('Error deleting rejected booking:', err);
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'Reject Booking Not Deleted',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  };

  const pdfDownload = () => {
    var doc = new jsPDF();
    const name = 'Report';
    doc.setTextColor(254, 8, 8);
    doc.text(20, 20, name);
    doc.addFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(3, 3, 3);
    doc.text(25, 40, 'Total of shipped requisition requests: ' + AllSend.length);
    doc.text(25, 50, 'Total of accepted requisition requests: ' + AllAccept.length);
    doc.text(25, 60, 'Total of rejected requisition requests: ' + AllReject.length);

    doc.save(name + '.pdf');
  };

  return (
    <Layout>
      <div className="dashboard-main-wrapper">
        <div className="dashboard-wrapper">
          <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
            <h4 className="text-uppercase d-letter-spacing fw-bold" style={{ color: 'black' }}>
              <i class="fas fa-home"></i>Admin Dashboard
            </h4>
            <hr />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
              <center>
                <h2 className="text-uppercase text-black">REQUESTS</h2>
              </center>
              <div className="text-end mt-5">
                <a href="#Accept">
                  <MDBBtn className="btn-sm" style={{ fontSize: '13px', fontWeight: 'light' }} outline color="dark">
                    Accepted Requests
                  </MDBBtn>{' '}
                </a>
                <a href="#Reject">
                  <MDBBtn className="btn-sm" style={{ fontSize: '13px', fontWeight: 'light' }} outline color="danger">
                    Rejected Requests
                  </MDBBtn>{' '}
                </a>
                <a href="#Pending">
                  <MDBBtn className="btn-sm" style={{ fontSize: '13px', fontWeight: 'light' }} outline color="primary">
                    Pending Requests
                  </MDBBtn>{' '}
                </a>
                <a href="#Complete">
                  <MDBBtn className="btn-sm" style={{ fontSize: '13px', fontWeight: 'light' }} outline color="secondary">
                    Completed Requests
                  </MDBBtn>{' '}
                </a>
                <MDBBtn className="btn-sm" style={{ fontSize: '13px', fontWeight: 'light' }} color="dark" onClick={pdfDownload}>
                  All Request Report
                </MDBBtn>{' '}
              </div>
              <h5 className="mt-4" id="#Pending">
                Pending Request
              </h5>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Item Name
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Email
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Phone
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Supplier
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Date
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Time
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Quantity
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Status
                      </h6>
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {AllPeddingReqs.map((AllPeddingReq, key) => (
                    <tr className="bg-light" key={AllPeddingReq._id}>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.name}</td>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.email}</td>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.telephone1}</td>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.supplier}</td>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.Date}</td>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.Time}</td>
                      <td style={{ fontSize: '18px' }}>{AllPeddingReq.Quantity}</td>
                      <td>
                        <MDBBtn size="sm" className="shadow-0" color="danger" onClick={() => reject(AllPeddingReq._id)}>
                          <MDBIcon fas icon="minus-circle" />
                        </MDBBtn>
                        <MDBBtn size="sm" className="shadow-0" color="success" onClick={() => accept(AllPeddingReq._id)}>
                          <MDBIcon fas icon="plus-circle" />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <br />
            <br />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '1%', paddingBottom: '2%', paddingRight: '5%' }}>
              <h5 className="mt-5" id="Accept">
                Accepted Request
              </h5>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Item Name
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Email
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Phone
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Supplier
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Date
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Time
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Quantity
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Status
                      </h6>
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {AllAccept.map((Accept, key) => (
                    <tr className="bg-light" key={Accept._id}>
                      <td style={{ fontSize: '18px' }}>{Accept.name}</td>
                      <td style={{ fontSize: '18px' }}>{Accept.email}</td>
                      <td style={{ fontSize: '18px' }}>{Accept.telephone1}</td>
                      <td style={{ fontSize: '18px' }}>{Accept.supplier}</td>
                      <td style={{ fontSize: '18px' }}>{Accept.Date}</td>
                      <td style={{ fontSize: '18px' }}>{Accept.Time}</td>
                      <td style={{ fontSize: '18px' }}>{Accept.Quantity}</td>
                      <td>
                        <MDBBtn size="sm" className="shadow-0" color="success" onClick={() => complete(Accept._id)}>
                          COMPLETE
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <br />
            <br />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '1%', paddingBottom: '2%', paddingRight: '5%' }}>
              <h5 className="mt-5" id="Reject">
                Reject Request
              </h5>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Item Name
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Email
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Phone
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Supplier
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Date
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Time
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Quantity
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Status
                      </h6>
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {AllReject.map((Reject, key) => (
                    <tr className="bg-light" key={Reject._id}>
                      <td style={{ fontSize: '18px' }}>{Reject.name}</td>
                      <td style={{ fontSize: '18px' }}>{Reject.email}</td>
                      <td style={{ fontSize: '18px' }}>{Reject.telephone1}</td>
                      <td style={{ fontSize: '18px' }}>{Reject.supplier}</td>
                      <td style={{ fontSize: '18px' }}>{Reject.Date}</td>
                      <td style={{ fontSize: '18px' }}>{Reject.Time}</td>
                      <td style={{ fontSize: '18px' }}>{Reject.Quantity}</td>
                      <td>
                        <MDBBtn size="sm" className="shadow-0" color="danger" onClick={() => rejectDelete(Reject._id)}>
                          Delete
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <br />
            <br />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '1%', paddingBottom: '2%', paddingRight: '5%' }}>
              <h5 className="mt-5" id="Complete">
                Complete Request
              </h5>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Item Name
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Email
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Phone
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Supplier
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Date
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Time
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Quantity
                      </h6>
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {CompleteService.map((Complete, key) => (
                    <tr className="bg-light" key={Complete._id}>
                      <td style={{ fontSize: '18px' }}>{Complete.name}</td>
                      <td style={{ fontSize: '18px' }}>{Complete.email}</td>
                      <td style={{ fontSize: '18px' }}>{Complete.telephone1}</td>
                      <td style={{ fontSize: '18px' }}>{Complete.supplier}</td>
                      <td style={{ fontSize: '18px' }}>{Complete.Date}</td>
                      <td style={{ fontSize: '18px' }}>{Complete.Time}</td>
                      <td style={{ fontSize: '18px' }}>{Complete.Quantity}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <br />
            <br />
            <br />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '1%', paddingBottom: '2%', paddingRight: '5%' }}>
              <h5 className="mt-5" id="Reject">
                Shipped Request
              </h5>
              <MDBTable className="mt-2" hover>
                <MDBTableHead className="bg-dark">
                  <tr>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Item Name
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Email
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Phone
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Supplier
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Date
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Time
                      </h6>
                    </th>
                    <th scope="col">
                      <h6 className="text-white" style={{ fontWeight: '100', letterSpacing: '2px' }}>
                        Quantity
                      </h6>
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {AllSend.map((AllSended, key) => (
                    <tr className="bg-light" key={AllSended._id}>
                      <td style={{ fontSize: '18px' }}>{AllSended.name}</td>
                      <td style={{ fontSize: '18px' }}>{AllSended.email}</td>
                      <td style={{ fontSize: '18px' }}>{AllSended.telephone1}</td>
                      <td style={{ fontSize: '18px' }}>{AllSended.supplier}</td>
                      <td style={{ fontSize: '18px' }}>{AllSended.Date}</td>
                      <td style={{ fontSize: '18px' }}>{AllSended.Time}</td>
                      <td style={{ fontSize: '18px' }}>{AllSended.Quantity}</td>
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

export default RequisitionDashboard;
