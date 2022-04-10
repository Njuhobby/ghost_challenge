$(function () {
  $.post("http://localhost:5000/user/randomlyPickOneUser", function (data) {
    // randomly gets a user, set the avatar
    var userAvatarPath = data.avatarPath;
    var userAvatar = $("#new_comment_div img");
    userAvatar.attr("src", userAvatarPath);
    var userIdInput = $("#user_id");
    userIdInput.val(data.id);
    console.log(`This time, you are ${data.name}!`);

    getComments(data.id);
  });
});

function getComments(userId) {
  $.ajax({
    url: "http://localhost:5000/comment/getComments",
    type: "POST",
    data: JSON.stringify({
      userId: userId,
      onlyRootComments: true,
    }),
    contentType: "application/json; charset=utf-8",
    success: function (comments) {
      var container = $(".container")[0];
      for (var index = 0; index < comments.length; index++) {
        var comment = comments[index];
        var upvoteHtml = comment.upvoted
          ? '<p onclick="downvote(this);">Downvote</p>\n'
          : '<p onclick="upvote(this);">Upvote</p>\n';
        var upvoteTriangleClass = comment.upvoted ? "upvoted" : "notUpvoted";
        container.insertAdjacentHTML(
          "beforeend",
          '<div class="comment_div d-flex">\n' +
            '<input type="hidden" class="comment_id" value="' +
            comment.id +
            '"/>\n' +
            '<img src="' +
            comment.authorAvatarPath +
            '" class="rounded-circle" alt="Avatar" />\n' +
            '<div class="comment_content_div">\n' +
            '<div class="comment_author_row d-flex">\n' +
            "<b>" +
            comment.authorName +
            "</b>\n" +
            "<div>&bull;</div>\n" +
            "<p>45 mins ago</p>\n" +
            "</div>\n" +
            '<div class="content_div">\n' +
            comment.content +
            "</div>\n" +
            '<div class="upvote_row d-flex">\n' +
            '<div class="triangle-up ' +
            upvoteTriangleClass +
            '"></div>\n' +
            upvoteHtml +
            "<p>Reply</p>\n" +
            "</div>\n" +
            "</div>\n" +
            "</div>"
        );
      }
    },
  });
}

function upvote(e) {
  var authorId = $("#user_id").val();
  var commentId = $(e).closest(".comment_div").children(".comment_id").val();
  var upvoteTriangle = $(e).siblings(".triangle-up");
  $.ajax({
    url: "http://localhost:5000/user/upvote",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      userId: parseInt(authorId),
      commentId: parseInt(commentId),
    }),
    success: function (data) {
      $(e).html("Downvote");
      $(e).attr("onclick", "downvote(this)");
      upvoteTriangle.removeClass("notUpvoted");
      upvoteTriangle.addClass("upvoted");
    },
  });
}

function downvote(e) {
  var authorId = $("#user_id").val();
  var commentId = $(e).closest(".comment_div").children(".comment_id").val();
  var upvoteTriangle = $(e).siblings(".triangle-up");
  $.ajax({
    url: "http://localhost:5000/user/downvote",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
      userId: parseInt(authorId),
      commentId: parseInt(commentId),
    }),
    success: function (data) {
      $(e).html("Upvote");
      $(e).attr("onclick", "upvote(this)");
      upvoteTriangle.removeClass("upvoted");
      upvoteTriangle.addClass("notUpvoted");
    },
  });
}

function comment() {
  var content = $("#new_comment_input").val();
  var authorId = $("#user_id").val();
  if (content && content.length > 0) {
    $.ajax({
      url: "http://localhost:5000/comment/createComment",
      type: "POST",
      data: JSON.stringify({
        content: content,
        authorId: parseInt(authorId),
      }),
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        $("#new_comment_input").val("");
        $(".comment_div").remove();
        getComments(parseInt(authorId));
      },
    });
  }
}
