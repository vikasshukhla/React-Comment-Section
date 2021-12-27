import Comment from "./Comment";

const DisplayComment = ({ comments, onDelete, onAdd, onEdit }) => {
  return (
    <div>
      {comments
        .filter(({ responseTo }) => responseTo === null)
        .map((comment) => {
          return (
            <>
              <div key={comment.id}>
                <Comment
                  comment={comment}
                  onDelete={onDelete}
                  onAdd={onAdd}
                  onEdit={onEdit}
                />
              </div>
              <div style={{ paddingLeft: 50 }}>
                {comments
                  .filter(
                    ({ responseTo }) =>
                      responseTo !== null && responseTo === comment.id
                  )
                  .map((comment) => (
                    <>
                      <div key={comment.id} style={{ marginLeft: 5 }}>
                        <Comment
                          comment={comment}
                          onDelete={onDelete}
                          onEdit={onEdit}
                        />
                      </div>
                    </>
                  ))}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default DisplayComment;
