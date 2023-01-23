function PostCard({title, text, onSomethingChange}) {

    return <div  className="card px-0 col-4 mx-2" style={{ width: "18rem" }}>
        <img src="https://cdn.pixabay.com/photo/2021/05/22/10/11/fishing-boat-6273132_960_720.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <button className="btn btn-primary" onClick={() => onSomethingChange('test')}>Send Child Data</button>
        </div>
    </div>
}


export default PostCard;