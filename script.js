var globalArray = [];
pullGlobalArrayFromLocalStorage();

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

function pushGlobalArrayToLocalStorage() {
  var stringifiedGlobalArray = JSON.stringify(globalArray);
  localStorage.setItem('globalArray', stringifiedGlobalArray);
};

function pullGlobalArrayFromLocalStorage() {
  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  if(globalArrayPulledFromLocalStorage != null){
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);
  globalArray = parsedGlobalArray;
  }
}

function loadSavedIdeas (){
  if (localStorage.getItem('globalArray') !== null){

    var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
    var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

    for(var i = 0; i < parsedGlobalArray.length; i++) {
      createBox(parsedGlobalArray[i]);
    }
  }
}
// INPUT FIELD EVENT LISTENER
  $(".idea-input-title").keyup(function() {
  $(".idea-input-save-button").prop("disabled", !this.value);
});

  $(".idea-input-body").keyup(function() {
  $(".idea-input-save-button").prop("disabled", !this.value);
});

// BUTTON HOVER EVENT LISTENER

// delete
$('.bottom').on('mouseover', '.idea-box-delete-button', function() {
  $(this).prop("src", "images/delete-hover.svg");
})

$('.bottom').on('mouseleave', '.idea-box-delete-button', function() {
  $(this).prop("src", "images/delete.svg");
})

// upvote
$('.bottom').on('mouseover', '.idea-box-upvote-button', function() {
  $(this).prop("src", "images/upvote-hover.svg");
})

$('.bottom').on('mouseleave', '.idea-box-upvote-button', function() {
  $(this).prop("src", "images/upvote.svg");
})

// downvote
$('.bottom').on('mouseover', '.idea-box-downvote-button', function() {
  $(this).prop("src", "images/downvote-hover.svg");
})

$('.bottom').on('mouseleave', '.idea-box-downvote-button', function() {
  $(this).prop("src", "images/downvote.svg");
})

// SAVE BUTTON EVENT LISTENER
$('.idea-input-save-button').on('click', function(e) {
  e.preventDefault();

  var ideaInputTitle = $('.idea-input-title').val();
  var ideaInputBody = $('.idea-input-body').val();
  var newIdea = new Idea();

  newIdea.generateID();
  newIdea.title = ideaInputTitle;
  newIdea.body = ideaInputBody;

  // debugger
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
      <p class="idea-box-id-hidden">${idea.id}</p>
      <div class="idea-box-top-line">
        <h2 class="idea-box-header">${idea.title}</h2>
        <img class="idea-box-delete-button icon" src="images/delete.svg" alt="delete button" />
      </div>
      <p class="idea-box-text">${idea.body}</p>
      <div class="idea-box-bottom-line">
        <img class="idea-box-upvote-button icon" src="images/upvote.svg" alt="upvote button" />
        <img class="idea-box-downvote-button icon" src="images/downvote.svg" alt="downvote button" />
        <p class="idea-box-quality">quality: <span class="idea-box-quality-value">${idea.quality}</span></p>
      </div>
    </article>
    `);
}

// DELETE BUTTON EVENT LISTENER

$('.bottom').on('click', '.idea-box-delete-button', function(e){
  e.preventDefault();

  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

  var key = $(this).closest('article').find('.idea-box-id-hidden').text();

  //find index
  var index = parsedGlobalArray.findIndex(function(element){
    return element.id === key;
  })
  // splice
  parsedGlobalArray.splice(index, 1);
  globalArray = parsedGlobalArray;
  var stringifiedGlobalArray = JSON.stringify(globalArray);
  localStorage.setItem('globalArray', stringifiedGlobalArray);

  $(this).closest('article').remove();
});

// UPVOTE BUTTON EVENT LISTENER

$('.bottom').on('click','.idea-box-upvote-button', function(e) {
  e.preventDefault();

  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

  var key = $(this).closest('article').find('.idea-box-id-hidden').text();

  //find index
  var index = parsedGlobalArray.findIndex(function(element){
    return element.id === key;
  })
  if (parsedGlobalArray[index].quality === 'swill') {
    parsedGlobalArray[index].quality = 'plausible';
    $(this).closest('div').find('span').text('plausible');
    globalArray = parsedGlobalArray;
    pushGlobalArrayToLocalStorage();

  }
    else if (parsedGlobalArray[index].quality === 'plausible'){
    parsedGlobalArray[index].quality = 'genius';
    $(this).closest('div').find('span').text('genius');
    globalArray = parsedGlobalArray;
    pushGlobalArrayToLocalStorage();
  }
})

// DOWNVOTE BUTTON EVENT LISTENER
$('.bottom').on('click','.idea-box-downvote-button', function(e) {
  e.preventDefault();

  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

  var key = $(this).closest('article').find('.idea-box-id-hidden').text();

  //find index
  var index = parsedGlobalArray.findIndex(function(element){
    return element.id === key;
  })
  if (parsedGlobalArray[index].quality === 'genius') {
      parsedGlobalArray[index].quality = 'plausible';
      $(this).closest('div').find('span').text('plausible');
      globalArray = parsedGlobalArray;
      pushGlobalArrayToLocalStorage();
  }
    else if (parsedGlobalArray[index].quality === 'plausible'){
      parsedGlobalArray[index].quality = 'swill';
      $(this).closest('div').find('span').text('swill');
      globalArray = parsedGlobalArray;
      pushGlobalArrayToLocalStorage();
  }
})

// TITLE EDIT EVENT LISTENER
$('.bottom').on('click', '.idea-box-header', function() {
   $(this).prop("contenteditable") === true ? null: $(this).prop("contenteditable", true);
   $(this).on('blur', function() {

    var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
    var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

    var key = $(this).closest('article').find('.idea-box-id-hidden').text();
    var index = parsedGlobalArray.findIndex(function(element){
      return element.id === key;
    })

    parsedGlobalArray[index].title = $(this).text();
    globalArray = parsedGlobalArray;
    pushGlobalArrayToLocalStorage();
  })
})

// BODY EDIT EVENT LISTENER
$('.bottom').on('click', '.idea-box-text', function() {
  ($(this).prop("contenteditable") === true) ? null: $(this).prop("contenteditable", true);

  $(this).on('blur', function() {

   var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
   var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

   var key = $(this).closest('article').find('.idea-box-id-hidden').text();
   var index = parsedGlobalArray.findIndex(function(element){
     return element.id === key;
   })

   parsedGlobalArray[index].body = $(this).text();
   globalArray = parsedGlobalArray;
   pushGlobalArrayToLocalStorage();
 })
})

// SEARCH BAR EVENT LISTENER
$('.search-bar-input').keyup(function (e) {
  e.preventDefault();
  var currentInputField = $(this).val();
  var matchingIdeas = globalArray.filter(function(element, index){
  //if title or body matches the search box, add element to array
  return element.title.includes(currentInputField) || element.body.includes(currentInputField);
  })

  // delete all the boxes
  $('.idea-box').remove();
  // only show matchingIdeas boxes
  for(var i = 0; i < matchingIdeas.length; i++){
    createBox(matchingIdeas[i]);
  }
})
