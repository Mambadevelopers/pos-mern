import React, { useEffect, useState, useRef } from 'react'
import DefaultLayout from '../components/DefaultLayout';
import { Button, Modal, Table} from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { EyeOutlined} from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import ReactToPrint from 'react-to-print';


const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
 

  const getAllBills = async() => {
    try {
      dispatch({
        type: 'SHOW_LOADING'
      })
      const {data} = await axios.get('http://localhost:8080/api/bills/get-bills')
      setBillsData(data);
      dispatch({type: "HIDE_LOADING"})
      console.log('====================================');
      console.log(data);
      console.log('====================================');
    } catch (error) {
      dispatch({type: "HIDE_LOADING"});
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    };
  };

  //UseEffect
useEffect(() => {
  getAllBills();
  //eslint-disable-next-line
}, []);

//Print function
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});




  //Table data
  const columns = [
    {title: 'ID', dataIndex: '_id'},
    {title: 'Customer Name', dataIndex: 'customerName', 
  },
    {title: 'Contact No', dataIndex: 'customerContact'},
    {title: 'Subtotal', dataIndex: 'subTotal'},
    {title: 'Total Amount', dataIndex: 'totalAmount'},
    {title: 'Tax', dataIndex: 'tax'},

    {title: 'Actions', 
    dataIndex: "_id", 
    render:(id,record) => (
    <div>
      <EyeOutlined style={{cursor: 'pointer'}}
      onClick={() => {
        setSelectedBill(record);
        setPopupModal(true);
      }}
      />
    </div>
    ),
  },
  ];
console.log('====================================');
console.log(selectedBill);
console.log('====================================');

  return (
    <DefaultLayout>
    <div className='d-flex justify-content-between'>
    <h1>Invoice List</h1>
    </div>
    <Table columns={columns} dataSource={billsData} bordered/>

    {
      popupModal && (
        <Modal 
        width={400}
        pagination={false}
        title="Invoice Details"
        visible={popupModal}
        onCancel={() => {
          setPopupModal(false)
        }}
        footer={false}
        >
          {/**=====Invoice modal start===== */}
          <div id='invoice-POS' ref={componentRef}>
            <center id='top'>
              <div className='logo'/>
              <div className='info'>
                <h2>MAMBA POS-APP</h2>
                <p>Contact : 1234567 | Nicosia Cyprus</p>
              </div>
              {/**End of Info */}
            </center>
            {/** ====End of Invoice====== */}
            <div id='mid'>
              <div className='mt-2'>
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerContact}</b>
                  <br />
                  Date : <b>{selectedBill.date}</b>
                  <br />
                </p>
                <hr style={{margin: '5px'}}/>
              </div>
            </div>
            {/** ===End of Invoice===== */}
            <div id='bot'>
              <div id='table'>
                <table>
                  <tbody>
                    <tr className='tabletitle'>
                      <td className='item'>
                        <h2>Item</h2>
                      </td>
                      <td className='Hours'>
                        <h2>Qty</h2>
                      </td>
                      <td className='Rate'>
                        <h2>Price</h2>
                      </td>
                      <td className='Rate'>
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                      <tr className='service'>
                        <td className='tableitem'>
                          <p className='itemtext'>{item.name}</p>
                        </td>
                        <td className='tableitem'>
                          <p className='itemtext'>{item.quantity}</p>
                        </td>
                        <td className='tableitem'>
                          <p className='itemtext'>{item.price}</p>
                        </td>
                        <td className='tableitem'>
                          <p className='itemtext'>{item.quantity * item.price}</p>
                        </td>
                      </tr>
                      </>
                    ))}
                    <tr className='tabletitle'>
                      <td />
                      <td />
                      <td className='Rate'>
                        <h2>tax</h2>
                      </td>
                      <td className='payment'>
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>

                    <tr className='tabletitle'>
                      <td />
                      <td />
                      <td className='Rate'>
                        <h2>Grand Total</h2>
                      </td>
                      <td className='payment'>
                        <h2>${selectedBill.totalAmount}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/**====End of Table */}
              <div className='legalcopy'>
                <p className='legal'>
                  <strong>Thank you for your order!</strong>
                  10% GST application on the total amount. 
                  Please note that this is non refundable
                  amount, for any assistance please contact us 
                  using the email below
                  <b>techmamba97@outlook.com</b>
                </p>
              </div>
            </div>
            {/**End of InvoiceBot */}
          </div>
            {/**End of Invoice */}
            <div className='d-flex justify-content-end align-items-end'>
            <button type='primary' onClick={handlePrint}>Print</button>
            </div>
            {/**Invoice model ends here */}
        </Modal>
      )
    }
  </DefaultLayout>
  );
};

export default BillsPage;
