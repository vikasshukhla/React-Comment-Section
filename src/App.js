import { useState, useEffect } from "react";
import AddComment from "./components/AddComment";
import DisplayComment from "./components/DisplayComment";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  //fetch Comments

  const fetchComments = async () => {
    await fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((res) => setComments([...res]))
      .catch((err) => console.log(err));
  };
  
  //Add Comments

  const addComment = async (commentDetail) => {
    const { name, comment, commentId } = commentDetail;
    const data = {
      name,
      comment,
      createdAt: new Date(),
      responseTo: commentId || null,
    };
    const res = await fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const finalData = await res.json();
    setComments([...comments, finalData]);
  };


  const editComment = async (updatedComment) => {

    const id = updatedComment.id;
    const res = await fetch(`http://localhost:5000/comments/${id}`,{
      method: "PATCH",
      headers:{
        "Content-type": "application/json",
      },
      body: JSON.stringify({comment:updatedComment.commentText})
    })
    const commentData = await res.json();
    console.log(commentData);
    // const commentData = [...comments];
    // commentData.forEach((comment) => {
    //   if (comment.id === updatedComment.id) {
    //     comment.comment = updatedComment.commentText;
    //   }
    // });
    setComments([...commentData]);
  };

  const deleteComment = async (id) => {
    const commentToDelete = [id,...comments.filter(({responseTo})=>responseTo===id).map(({id})=>id)];

    for(let i=0 ;i<commentToDelete.length; i++){
      const id = commentToDelete[i];
      console.log(id);
      await fetch(`http://localhost:5000/comments/${id}`, {
      method: "DELETE",
    });
    }
    
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="container">
      <AddComment onAdd={addComment} />
      <DisplayComment
        comments={comments}
        onDelete={deleteComment}
        onAdd={addComment}
        onEdit={editComment}
      />
    </div>
  );
};

export default App;
