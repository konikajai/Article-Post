import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleArticle = () => {

    const [data, setdata] = useState([])

    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:5000/articles/${id}`)
            .then(response => {
                console.log(response)
                setdata(response.data)
                // console.log(data);
            })
            .catch(error => console.log(error))
    }, [])

    // const article = data.filter((item) => item.id === id)
    // console.log(article);

    return (
        <>
            <div>SingleArticle Page</div>
                <div key={id} className='col' >
                    <div class="card" style={{ width: '18rem', height: '20rem' }}>
                        <img src={data.image} class="card-img-top" alt="image" />
                        <div class="card-body">
                            <h5 class="card-title">{data.heading}</h5>
                            <p class="card-text">{data.content}</p>
                        </div>
                        <div class="card-body">
                            <a href="#" class="card-link">Read more</a>
                            <h5>{data.date}</h5>
                        </div>
                    </div>
                </div>
            <div>
                <textarea className='w-50 h-50'>

                </textarea>
            </div>
        </>
    )
}

export default SingleArticle