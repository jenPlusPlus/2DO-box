/*  ------------------------------------------------------

  ---------------------
  - TABLE OF CONTENTS -
  ---------------------

  - On Page Load
  - Event Listeners
    1. Input Field Event Listener
    2. Button Hover Event Listener
      * Delete
      * Upvote
      * Downvote
    3. Save Button Event Listener
    4. Search Bar Event Listener
    5. Delete Button Event Listener
    6. Upvote Event Listener
    7. Downvote Event Listener
    8. Title Edit Event Listener
    9. Body Edit Event Listener

  - Functions
    * createBox()
    * pushideaArrayToLocalStorage()
    * pullideaArrayFromLocalStorage()
    * loadSavedIdeas()

*/

// ON PAGE LOAD
// look at localStorage functions to avoid global array variable

// functions that still utilize global variable:
// SEARCH BAR EVENT LISTENER
// DELETE BUTTON EVENT LISTENER
// UPVOTE BUTTON EVENT LISTENER
// DOWNVOTE BUTTON EVENT LISTENER
// BODY EDIT EVENT LISTENER
// TITLE EDIT EVENT LISTENER

populateDom();

/* -------------------
   - EVENT LISTENERS -
   ------------------- */

   // make all of these named functions
   // can we combine into a single function??? (Jen)

// DISABLE SAVE BUTTON & INPUT FIELD EVENT LISTENERS
  $(".idea-input-save-button").attr("disabled", true);
  $(".idea-input-title").keyup(enableSaveButton);
  $(".idea-input-body").keyup(enableSaveButton);



// BUTTON HOVER EVENT LISTENER (on cards)
// better to do in css or named functions in JS??? (do research)
// move to function that creates cards??
// delete
$('.bottom').on('mouseover', '.idea-box-delete-button', deleteHoverOn);
$('.bottom').on('mouseleave', '.idea-box-delete-button', deleteHoverOff);

// upvote
$('.bottom').on('mouseover', '.idea-box-upvote-button', upvoteHoverOn);
$('.bottom').on('mouseleave', '.idea-box-upvote-button', upvoteHoverOff);

// downvote
$('.bottom').on('mouseover', '.idea-box-downvote-button', downvoteHoverOn);
$('.bottom').on('mouseleave', '.idea-box-downvote-button', downvoteHoverOff);



// SAVE BUTTON EVENT
$('.idea-input-save-button').on('click', saveInput);

// SEARCH BAR EVENT LISTENER
$('.search-bar-input').on('keyup', runSearch);

// DELETE BUTTON EVENT LISTENER
$('.bottom').on('click', '.idea-box-delete-button', deleteIdea);

// UPVOTE BUTTON EVENT LISTENER
$('.bottom').on('click','.idea-box-upvote-button', upvoteIdea);

// DOWNVOTE BUTTON EVENT LISTENER
$('.bottom').on('click','.idea-box-downvote-button', downvoteIdea);

// TITLE EDIT EVENT LISTENER


  //  ternary conditional??? (use html attribute instead)

function saveTitle(e) {
  e.preventDefault();
  var key = findCardKey(e);
  var idea = findObjectByKeyInLocalStorage(key);
  idea.title = $(e.target).closest('h2').text();
  saveToLocalStorage(idea);
}

function saveBody(e) {
  e.preventDefault();
  var key = findCardKey(e);
  var idea = findObjectByKeyInLocalStorage(key);
  idea.body = $(e.target).closest('.idea-box-text').text();
  saveToLocalStorage(idea);
}

