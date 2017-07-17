var state = [];

function Idea() {
  this.id = 0;
  this.title = 0;
  this.body = 0;
  this.quality = 'swill';
}

Idea.prototype.generateID = function() {
  this.id = 'id-' + Math.random().toString(36).substr(2,16);
}

Idea.prototype.setQuality = function() {
  // some logic
  // this.quality = 'genius';
  // // some other logic
  // this.quality = 'plausible';
}

// SAVE BUTTON EVENT LISTENER
$('.top').on('click', '.idea-input-save-button', function(e) {
  e.preventDefault();

  var ideaInputTitle = $('.idea-input-title').val();
  var ideaInputBody = $('.idea-input-body').val();
  var newIdea = new Idea();

  newIdea.generateID();
  newIdea.title = ideaInputTitle;
  newIdea.body = ideaInputBody;

  $('.bottom').prepend(`
    <article class="idea-box">
      <div class="idea-box-top-line">
        <h2 class="idea-box-header">${newIdea.title}</h2>
        <img class="idea-box-delete-button icon" src="images/delete.svg" alt="delete button" />
      </div>
      <p class="idea-box-text">${newIdea.body}</p>
      <div class="idea-box-bottom-line">
        <img class="idea-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
        <img class="idea-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
        <p class="idea-box-quality">quality:<span class="idea-box-quality-value">swill</span></p>
      </div>
    </article>
    `);

    state.push(newIdea);

    $('.idea-input-title').val('');
    $('.idea-input-body').val('');
})


// http://www.frontcoded.com/javascript-create-unique-ids.html
