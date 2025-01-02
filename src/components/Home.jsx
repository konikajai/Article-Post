import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const email = token?.split('-')[1];
  const navigate = useNavigate();

  const showMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        console.log(`Fetching page ${page}...`);

        const response = await axios.get(`http://localhost:5000/articles?_page=${page}&_per_page=6`);

        console.log('API Response:', response.data.data);

        setArticles((prevArticles) => [...prevArticles, ...response.data.data]);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

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

      if (!savedArticles.includes(articleId)) {

        const updatedSavedArticles = [...savedArticles, articleId]

        const updateResponse = await axios.put(`http://localhost:5002/users/${user.id}`, {
          ...user,
          savedArticles: updatedSavedArticles,
        });

        if (updateResponse.status === 200) {
          alert('Article saved successfully!');
        }
        else {
          alert('Error saving article.');
        }
      } 
      else {
        alert('This article is already saved.');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
    }
  };

  return (
    <>
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

      <div className="d-flex justify-content-center m-5">
        <button onClick={showMoreArticles} type="button" className="btn btn-primary px-3 fs-3" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </>
  );
};

export default Home;
