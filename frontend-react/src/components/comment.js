import { Image } from "react-bootstrap";
import React from "react";

const Comment = (props) => {
  const {
    userId,
    id,
    content,
    authorName,
    authorAvatarPath,
    createTimefromNow,
    descents,
    upvoted,
    parentDownvote,
    parentUpvote,
  } = props;

  const upvote = () => {
    parentUpvote(id);
  };

  const downvote = () => {
    parentDownvote(id);
  };

  return (
    <div
      className={`${
        descents && descents.length > 0
          ? "with_child_comments"
          : "with_no_child_comments"
      }`}
    >
      <div className="comment_div d-flex">
        <Image src={authorAvatarPath} className="rounded-circle" alt="Avatar" />
        <div className="comment_content_div">
          <div className="comment_author_row d-flex">
            <b>{authorName}</b>
            <div>&bull;</div>
            <p>{createTimefromNow}</p>
          </div>
          <div className="content_div">{content}</div>
          <div className="upvote_row d-flex">
            {upvoted ? (
              <div className="triangle-up upvoted" />
            ) : (
              <div className="triangle-up notUpvoted" />
            )}
            {upvoted ? (
              <p onClick={downvote}>Downvote</p>
            ) : (
              <p onClick={upvote}>Upvote</p>
            )}
            <p>Reply</p>
          </div>
        </div>
      </div>
      {descents && descents.length > 0 ? (
        <div className="child_comments_div">
          {descents.map((d) => (
            <Comment
              id={d.id}
              userId={userId}
              content={d.content}
              authorName={d.authorName}
              authorAvatarPath={d.authorAvatarPath}
              createTimefromNow={d.timeFromNow}
              descents={d.descents}
              upvoted={d.upvoted}
              parentDownvote={parentDownvote}
              parentUpvote={parentUpvote}
            />
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Comment;
