import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SingleArticle = () => {
    const [data, setData] = useState({});
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const email = token?.split('-')[1];
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/articles/${id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token || !email) {
            alert('You need to log in to comment.');
            navigate('/login');
            return;
        }

        if (!comment.trim()) {
            alert('Comment cannot be empty.');
            return;
        }

        setLoading(true);

        try {
            const userResponse = await axios.get(`http://localhost:5002/users?email=${email}`);
            const users = userResponse.data;

            if (users.length === 0) {
                alert('User not found. Please log in again.');
                return;
            }

            const loggedInUser = users[0];
            console.log("Logged-in user:", loggedInUser);

            const commentsAPI = await axios.get(`http://localhost:5001/Comments`);
            const commentsData = commentsAPI.data;
            console.log("Before update:", commentsData);

            const userComments = commentsData.find(comment => comment.userid === loggedInUser.id);

            const newComment = {
                commentid: Date.now(),
                comment: comment
            };

            if (userComments) {
                const updatedComments = [...userComments.Comments, newComment];

                await axios.patch(`http://localhost:5001/Comments/${userComments.id}`, {
                    Comments: updatedComments,
                });

                console.log("Updated Comments JSON (PATCH):", {
                    ...userComments,
                    Comments: updatedComments
                });
            } else {
                const newEntry = {
                    userid: loggedInUser.id,
                    Comments: [newComment],
                };

                const postResponse = await axios.post(`http://localhost:5001/Comments`, newEntry);
                console.log("New entry added to Comments JSON (POST):", postResponse.data);
            }

            alert('Comment added successfully!');
            setComment('');
        } catch (error) {
            console.error('Error while adding comment:', error);
            alert('Failed to add the comment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>SingleArticle Page</div>
            <div key={id} className="col">
                <div className="card" style={{ width: '20rem', height: '28rem' }}>
                    <img src={data.image} className="card-img-top" alt="image" />
                    <div className="card-body">
                        <h5 className="card-title">{data.heading}</h5>
                        <p className="card-text">{data.content}</p>
                    </div>
                    <div className="card-body">
                        <a href="#" className="card-link">
                            Read more
                        </a>
                        <h5>{data.date}</h5>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={handleInputChange}
                    className="w-50 h-50 mt-5"
                    placeholder="Write your comment here..."
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding Comment...' : 'Add Comment'}
                </button>
            </form>
        </>
    );
};

export default SingleArticle;
