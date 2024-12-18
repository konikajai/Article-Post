import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const token = localStorage.getItem('token');
  const email = token?.split('-')[1];
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // const handleSaveArticle = async (articleId) => {
  //   try {
  //     if (!token || !email) {
  //       alert('You need to log in to save articles.');
  //       navigate('/login');
  //       return;
  //     }

  //     const userResponse = await axios.get(http://localhost:5002/users?email=${email});
  //     const users = userResponse.data;

  //     if (users.length === 0) {
  //       alert('User not found. Please log in again.');
  //       return;
  //     }

  //     const user = users[0];
  //     const savedArticles = user.savedArticles || [];

  //     if (!savedArticles.some(article => article.id === articleId)) {
  //       const articleToSave = articles.find(article => article.id === articleId);
  //       savedArticles.push(articleToSave);

  //       const updateResponse = await axios.put(http://localhost:5002/users/${user.id}, {
  //         ...user,
  //         savedArticles,
  //       });

  //       if (updateResponse.status === 200) {
  //         alert('Article saved successfully!');
  //       } else {
  //         alert('Error saving article.');
  //       }
  //     } else {
  //       alert('This article is already saved.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving article:', error);
  //     alert('Error saving article. Please try again.');
  //   }
  // };

  const handleSaveArticle = async (articleId) => {
    try {
      if (!token || !email) {
        alert('You need to log in to save articles.');
        navigate('/login');
        return;
      }
  
      const userResponse = await axios.get(`http://localhost:5002/users?email=${email}`);
      const users = userResponse.data;
  
      if (users.length === 0) {
        alert('User not found. Please log in again.');
        return;
      }
  
      const user = users[0];
      const savedArticles = user.savedArticles || [];
  
      // Check if the article is already saved by id
      if (!savedArticles.includes(articleId)) {
        savedArticles.push(articleId); // Only save the article ID, not the whole object
  
        const updateResponse = await axios.put(`http://localhost:5002/users/${user.id}`, {
          ...user,
          savedArticles,
        });
  
        if (updateResponse.status === 200) {
          alert('Article saved successfully!');
        } else {
          alert('Error saving article.');
        }
      } else {
        alert('This article is already saved.');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
    }
  };
  
  return (
    <div>
      {token ? (
        <div>
          <h2>Welcome, {email}</h2>
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}

      <h1 className="text-center p-5">Latest Jobs</h1>
      <div className="container">
        <div className="row gap-5">
          {articles.map((article) => (
            <div key={article.id} className="col">
              <div className="card" style={{ width: '20rem', height: '35rem' }}>
                <NavLink to={`/SingleArticle/${article.id}`}>
                  <img src={article.image} className="card-img-top" alt={article.heading} />
                  <div className="card-body">
                    <h5 className="card-title">{article.heading}</h5>
                    <p className="card-text">{article.content}</p>
                  </div>
                  <div className="card-body">
                    <a href="#" className="card-link">Read more</a>
                    <h5>{article.date}</h5>
                  </div>
                </NavLink>
                <div className="card-body">
                  <button onClick={() => handleSaveArticle(article.id)}>
                    <i className="fa-solid fa-heart"></i> Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;