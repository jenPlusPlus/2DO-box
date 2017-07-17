$('.idea-input-save-button').on('click', function(e) {
  e.preventDefault();
  $('.bottom').prepend(`
    <article class="idea-box">
      <div class="idea-box-top-line">
        <h2 class="idea-box-header">Example Idea One</h2>
        <img class="idea-box-delete-button icon" src="images/delete.svg" alt="delete button" />
      </div>
      <p class="idea-box-text">Lorem Khaled Ipsum is a major key to success. Special cloth alert. Surround yourself with angels. Celebrate </p>
      <div class="idea-box-bottom-line">
        <img class="idea-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
        <img class="idea-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
        <p class="idea-box-quality">quality:<span class="idea-box-quality-value">swill</span></p>
      </div>
    </article>
    `);
})
