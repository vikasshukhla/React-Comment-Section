import { useState, useEffect } from "react";
import {FaSortAmountUp,FaSortAmountDownAlt} from "react-icons/fa";
import AddComment from "./components/AddComment";
import DisplayComment from "./components/DisplayComment";

const App = () => {
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState('desc');

  useEffect(() => {
    fetchComments();
  }, []);
    

  const handleSort=(sorting)=>{
    const finalCommentsAfterSort = [...comments];
    if(sorting === 'asc'){
      finalCommentsAfterSort.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime());
    }
    if(sorting === 'desc'){
      finalCommentsAfterSort.sort((a,b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setSortBy(sorting);
    setComments(finalCommentsAfterSort);
  }

  //fetch Comments

  const fetchComments = async () => {
    await fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((res) => setComments([...res].sort((a,b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())))
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

  //Edit Comment

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

    const allComments = [...comments];
    for(let comment of allComments){
      if (comment.id === id) {
        comment.comment = commentData.comment;
      }
    }
    setComments(allComments); 

  };

  // Delete Comment

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
      <div className="sort">
        Sort By: Date and Time &nbsp;
        {sortBy!=='asc' ? <FaSortAmountDownAlt onClick={()=>handleSort('asc')}/>:
        <FaSortAmountUp onClick={()=>handleSort('desc')}/>}
      </div>
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
