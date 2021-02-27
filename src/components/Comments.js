import React, { useState } from "react";
import "./Comments.css";

const CommentActions = ({
  parent,
  setParent,
  currentParent,
  showThread,
  thread,
  setThread,
  setMessage,
  user,
}) => {
  const selectedParent = parent === currentParent;
  const selectedThread = thread.includes(currentParent);

  return (
    <div>
      <div>
        {!selectedParent && (
          <span
            className="reply"
            onClick={event => {
              setParent(currentParent);
              setMessage(`@${user.username} `);
            }}
          >
            reply
          </span>
        )}
        <br />
        {!selectedThread && (
          <span
            className="comments"
            onClick={() => setThread(state => [...state, currentParent])}
          >
            show replies
          </span>
        )}
      </div>
    </div>
  );
};

const Comments = ({ allComments, handleSave }) => {
  const [message, setMessage] = useState("");
  const [parent, setParent] = useState(null);
  const [thread, setThread] = useState([]);

  const renderComments = comments => {
    const formattedComments = comments.map((comment, key) => {
      const { _id, parent, message, user } = comment;
      if (!parent) {
        const nestedComments = allComments
          .filter(child => child.parent === _id)
          .map(child => ({
            ...child,
            parent: null,
          }));
        const showThread = nestedComments.length > 0;

        return (
          <div key={key}>
            <div className="commenter-name">{user.username}</div>
            <p>{message}</p>
            <br />
            <CommentActions
              parent={parent}
              setParent={setParent}
              currentParent={_id}
              showThread={showThread}
              thread={thread}
              setThread={setThread}
              user={user}
              setMessage={setMessage}
            />
            <br />
            {thread.includes(_id) && (
              <div className="child-comments">
                {renderComments(nestedComments)}
              </div>
            )}
          </div>
        );
      }
      return null;
    });

    return <>{formattedComments}</>;
  };

  return (
    <div>
      {renderComments(allComments)}
      <div id="message-row">
        <input
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          placeholder="Enter your message"
        />
        <button
          type="submit"
          id="send-button"
          onClick={event => {
            event.preventDefault();
            handleSave({
              message,
              parent,
            });
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Comments;
