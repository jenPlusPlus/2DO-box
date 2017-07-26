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
    * pushtodoArrayToLocalStorage()
    * pulltodoArrayFromLocalStorage()
    * loadSavedtodos()

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
  $(".todo-input-save-button").attr("disabled", true);
  $(".todo-input-title").keyup(enableSaveButton);
  $(".todo-input-body").keyup(enableSaveButton);



// BUTTON HOVER EVENT LISTENER (on cards)
// better to do in css or named functions in JS??? (do research)
// move to function that creates cards??
// delete
$('.bottom').on('mouseover', '.todo-box-delete-button', deleteHoverOn);
$('.bottom').on('mouseleave', '.todo-box-delete-button', deleteHoverOff);

// upvote
$('.bottom').on('mouseover', '.todo-box-upvote-button', upvoteHoverOn);
$('.bottom').on('mouseleave', '.todo-box-upvote-button', upvoteHoverOff);

// downvote
$('.bottom').on('mouseover', '.todo-box-downvote-button', downvoteHoverOn);
$('.bottom').on('mouseleave', '.todo-box-downvote-button', downvoteHoverOff);



// SAVE BUTTON EVENT
$('.todo-input-save-button').on('click', saveInput);

// SEARCH BAR EVENT LISTENER
$('.search-bar-input').on('keyup', runSearch);

// DELETE BUTTON EVENT LISTENER
$('.bottom').on('click', '.todo-box-delete-button', deletetodo);

// UPVOTE BUTTON EVENT LISTENER
$('.bottom').on('click','.todo-box-upvote-button', upvotetodo);

// DOWNVOTE BUTTON EVENT LISTENER
$('.bottom').on('click','.todo-box-downvote-button', downvotetodo);

// TITLE EDIT EVENT LISTENER


  //  ternary conditional??? (use html attribute instead)

function saveTitle(e) {
  e.preventDefault();
  var key = findCardKey(e);
  var todo = findObjectByKeyInLocalStorage(key);
  todo.title = $(e.target).closest('h2').text();
  saveToLocalStorage(todo);
}

function saveBody(e) {
  e.preventDefault();
  var key = findCardKey(e);
  var todo = findObjectByKeyInLocalStorage(key);
  todo.body = $(e.target).closest('.todo-box-text').text();
  saveToLocalStorage(todo);
}
// edit html more javasciprt friendly also edit html class names
// line 289 may need to change, if using array for quality
function createBox (todo) {
$('.bottom').prepend(`
  <article class="todo-box" data-id=${todo.id}>
    <div class="todo-box-top-line">
      <h2 class="todo-box-header" contenteditable=true>${todo.title}</h2>
      <img class="todo-box-delete-button icon" src="images/delete.svg" alt="delete button" />
    </div>
    <p class="todo-box-text" contenteditable=true>${todo.body}</p>
    <div class="todo-box-bottom-line">
      <img class="todo-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
      <img class="todo-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
      <p class="todo-box-quality">quality: <span class="todo-box-quality-value">swill</span></p>
      <label><input type="checkbox" name="mark-as-completed" value="mark-as-completed">Mark as completed</label>
    </div>
  </article>
  `);
  setQualityState(todo.id);
  $('[data-id='+todo.id+']').on("blur", "h2", saveTitle);
  $('[data-id='+todo.id+']').on("blur", ".todo-box-text", saveBody);
}

function hideMarkedAsCompleted () {

}

 function saveInput(e){
   e.preventDefault();

   var todoInputTitle = $('.todo-input-title').val();
   var todoInputBody = $('.todo-input-body').val();
   var newtodo = new todo(todoInputTitle, todoInputBody);

   saveToLocalStorage(newtodo);
   createBox(newtodo);


  clearInputFields()
  focusOnTitle()
 }

 function enableSaveButton(e){
   if($(".todo-input-title").val() != "" && $(".todo-input-body").val() != ""){
     $(".todo-input-save-button").attr("disabled", false);
   }
 }

 function clearInputFields() {
   $('.todo-input-title').val('');
   $('.todo-input-body').val('');
 }

 function focusOnTitle() {
   $('.todo-input-title').focus();
 }

 function populateDom() {
   var objectKeys = Object.keys(localStorage);
   objectKeys.forEach(function (uniqueId) {
     createBox(JSON.parse(localStorage[uniqueId]));
   });
 }


 function todo(title, body, quality) {
   this.id = Date.now();
   this.title = title;
   this.body = body;
   this.importance = importance || 2;
 }

 function findObjectByKeyInLocalStorage(key) {
   var todoFromLocalStorage = localStorage.getItem(key);
   var parsedtodo = JSON.parse(todoFromLocalStorage);
   return parsedtodo;
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

 function deletetodo(e) {
   var key = findCardKey(e);
   findObjectByKeyInLocalStorage(key);
   // make its own function
   $(this).closest('article').remove();
   localStorage.removeItem(key);
 }

 function upvotetodo(e) {
   var key = findCardKey(e);
   var todo = findObjectByKeyInLocalStorage(key);
   todo.quality = todo.quality + 1;
    if(todo.quality > 2){
      todo.quality = 2;
    }
   saveToLocalStorage(todo);
   setQualityState(key);
 }

 function downvotetodo(e) {
   var key = findCardKey(e);
   var todo = findObjectByKeyInLocalStorage(key);
   todo.quality = todo.quality - 1;
    if(todo.quality < 0){
      todo.quality = 0;
    }
   saveToLocalStorage(todo);
   setQualityState(key);
   }

 function findCardKey(e) {
   var todoCardId = $(e.target).closest("[data-id]").data("id");
   return todoCardId;
 }

 function setQualityState(key) {
   var todo = findObjectByKeyInLocalStorage(key);
   var qualities = ['swill', 'plausible', 'genius'];
  $('[data-id='+todo.id+']').find('.todo-box-quality-value').text(qualities[todo.quality]);
 }

 function saveToLocalStorage(todo) {
   localStorage.setItem(todo.id, JSON.stringify(todo));
 }
