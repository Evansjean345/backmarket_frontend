import { useState, useEffect } from 'react';
import axios from 'axios';
import { createArticleUrl, getArticleUrl } from '../../url';

const OrderForm = () => {
  const [articles, setArticles] = useState([]);
  const [orderItems, setOrderItems] = useState([{ article: '', quantity: 1 }]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(getArticleUrl);
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(createArticleUrl, { articles: orderItems });
      alert('Order created');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleItemChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;
    setOrderItems(newOrderItems);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { article: '', quantity: 1 }]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border mb-4">
      {orderItems.map((item, index) => (
        <div key={index} className="mb-4">
          <select
            value={item.article}
            onChange={(e) => handleItemChange(index, 'article', e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Select Article</option>
            {articles.map((article) => (
              <option key={article._id} value={article._id}>
                {article.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            className="border p-2 w-full mt-2"
            min="1"
          />
        </div>
      ))}
      <button type="button" className="bg-green-500 text-white px-4 py-2" onClick={addOrderItem}>Add Item</button>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-4">Create Order</button>
    </form>
  );
};

export default OrderForm;
