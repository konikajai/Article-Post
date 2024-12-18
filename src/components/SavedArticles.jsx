import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');
  const email = token?.split('-')[1];
  const navigate = useNavigate();

  const postsPerPage = 3;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPost = savedArticles.slice(firstPostIndex, lastPostIndex);
  const totalPosts = savedArticles.length;
  const pages = Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, i) => i + 1);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        if (!token || !email) {
          alert('You need to log in to view saved articles.');
          navigate('/login');
          return;
        }

        // Fetch user by email to get savedArticleIds
        const userResponse = await axios.get(`http://localhost:5002/users?email=${email}`);
        const users = userResponse.data;

        if (users.length === 0) {
          alert('User not found. Please log in again.');
          return;
        }

        const user = users[0];
        const savedArticleIds = user.savedArticles || [];
        console.log(savedArticleIds);
        

        if (savedArticleIds.length > 0) {
          let articlesArray = [];

          for (let i = 0; i < savedArticleIds.length; i++) {
            const articleResponse = await axios.get(`http://localhost:5000/articles/${savedArticleIds[i]}`);
            console.log(articleResponse);           
            articlesArray.push(articleResponse.data);
            console.log(articlesArray);         
          }

          setSavedArticles(articlesArray);
        } else {
          alert('You have no saved articles.');
        }
      } catch (error) {
        console.error('Error fetching saved articles:', error);
        alert('Error fetching saved articles.');
      }
    };

    fetchSavedArticles();
  }, [email, token, navigate]);

  return (
    <>
      <div>
        <h2>Saved Articles</h2>
        {savedArticles.length === 0 ? (
          <p>No saved articles found.</p>
        ) : (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {currentPost.map((article, index) => (
                <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
                  <div className="card" style={{ width: '23rem', height: '30rem' }}>
                    <img src={article.image} className="card-img-top" alt="article" />
                    <div className="card-body">
                      <h5 className="card-title">{article.heading}</h5>
                      <p className="card-text">{article.content}</p>
                    </div>
                    <div className="card-body">
                      <a href="#" className="card-link">Read more</a>
                      <h5>{article.date}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="d-flex justify-content-center mx-auto">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className="btn btn-dark mx-1 px-3"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedArticles;
