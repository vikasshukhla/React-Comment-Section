import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "./Button";
import AddComment from "./AddComment";

const Comment = ({ comment, onDelete, onAdd, onEdit }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [commentText, setCommentText] = useState("");

  const closeCommentBox = () => {
    setShowReplyBox(false);
  };

  const handleIsEdit = () => {
    if (isEdit) {
      if (!commentText) {
        alert("Please Enter Comment !");
        return;
      }
      onEdit({ id: comment.id, commentText });
      setIsEdit(false);
    } else {
      setIsEdit(true);
      setCommentText(comment.comment);
    }
  };

  return (
    <>
      <div className="task">
        <h4>
          {comment.name}
          <p>{new Date(comment.createdAt).toDateString()}</p>
        </h4>
        {isEdit ? (
          <input
            style={{ height: 75, width: "100%", fontSize: "17px" }}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></input>
        ) : (
          <p className="close-Button">
            {comment.comment}{" "}
          </p>
        )}
        {comment.responseTo === null && !isEdit ? (
          <Button text="Reply" onClick={() => setShowReplyBox(!showReplyBox)} />
        ) : (
          ""
        )}
        <FaTimes className="Fatimes-button"
            style={{ color: "grey", cursor: "pointer" }}
            onClick={() => onDelete(comment.id)}
        />
        <Button text={isEdit ? "Post" : "Edit"} onClick={handleIsEdit} />
        {isEdit && <Button text="Cancel" onClick={() => setIsEdit(false)} />}
      </div>
      <div style={{ paddingLeft: 50 }}>
        {showReplyBox && (
          <AddComment
            onAdd={onAdd}
            commentId={comment.id}
            closeCommentBox={closeCommentBox}
          />
        )}
      </div>
    </>
  );
};

export default Comment;
