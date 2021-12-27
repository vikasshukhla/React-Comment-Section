import { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import Button from "./Button";
import AddComment from "./AddComment";

const Comment = ({comment, onDelete, onAdd, onEdit}) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [commentText, setCommentText] = useState('');

    const closeCommentBox=()=>{
        setShowReplyBox(false);
    }

    const handleIsEdit=()=>{
        if(isEdit){
            onEdit({id:comment.id, commentText});
            setIsEdit(false);
        }
        else{
            setIsEdit(true);
            setCommentText(comment.comment);
        }   
    }

    return (
        <>
            <div className="task">
                <p>{JSON.stringify(new Date(comment.createdAt))}</p>
                <h4>{comment.name}
                <FaTimes 
                    style={{color: 'grey', cursor: 'pointer'}}
                    onClick={() => onDelete(comment.id)}
                />
                </h4>
                {isEdit?<input type='text' value={commentText} onChange={(e)=>setCommentText(e.target.value)}></input>:<p>{comment.comment}</p>}
                {comment.responseTo === null && !isEdit ? <Button text='Reply' onClick={()=>setShowReplyBox(!showReplyBox)}/>: ''}
                <Button text={isEdit?'Post':'Edit'} onClick={handleIsEdit}/>
                {isEdit && <Button text='Cancel' onClick={()=>setIsEdit(false)}/>}
            </div>
            <div style={{paddingLeft:30}}>
                {showReplyBox && <AddComment onAdd={onAdd} commentId={comment.id} closeCommentBox={closeCommentBox}/>}
            </div>  
        </>
    )
}

export default Comment
