// SAVE BUTTON EVENT LISTENER
$('.top').on('click', '.idea-input-save-button', function(e) {
  e.preventDefault();

  var ideaInputTitle = $('.idea-input-title').val();
  var ideaInputBody = $('.idea-input-body').val();

  $('.bottom').prepend(`
    <article class="idea-box">
      <div class="idea-box-top-line">
        <h2 class="idea-box-header">${ideaInputTitle}</h2>
        <img class="idea-box-delete-button icon" src="images/delete.svg" alt="delete button" />
      </div>
      <p class="idea-box-text">${ideaInputBody}</p>
      <div class="idea-box-bottom-line">
        <img class="idea-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
        <img class="idea-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
        <p class="idea-box-quality">quality:<span class="idea-box-quality-value">swill</span></p>
      </div>
    </article>
    `);

    $('.idea-input-title').val('');
    $('.idea-input-body').val('');
})
