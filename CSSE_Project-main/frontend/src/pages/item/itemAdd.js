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
import Layout from '../../components/Layout';

function ItemAdd() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageSelected, setImageSelected] = useState('');

  // Variable to store items
  const [items, setItems] = useState([]);

  // Fetch items from the server
  useEffect(() => {
    axios
      .get('http://localhost:5000/itemadd/allItems')
      .then((res) => setItems(res.data))
      .catch((error) => console.log(error));
  }, []);

  // Function to save a new item
  function Save(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'ml_default');

    axios
      .post('https://api.cloudinary.com/v1_1/dnomnqmne/image/upload', formData)
      .then((response) => {
        console.log(imageSelected);
        const image = imageSelected.name;

        const addItem = { name, date, price, brand, description, quantity, image };

        axios
          .post('http://localhost:5000/itemadd/addItem', addItem)
          .then(() => {
            Swal.fire({
              title: 'Success!',
              text: 'Item Added!',
              icon: 'success',
              confirmButtonText: 'OK',
              type: 'success',
            }).then((okay) => {
              if (okay) {
                window.location.href = '/itemadd';
              }
            });
          })
          .catch((err) => {
            Swal.fire({
              title: 'Error!',
              text: 'Item Not Added!',
              icon: 'error',
              confirmButtonText: 'OK',
              type: 'success',
            });
          });
      });
  }

  // Function to remove an item
  function remove(id) {
    axios
      .delete('http://localhost:5000/itemadd/deleteItem/' + id)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Item Deleted',
          icon: 'success',
          confirmButtonText: 'OK',
          type: 'success',
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Item Not Deleted',
          icon: 'error',
          confirmButtonText: 'OK',
          type: 'success',
        });
      });
  }

  // Function to edit an item
  function edit(_id, name, price, brand, quantity, image) {
    reactLocalStorage.setObject('items_local', [_id, name, price, brand, quantity, image]);
    window.location.href = '/itemedit';
  }

  // Function to search for items
  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/itemadd/search/${key}`);
      result = await result.json();

      if (result) {
        setItems(result);
      }
    } else {
      let result = await fetch(`http://localhost:5000/itemadd/allItems`);
      result = await result.json();
      if (result) {
        setItems(result);
      }
    }
  };

  return (
    <Layout>
      <div className="dashboard-main-wrapper">
        <div className="dashboard-wrapper">
          <div style={{ paddingTop: '3%', paddingLeft: '2%', width: '98%' }}>
            <h4 className="text-uppercase  d-letter-spacing fw-bold" style={{ color: 'black' }}>
              <i class="fas fa-home"></i>Admin Dashboard
            </h4>
            <hr />
            <div className="container-fluid bg-white" style={{ paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', paddingRight: '5%' }}>
              <center>
                <h3 className="text-uppercase">Item Management</h3>
              </center>
              <MDBRow className="mt-3">
                <MDBCol sm="5">
                  <MDBCard className="shadow-0">
                    <MDBCardBody id="divToPrint">
                      <div class="mb-3 mt-4">
                        <h6>Search Items</h6>
                        <MDBInput className="mt-3 bg-white" id="form1" type="text" placeholder="Search Locations" onChange={searchHandle} />
                      </div>
                      <MDBTable borderless className="mt-3">
                        <MDBTableHead>
                          <tr className="bg-dark">
                            <th scope="col" className="text-white d-letter-spacing h6">
                              Item Name
                            </th>
                            <th scope="col" className="text-white d-letter-spacing h6 text-center">
                              Action
                            </th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {items.map((item, key) => (
                            <tr className="bg-light" key={item._id}>
                              <td>
                                <h6>{item.name}</h6>
                              </td>
                              <td className="text-center">
                                <MDBBtn size="sm" className="shadow-0" color="danger" onClick={() => remove(item._id)}>
                                  <MDBIcon fas icon="trash-alt" />
                                </MDBBtn>
                                &nbsp;&nbsp;
                                <MDBBtn size="sm" className="shadow-0" color="success" onClick={() => edit(item._id, item.name, item.price, item.brand, item.quantity, item.image)}>
                                  <MDBIcon fas icon="edit" />
                                </MDBBtn>
                                &nbsp;&nbsp;
                              </td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="1"></MDBCol>
                <MDBCol sm="6">
                  <MDBCard className="shadow-0">
                    <MDBCardBody className="bg-light">
                      <center>
                        <h4>Add New Items</h4>
                      </center>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Item Name
                        </label>
                        <input type="text" class="form-control" placeholder="Enter Item Name" onChange={(e) => {
                            setName(e.target.value);
                          }} />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Date
                        </label>
                        <input type="text" class="form-control" placeholder="Enter date" onChange={(e) => {
                            setDate(e.target.value);
                          }} />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Price
                        </label>
                        <input type="text" class="form-control" placeholder="Enter Price" onChange={(e) => {
                            setPrice(e.target.value);
                          }} />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Brand
                        </label>
                        <input type="text" class="form-control" placeholder="Enter Brand" onChange={(e) => {
                            setBrand(e.target.value);
                          }} />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Description
                        </label>
                        <input type="text" class="form-control" placeholder="Enter Description" onChange={(e) => {
                            setDescription(e.target.value);
                          }} />
                      </div>
                      <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Quantity
                        </label>
                        <input type="text" class="form-control" placeholder="Enter Quantity" onChange={(e) => {
                            setQuantity(e.target.value);
                          }} />
                      </div>
                      <div className="mb-3">
                        <label for="exampleFormControlInput1" class="form-label h6">
                          Item Image
                        </label>
                        <input type="file" onChange={(e) => {
                            setImageSelected(e.target.files[0]);
                          }} class="form-control" id="customFile" />
                      </div>
                      <div className="text-end">
                        <button type="button" class="btn btn-success d-letter-spacing " onClick={Save}>
                          Save
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <a href="/brandandstockDas">
                          <MDBBtn className="btn-sm" outline style={{ fontSize: '15px', fontWeight: '500', letterSpacing: '2px' }} color="dark">
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
    </Layout>
  );
}

export default ItemAdd;
