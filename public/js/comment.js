const postId = document.querySelector('input[name="post-id"]').value;

const commentFormHandler = async (event) => {
  event.preventDefault();
  const comment = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  console.log(comment);

  if (comment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        postId: postId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

if (document.querySelector(".comment-form") != null) {
  document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);
}
