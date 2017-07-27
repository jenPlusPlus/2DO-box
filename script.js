populateDom();

$(".todo-input-save-button").attr("disabled", true);
$(".todo-input-title").keyup(enableSaveButton);
$(".todo-input-body").keyup(enableSaveButton);

$('.todo-input-save-button').on('click', saveInput);

$('.search-bar-input').on('keyup', runSearch);
$('#importanceFilter').on('change', filterByImportance);

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

function createBox (todo) {
$('.bottom').prepend(`
  <article class="todo-box" data-id=${todo.id}>
    <div class="todo-box-top-line">
      <h2 class="todo-box-header" contenteditable=true>${todo.title}</h2>
      <img class="todo-box-delete-button icon" src="images/delete.svg" alt="delete button" tabindex="0"/>
    </div>
    <p class="todo-box-text" contenteditable=true>${todo.body}</p>
    <div class="todo-box-bottom-line">
      <div class="todo-box-pic-importance">
      <img class="todo-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" tabindex="0"/>
      <img class="todo-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" tabindex="0"/>
      <p class="todo-box-quality" tabindex="0">Importance: <span class="todo-box-quality-value">swill</span></p>
      <label><input type="checkbox" class="mark-as-completed" name="mark-as-completed" value="mark-as-completed"><span class="mark-completed-text">Mark as completed</span></label>
    </div>
  </article>
  `);
  setQualityState(todo.id);
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
  $('.mark-as-completed').on('click', updateMarkedAsCompleted);
}

function updateMarkedAsCompleted (e) {
  var key = findCardKey(e);
  var todo = findObjectByKeyInLocalStorage(key);
  if (todo.completed === false && todo.hidden === false) {
    todo.hidden = true;
    todo.completed = true;
  } else {
    todo.hidden = false;
    todo.completed = false;
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

function showCompletedTasks(e) {
  var cardArray = [];
  var objectKeys = Object.keys(localStorage);
  objectKeys.forEach(function (id) {
    cardArray.push(JSON.parse(localStorage[id]));
  });
  cardArray.forEach(function(todo, i) {
   if (todo.completed === true && todo.hidden === true) {
    createBox(todo);
    $('[data-id='+todo.id+']').find('.mark-as-completed').attr('checked', true);
    todo.hidden = false;
    saveToLocalStorage(todo);
    grayCompletedTasks(todo);
    }
  });
}

function grayCompletedTasks(todo) {
  if (todo.completed === true) {
    $('[data-id='+todo.id+']').toggleClass('gray-out-todo')
  }
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


function todo(title, body, importance) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.importance = importance || 2;
  this.hidden = false;
  this.completed = false;
}

function findObjectByKeyInLocalStorage(key) {
  var todoFromLocalStorage = localStorage.getItem(key);
  var parsedtodo = JSON.parse(todoFromLocalStorage);
  return parsedtodo;
}

function runSearch(e) {
  var cardArray = [];
  var objectKeys = Object.keys(localStorage);
  objectKeys.forEach(function (id) {
    cardArray.push(JSON.parse(localStorage[id]));
  });
  var search = $(this).val().toUpperCase();
  var searchedArray = cardArray.filter(function (newIndexCard) {
    return newIndexCard.title.toUpperCase().includes(search) || newIndexCard.body.toUpperCase().includes(search);
  });
  $('.bottom').empty();
  for (var i = 0; i < searchedArray.length; i++) {
    createBox(searchedArray[i]);
  }
}

function filterByImportance(e) {
  var cardArray = [];
  var objectKeys = Object.keys(localStorage);
  objectKeys.forEach(function (id) {
    cardArray.push(JSON.parse(localStorage[id]));
  });
  if($('#importanceFilter').val() == 5){
    cardArray.forEach(function (task){
      createBox(task);
    });
  }
  else {
    $('.bottom').empty();
    cardArray.forEach(function (card){
      if(card.importance == $('#importanceFilter').val()){
        createBox(card);
      }
    });
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
  $(this).closest('article').remove();
  localStorage.removeItem(key);
}

function upvotetodo(e) {
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
