// List all posts
const PostList = (props) =>{
    // if there are no posts
    if(props.posts.length === 0){
        return(
            <div className="post">
                <h3>No posts yet</h3>
            </div>
        );
    }

    // set up post
    const postNodes = props.posts.map(function(post){
        // append id's to thr url's 
        const postURL = "/showPost?postID=" + post._id;
        const userURL = "/showUser?user=" + post.createdBy;
        return (
            <div key={post._id} className="post">
                <h3 className="postTitle"><b>{post.title}</b></h3>
                <h5 className="postCreator">Created by: <a className="userLink" href={userURL}>{post.createdBy}</a></h5>
                <p className="postDesc"><i>{post.description}</i></p>
                <a className="postLink" href={postURL}>Read more...</a>
            </div>
        )
    });

    // return the posts
    return (
        <div className="postList">
            {postNodes}
        </div>
    )
}; 

// loads all the posts from the server
const loadPostsFromServer = (csrf) =>{
    sendAjax('GET', '/getPosts', null, (data) =>{
        ReactDOM.render(
            <PostList posts={data.posts} csrf={csrf} id={data.userID}/>, document.querySelector("#content")
        );
    });
};


// set up method called after page loads
const setup = (csrf) => {
    ReactDOM.render(
        <PostList posts={[]} csrf={csrf} id={-1}/>, document.querySelector("#content")
    );

    // load and render the posts from the server
    loadPostsFromServer(csrf);
};
