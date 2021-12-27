import { useState } from "react";

const AddComment = ({onAdd, commentId, closeCommentBox}) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');


    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(commentId);
        if(!name){
            alert('Please Enter Name!');
            return;
        }
        if(!comment){
            alert('Please Enter Comment!');
            return;
        }
        onAdd({name, comment, commentId});
        
        if(commentId){
            closeCommentBox();
        }

        setName('');
        setComment('');

    }
    return (
        <div className="form-section">
            <h3>Comment</h3>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <input 
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div className="form-control form-control-comment">
                    <input 
                        type="text"
                        placeholder="Comment"
                        value={comment}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                </div>
                <input type="submit" value="POST" className="btn btn-block"/>
            </form>
        </div>
    )
}

export default AddComment
