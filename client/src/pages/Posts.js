import { useEffect, useState, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"

function Posts() {
    const [postsState, setPostsState] = useState([]);
    const [postTitleState, setPostTitleState] = useState();
    const [postTextState, setPostTextState] = useState();

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        axios.get("http://localhost:3001/api/posts")
            .then(response => {
                setPostsState(response.data)
            })
    }
    // const listPosts = () => {
    //     let posts;

    //     if(postsState){
    //         postsState.forEach(post => {
    //             console.log(post)
    //             posts += <p>{post.title}</p>
    //         });
    //     }
    //     console.log(posts)
    //     return posts;
    // }

    const handleTitle = (event) => {
        setPostTitleState(event.target.value)
    }

    const handleText = (event) => {
        setPostTextState(event.target.value)
    }

    const addPosts = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/api/posts",
            {
                text: postTextState,
                title: postTitleState
            },
            {
                headers: {
                    'access-token': `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        ).then(response => {
            fetchPosts();
        })
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <ToastContainer />
                <div className="w-75 d-flex justify-content-center">
                    <form onSubmit={addPosts}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={handleTitle} />
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">text</label>
                            <input type="text" className="form-control" id="text" onChange={handleText} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            <div>
                <h1>Posts</h1>
                {postsState.map(data => {
                    return <p key={data.id}>{data.title}</p>
                })}
            </div>
        </>
    )
}



export default Posts