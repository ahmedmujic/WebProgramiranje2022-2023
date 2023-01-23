import { useEffect, useState } from "react";
import PostCard from '../components/PostCard';
import axios from "axios"

function Home() {
  const [postsState, setPostsState] = useState([]);

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = () => {
    axios.get("http://localhost:3001/api/posts/all", {
      headers: {
        'access-token': `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then(response => {
        setPostsState(response.data)
      })
  }

  return (
    <div className="container">
      <div className="row">
        {postsState.map(data => {
          return (
            <PostCard key={data.id} title={data.title} text={data.text} />
          )
        })}
      </div>
    </div>
  );
}

export default Home;
