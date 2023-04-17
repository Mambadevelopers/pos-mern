import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {message} from 'antd';
import axios from 'axios';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      await axios.post('http://localhost:8080/api/users/register', value);
      message.success('Registered Successfully');
      navigate('/login')
      dispatch({type: "HIDE_LOADING"});

    } catch (error) {
      dispatch({type: "HIDE_LOADING"});
      message.error('Something Went Wrong');
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };

    //Current login user
    useEffect(() => {
      if(localStorage.getItem('auth')) {
        localStorage.getItem('auth');
        navigate('/');
      }
    }, [navigate]);




  return (
    <>
    <div className='register'>
      <div className='register-form'>
      <h1>MAMBA POS-APP</h1>
      <h3>Registration Page</h3>
      <Form 
          layout="vertical" 

          onFinish={handleSubmit}>
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='userId' label='User ID'>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password'/>
            </Form.Item>

    
          <div className='d-flex justify-content-between'>
            <p>
              Already Registered? Please
            <Link to='/login'>Login Here!</Link>
            </p>
            <Button type='primary' htmlType='submit'>Register</Button>
          </div>
          </Form>
    </div>
    </div>
    </>
  )
}

export default Register
