import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const token = localStorage.getItem('token');
  const email = token?.split('-')[1];

  const [currentPage, setcurrentPage] = useState(1)

  const postsPerPage = 3;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPost = savedArticles.slice(firstPostIndex, lastPostIndex)
  const totalposts = savedArticles.length;
  const pages = []

  for (let i = 0; i < Math.ceil(totalposts / postsPerPage); i++) {
    pages.push(i)
    console.log(pages);

  }

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        if (!email) {
          alert('You need to log in to view saved articles.');
          return;
        }

        const response = await axios.get(`http://localhost:5002/users?email=${email}`);
        const user = response.data[0];

        if (user) {
          setSavedArticles(user.savedArticles || []);
        } else {
          console.log('User not found');
          alert('User not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching saved articles:', error);
        alert('Error fetching saved articles.');
      }
    };

    fetchSavedArticles();
  }, [email]);

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
                    {/* <div className="card-body">
                      <button>
                        <i className="fa-solid fa-heart"></i> UnSave
                      </button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <div className='d-flex justify-content-center mx-auto'>
          {pages.map((page, index) => (
            <button type="button" class="btn btn-dark mx-1 px-3" onClick={() => setcurrentPage(page + 1)}>{page}</button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedArticles;
