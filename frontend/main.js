$(function () {
  $.post("http://localhost:5000/user/randomlyPickOneUser", function (data) {
    // randomly gets a user, set the avatar
    var userAvatarPath = data.avatarPath;
    var userAvatar = $("#new_comment_div img");
    userAvatar.attr("src", userAvatarPath);
    var userIdInput = $("#user_id");
    userIdInput.val(data.id);
    console.log(`This time, you are ${data.name}!`);

    // get comments
    $.post(
      "http://localhost:5000/comment/getComments",
      {
        userId: data.id,
        onlyRootComments: true,
      },
      function (comments) {
        var container = $(".container")[0];
        for (var index = 0; index < comments.length; index++) {
          var comment = comments[index];
          var upvoteHtml = comment.upvoted
            ? '<p click="downvote();">Downvote</p>\n'
            : '<p click="upvote();">Upvote</p>\n';
          var upvoteTriangleClass = comment.upvoted ? "upvoted" : "notUpvoted";
          container.insertAdjacentHTML(
            "beforeend",
            '<div class="comment_div d-flex">\n' +
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
              '<div clsss="content_div">\n' +
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
      }
    );
  });
});

function upvote() {}

function downvote() {}

function comment() {}
