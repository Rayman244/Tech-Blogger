const commentHandler = async (event) => {
    event.preventDefault();
  
    const blogId = document.querySelector('#blogId').innerHTML;
    const commentInfo = document.querySelector('#comment-field').value.trim();
    console.log({blogId});
    console.log({commentInfo});
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        commentInfo,
        blogId
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
    //   document.location.reload();
    console.log(response);
    } else {
      alert('Could not add comment.');
      console.log(err);
    }
  };
  
  document
    .querySelector('#commentForm')
    .addEventListener('submit', commentHandler);