// edit html more javasciprt friendly also edit html class names
// line 289 may need to change, if using array for quality
function createBox (idea) {
$('.bottom').prepend(`
  <article class="idea-box" data-id=${idea.id}>
    <div class="idea-box-top-line">
      <h2 class="idea-box-header" contenteditable=true>${idea.title}</h2>
      <img class="idea-box-delete-button icon" src="images/delete.svg" alt="delete button" />
    </div>
    <p class="idea-box-text" contenteditable=true>${idea.body}</p>
    <div class="idea-box-bottom-line">
      <img class="idea-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
      <img class="idea-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
      <p class="idea-box-quality">quality: <span class="idea-box-quality-value">swill</span></p>
    </div>
  </article>
  `);
  setQualityState(idea.id);
  $('[data-id='+idea.id+']').on("blur", "h2", saveTitle);
  $('[data-id='+idea.id+']').on("blur", ".idea-box-text", saveBody);

}
 function saveInput(e){
   e.preventDefault();

   var ideaInputTitle = $('.idea-input-title').val();
   var ideaInputBody = $('.idea-input-body').val();
   var newIdea = new Idea(ideaInputTitle, ideaInputBody);

   saveToLocalStorage(newIdea);
   createBox(newIdea);


  clearInputFields()
  focusOnTitle()
 }

 function enableSaveButton(e){
   if($(".idea-input-title").val() != "" && $(".idea-input-body").val() != ""){
     $(".idea-input-save-button").attr("disabled", false);
   }
 }

 function clearInputFields() {
   $('.idea-input-title').val('');
   $('.idea-input-body').val('');
 }

 function focusOnTitle() {
   $('.idea-input-title').focus();
 }

 function populateDom() {
   var objectKeys = Object.keys(localStorage);
   objectKeys.forEach(function (uniqueId) {
     createBox(JSON.parse(localStorage[uniqueId]));
   });
 }

 function Idea(title, body, quality) {
   this.id = Date.now();
   this.title = title;
   this.body = body;
   this.quality = quality || 0;
 }

 function findObjectByKeyInLocalStorage(key) {
   var ideaFromLocalStorage = localStorage.getItem(key);
   var parsedIdea = JSON.parse(ideaFromLocalStorage);
   return parsedIdea;
 }

function runSearch(e) {
  var indexCardArray = [];
  var objectKeys = Object.keys(localStorage);
  objectKeys.forEach(function (id) {
    indexCardArray.push(JSON.parse(localStorage[id]));
  });
  var search = $(this).val().toUpperCase();
  var searchedArray = indexCardArray.filter(function (newIndexCard) {
    return newIndexCard.title.toUpperCase().includes(search) || newIndexCard.body.toUpperCase().includes(search);
  });
  $('.bottom').empty();
  for (var i = 0; i < searchedArray.length; i++) {
    createBox(searchedArray[i]);
  }
}

 function deleteHoverOn(e) {
   $(this).prop("src", "images/delete-hover.svg");
 }

 function deleteHoverOff(e) {
   $(this).prop("src", "images/delete.svg");
 }

 function upvoteHoverOn(e) {
   $(this).prop("src", "images/upvote-hover.svg");
 }

 function upvoteHoverOff(e){
   $(this).prop("src", "images/upvote.svg");
 }

 function downvoteHoverOn(e) {
   $(this).prop("src", "images/downvote-hover.svg");
 }

 function downvoteHoverOff(e) {
   $(this).prop("src", "images/downvote.svg");
 }

 function deleteIdea(e) {
   var key = findCardKey(e);
   findObjectByKeyInLocalStorage(key);
   // make its own function
   $(this).closest('article').remove();
   localStorage.removeItem(key);
 }

 function upvoteIdea(e) {
   var key = findCardKey(e);
   var idea = findObjectByKeyInLocalStorage(key);
   idea.quality = idea.quality + 1;
    if(idea.quality > 2){
      idea.quality = 2;
    }
   saveToLocalStorage(idea);
   setQualityState(key);
 }

 function downvoteIdea(e) {
   var key = findCardKey(e);
   var idea = findObjectByKeyInLocalStorage(key);
   idea.quality = idea.quality - 1;
    if(idea.quality < 0){
      idea.quality = 0;
    }
   saveToLocalStorage(idea);
   setQualityState(key);
   }

 function findCardKey(e) {
   var ideaCardId = $(e.target).closest("[data-id]").data("id");
   return ideaCardId;
 }

 function setQualityState(key) {
   var idea = findObjectByKeyInLocalStorage(key);
   var qualities = ['swill', 'plausible', 'genius'];
  $('[data-id='+idea.id+']').find('.idea-box-quality-value').text(qualities[idea.quality]);
 }

 function saveToLocalStorage(idea) {
   localStorage.setItem(idea.id, JSON.stringify(idea));
 }
