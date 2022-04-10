import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Form, Image, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Comment from "./components/comment";
import axios from "axios";

function App() {
  const [appState, setAppState] = useState({
    userId: 0,
    userAvatarPath: "",
    newComment: "",
    comments: [],
  });

  useEffect(() => {
    axios.post("http://localhost:5000/user/randomlyPickOneUser").then((res) => {
      const user = res.data;
      axios
        .post("http://localhost:5000/comment/getComments", {
          userId: user.id,
          onlyRootComments: false,
        })
        .then((comments_res) => {
          const comments = comments_res.data;
          setAppState({
            userId: user.id,
            userAvatarPath: user.avatarPath,
            newComment: appState.newComment,
            comments: comments,
          });
        });
    });
  }, []);

  const updateNewComment = (event) => {
    setAppState({
      userId: appState.userId,
      userAvatarPath: appState.userAvatarPath,
      comments: appState.comments,
      newComment: event.target.value,
    });
  };

  const comment = () => {
    axios
      .post("http://localhost:5000/comment/createComment", {
        content: appState.newComment,
        authorId: appState.userId,
      })
      .then((res) => {
        axios
          .post("http://localhost:5000/comment/getComments", {
            userId: appState.userId,
            onlyRootComments: false,
          })
          .then((comments_res) => {
            const comments = comments_res.data;
            setAppState({
              userId: appState.userId,
              userAvatarPath: appState.userAvatarPath,
              newComment: "",
              comments: comments,
            });
          });
      });
  };

  const findComment = (commentId, comments) => {
    for (let comment of comments) {
      if (comment.id === commentId) return comment;

      for (let childComment of comment.descents) {
        if (childComment.id === commentId) return childComment;
      }
    }
  };

  const upvote = (commentId) => {
    axios
      .post("http://localhost:5000/user/upvote", {
        userId: appState.userId,
        commentId: commentId,
      })
      .then(() => {
        const copy = { ...appState };
        let commentInCopy = findComment(commentId, copy.comments);
        commentInCopy.upvoted = true;
        setAppState(copy);
      });
  };

  const downvote = (commentId) => {
    axios
      .post("http://localhost:5000/user/downvote", {
        userId: appState.userId,
        commentId: commentId,
      })
      .then(() => {
        const copy = { ...appState };
        const commentInCopy = findComment(commentId, copy.comments);
        commentInCopy.upvoted = false;
        setAppState(copy);
      });
  };

  return (
    <Container>
      <h4>Discussion</h4>
      <Form>
        <div id="new_comment_div" className="d-flex justify-content-between">
          <Image
            src={appState.userAvatarPath}
            className="rounded-circle"
            alt="Avatar"
          />
          <div>
            <input
              className="form-control"
              placeholder="what are your thoughts?"
              value={appState.newComment}
              id="new_comment_input"
              onChange={updateNewComment}
            />
          </div>
          <Button id="comment_btn" onClick={comment}>
            Comment
          </Button>
        </div>
      </Form>
      <hr />
      <React.Fragment>
        {appState.comments.map((c) => (
          <Comment
            key={c.id.toString()}
            userId={appState.userId}
            id={c.id}
            content={c.content}
            authorName={c.authorName}
            authorAvatarPath={c.authorAvatarPath}
            createTimefromNow={c.timeFromNow}
            descents={c.descents}
            upvoted={c.upvoted}
            parentDownvote={downvote}
            parentUpvote={upvote}
          />
        ))}
      </React.Fragment>
    </Container>
  );
}

export default App;
