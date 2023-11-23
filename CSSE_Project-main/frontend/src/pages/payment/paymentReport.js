import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import Navbar from "../adminNav";

function FeedbackReport() {
  const [allOrderPayment, setAllOrderPayment] = useState([]);
  const [allOrderADVERTISEMENT, setAllOrderADVERTISEMENT] = useState([]);
  const [allOrderBooking, setAllOrderBooking] = useState([]);

  // Fetch data and update state for all payment types
  useEffect(() => {
    // Define an API URL (consider using process.env or configuration for better organization)
    const API_URL = global.APIUrl;

    // Fetch Order Payment data
    axios.get(`${API_URL}/payment/allOrderOrderPayment`)
      .then((res) => setAllOrderPayment(res.data))
      .catch((error) => console.error(error));

    // Fetch Advertisement Payment data
    axios.get(`${API_URL}/payment/allOrderADVERTISEMENT`)
      .then((res) => setAllOrderADVERTISEMENT(res.data))
      .catch((error) => console.error(error));

    // Fetch Service Booking data
    axios.get(`${API_URL}/payment/allOrderBooking`)
      .then((res) => setAllOrderBooking(res.data))
      .catch((error) => console.error(error));
  }, []);

  // Calculate total amounts for each payment type
  const sumAllOrderPayment = allOrderPayment.reduce((prev, current) => prev + +current.Amount, 0);
  const sumAllOrderADVERTISEMENT = allOrderADVERTISEMENT.reduce((prev, current) => prev + +current.Amount, 0);
  const sumAllOrderBooking = allOrderBooking.reduce((prev, current) => prev + +current.Amount, 0);

  // Function to download the payment report as a PDF
  function pdfDownload() {
    const doc = new jsPDF();

    doc.setTextColor(254, 8, 8);
    doc.text(20, 20, 'Payment Report');
    doc.addFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(3, 3, 3);
    doc.text(25, 40, `Total Payments: RS.${sumAllOrderPayment + sumAllOrderADVERTISEMENT + sumAllOrderBooking}`);
    doc.text(25, 50, `Total Order Ordering Payments: RS.${sumAllOrderPayment}`);
    doc.text(25, 60, `Total Advertisement Payments: RS.${sumAllOrderADVERTISEMENT}`);
    doc.text(25, 70, `Total Service Booking Payments: RS.${sumAllOrderBooking}`);
    doc.save('Booking Report.pdf');
  }

  return (
    <div className="dashboard-main-wrapper">
      <Navbar />
      <div className="dashboard-wrapper">
        <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
          <h4 className="text-uppercase d-letter-spacing fw-bold" style={{ color: 'black' }}>
            <i className="fas fa-home" /> Admin Dashboard
          </h4>
          <hr />
          <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
            <center>
              <h2 className="text-uppercase text-black">Payment Report</h2>
            </center>
            <div className="text-end mt-5">
              <a href="PaymentDashboard">
                <MDBBtn className='btn-sm' style={{ fontSize: '15px', fontWeight: '100', letterSpacing: '2px' }} color='dark'>
                  Back
                </MDBBtn>
              </a>
              &nbsp;&nbsp;&nbsp;
              <MDBBtn className='btn-sm' onClick={pdfDownload} style={{ fontSize: '15px', fontWeight: '100', letterSpacing: '2px' }} color='danger'>
                Download
              </MDBBtn>
            </div>
            <MDBRow className="mt-4" id="summery">
              {/* Your summary cards here */}
            </MDBRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackReport;
