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

// SAVE BUTTON EVENT
$('.todo-input-save-button').on('click', saveInput);

// SEARCH BAR EVENT LISTENER
$('.search-bar-input').on('keyup', runSearch);

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

      <p class="todo-box-quality">Importance: <span class="todo-box-quality-value">swill</span></p>
      <label><input type="checkbox" class="mark-as-completed" name="mark-as-completed" value="mark-as-completed">Mark as completed</label>
    </div>
  </article>
  `);
  setQualityState(todo.id);
  //move below to an addEventListenersToCard function
  $('[data-id='+todo.id+']').on('mouseover', '.todo-box-delete-button', deleteHoverOn);
  $('[data-id='+todo.id+']').on('mouseleave', '.todo-box-delete-button', deleteHoverOff);
  $('[data-id='+todo.id+']').on('mouseover', '.todo-box-upvote-button', upvoteHoverOn);
  $('[data-id='+todo.id+']').on('mouseleave', '.todo-box-upvote-button', upvoteHoverOff);
  $('[data-id='+todo.id+']').on('mouseover', '.todo-box-downvote-button', downvoteHoverOn);
  $('[data-id='+todo.id+']').on('mouseleave', '.todo-box-downvote-button', downvoteHoverOff);
  $('[data-id='+todo.id+']').on('click', '.todo-box-delete-button', deletetodo);
  $('[data-id='+todo.id+']').on('click','.todo-box-upvote-button', upvotetodo);
  $('[data-id='+todo.id+']').on('click','.todo-box-downvote-button', downvotetodo);
  $('[data-id='+todo.id+']').on("blur", "h2", saveTitle);
  $('[data-id='+todo.id+']').on("blur", ".todo-box-text", saveBody);
}

// function hiddenStates () {
//   if (todo.hidden === true) {
//     $('article').toggleClass('hidden');
//   }
// }

$('.mark-as-completed').on('click', hideMarkedAsCompleted);

function hideMarkedAsCompleted (e) {
  var key = findCardKey(e);
  var todo = findObjectByKeyInLocalStorage(key);
  if (todo.hidden === false) {
    todo.hidden = true;
  } else {
    todo.hidden = false;
  };
  hideCardsOnDom(todo);
  saveToLocalStorage(todo);
}

function hideCardsOnDom(todo){
  if (todo.hidden === true) {
    $('[data-id='+todo.id+']').toggleClass('hidden')
  }
}

$('.show-completed').on('click', showCompletedTasks);

function showCompletedTasks () {
  $('.hidden').each(function(){
    $(this).addClass('not-hidden')
  })
}

 function saveInput(e){
   e.preventDefault();

   var todoInputTitle = $('.todo-input-title').val();
   var todoInputBody = $('.todo-input-body').val();
   var newtodo = new todo(todoInputTitle, todoInputBody);
   console.log(newtodo)
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


 function todo(title, body, importance) {
   this.id = Date.now();
   this.title = title;
   this.body = body;
   this.importance = importance || 2;
   this.hidden = false;
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
   console.log("upvoting");
   var key = findCardKey(e);
   var todo = findObjectByKeyInLocalStorage(key);
   todo.importance = todo.importance + 1;
    if(todo.importance > 4){
      todo.importance = 4;
    }
   saveToLocalStorage(todo);
   setQualityState(key);
 }

 function downvotetodo(e) {
   var key = findCardKey(e);
   var todo = findObjectByKeyInLocalStorage(key);
   todo.importance = todo.importance - 1;
    if(todo.importance < 0){
      todo.importance = 0;
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
   var qualities = ['None', 'Low', 'Normal', 'High', 'Critical'];
  $('[data-id='+todo.id+']').find('.todo-box-quality-value').text(qualities[todo.importance]);
 }

 function saveToLocalStorage(todo) {
   localStorage.setItem(todo.id, JSON.stringify(todo));
 }
