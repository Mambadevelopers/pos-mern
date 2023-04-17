import React, { useEffect, useState } from 'react'
import DefaultLayout from "../components/DefaultLayout";
import axios from 'axios';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';
import { useDispatch } from 'react-redux';



const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('drinks');
  const categories = [
    {
      name: 'drink',
      imageUrl: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/drink.png'
    },
    {
      name: 'rice',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/3067/3067788.png'
    },
    {
      name: 'noodles',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/678/678935.png'
    }
  ]
  const dispatch = useDispatch();

  //UseEffect
  useEffect(() => {
    const getAllItems = async() => {
      try {
        dispatch({
          type: 'SHOW_LOADING'
        })
        const {data} = await axios.get('http://localhost:8080/api/items/get-item')
        setItemsData(data);
        dispatch({type: "HIDE_LOADING"})
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    };
    getAllItems();
  }, [dispatch]);

  return (
    <DefaultLayout>
      <div className='d-flex'>
        {categories.map((category) => (
          <div key={categories.name} 
          className={`d-flex category ${
            selectedCategory === category.name && 'category-active'
            }`}
            onClick={() => setSelectedCategory(category.name)}
            >
            <h4>{category.name}</h4>
            <img 
            src={category.imageUrl} 
            alt={category.name} 
            height="40" 
            width="60"
            />
          </div>
        ))}
      </div>
      <Row>
      {
        itemsData.filter((i) => i.category === selectedCategory).map(item => (
          <Col xs={24} lg={6} md={12} sm={6}>
          <ItemList key={item.id} item={item} />
          </Col>
        ))
      }
    </Row>
    </DefaultLayout>
  );
};

export default Homepage;
