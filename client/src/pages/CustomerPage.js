import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Table } from 'antd';

const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();

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


  //Table data
  const columns = [
    {title: 'ID', dataIndex: '_id'},
    {title: 'Customer Name', dataIndex: 'customerName', 
  },
    {title: 'Contact No', dataIndex: 'customerContact'},
  ];
  
  return (
    <DefaultLayout>
      Customer Page
      <Table columns={columns} dataSource={billsData} bordered pagination={false}/>
    </DefaultLayout>
  )
}

export default CustomerPage
