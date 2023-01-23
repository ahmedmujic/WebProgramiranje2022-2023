import { useEffect, useState, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import PostCard from '../components/PostCard';
import axios from "axios"

function MyPosts() {
    const [postsState, setPostsState] = useState([]);
    const [postTitleState, setPostTitleState] = useState('');
    const [postTextState, setPostTextState] = useState('');
    const [postTextTouchedState, setPostTextTouchedState] = useState(false);
    const [postTitleTouchedState, setPostTitleTouchedState] = useState(false);

    const isTextEmpty = postTextState === '';
    const isTitleEmpty = postTitleState === '';

    useEffect(() => {
        fetchPosts()
    }, [])

    const onSomethingChanged = (data) =>{
        console.log(data)
    }

    const fetchPosts = () => {
        axios.get("http://localhost:3001/api/posts", {
            headers: {
                'access-token': `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response => {
            setPostsState(response.data)
        })
    }

    const handleTitle = (event) => {
        setPostTitleState(event.target.value)
    }

    const handleText = (event) => {
        setPostTextState(event.target.value)
    }

    const addPosts = (event) => {
        event.preventDefault();
        if (!isTextEmpty && !isTitleEmpty) {
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
        } else {
            toast.error("Form is invalid.")
        }
    }

    const validateText = (event) => {
        setPostTextTouchedState(true);
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <ToastContainer />
                <div className="w-75 d-flex justify-content-center">
                    <form onSubmit={addPosts}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="title-error" onChange={handleTitle} onBlur={() => { setPostTitleTouchedState(true) }} />
                            {
                                isTitleEmpty && postTitleTouchedState ?
                                    <div id="text-error" className="invalid-feedback d-block">
                                        Title field is required.
                                    </div>
                                    : <></>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className="form-label">text</label>
                            <input type="text" className="form-control" id="text" aria-describedby="text-error" onChange={handleText} onBlur={validateText} />
                            {
                                isTextEmpty && postTextTouchedState ?
                                    <div id="text-error" className="invalid-feedback d-block">
                                        Text field is required.
                                    </div>
                                    : <></>
                            }
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            <div>

                <h1>Posts</h1>
                <div className="container">
                    <div className="row">
                        {postsState.map(data => {
                            return (
                                <PostCard key={data.id} title={data.title} text={data.text} onSomethingChange={onSomethingChanged} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}



export default MyPosts