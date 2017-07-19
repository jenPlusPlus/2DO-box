var globalArray = [];

$(function () {
  loadSavedIdeas();
});

function Idea() {
  this.id = 0;
  this.title = 0;
  this.body = 0;
  this.quality = 'swill';
}

// http://www.frontcoded.com/javascript-create-unique-ids.html
Idea.prototype.generateID = function() {
  this.id = '' + Math.random().toString(36).substr(2,16);
};

Idea.prototype.setQuality = function() {
  // some logic
  // this.quality = 'genius';
  // // some other logic
  // this.quality = 'plausible';
};



function loadSavedIdeas (){

  if (localStorage.getItem('globalArray') !== null){

    var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
    var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

    for(var i = 0; i < parsedGlobalArray.length; i++) {
      createBox(parsedGlobalArray[i]);
    }
  }
}

// SAVE BUTTON EVENT LISTENER
$('.idea-input-save-button').on('click', function(e) {
  e.preventDefault();

  var ideaInputTitle = $('.idea-input-title').val();
  var ideaInputBody = $('.idea-input-body').val();
  var newIdea = new Idea();

  newIdea.generateID();
  newIdea.title = ideaInputTitle;
  newIdea.body = ideaInputBody;

  createBox(newIdea);

  globalArray.push(newIdea);
  window.localStorage.setItem('globalArray', JSON.stringify(globalArray));

  $('.idea-input-title').val('');
  $('.idea-input-body').val('');

  $('.idea-input-title').focus();
});

function createBox (idea) {
  $('.bottom').prepend(`
    <article class="idea-box">
      <div class="idea-box-top-line">
        <h2 class="idea-box-header">${idea.title}</h2>
        <img class="idea-box-delete-button icon" src="images/delete.svg" alt="delete button" />
      </div>
      <p class="idea-box-text">${idea.body}</p>
      <div class="idea-box-bottom-line">
        <img class="idea-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
        <img class="idea-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
        <p class="idea-box-quality">quality:<span class="idea-box-quality-value">swill</span></p>
      </div>
    </article>
    `);
}

// DELETE BUTTON EVENT LISTENER

$('.bottom').on('click', '.idea-box-delete-button', function(e){
  e.preventDefault();

  var key = ;
  localStorage.removeItem();
  $(this).closest('article').remove();
});
