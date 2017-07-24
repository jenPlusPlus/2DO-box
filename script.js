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
    * pushGlobalArrayToLocalStorage()
    * pullGlobalArrayFromLocalStorage()
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

var globalArray = [];

populateDom();

function populateDom() {
  var objectKeys = Object.keys(localStorage);
  console.log(objectKeys)
  objectKeys.forEach(function (uniqueId) {
    createBox(JSON.parse(localStorage[uniqueId]));
  });
}

// refactor to take arguments (title, body, quality)
function Idea() {
  // thid.id = generateID();
  this.id = Date.now();
  this.title = '';
  this.body = '';
  this.quality = 'swill';
}


/* -------------------
   - EVENT LISTENERS -
   ------------------- */

   // make all of these named functions
   // can we combine into a single function??? (Jen)

// INPUT FIELD EVENT LISTENER
  $(".idea-input-title").keyup(function() {
  $(".idea-input-save-button").prop("disabled", !this.value);
});

  $(".idea-input-body").keyup(function() {
  $(".idea-input-save-button").prop("disabled", !this.value);
});



// BUTTON HOVER EVENT LISTENER (on cards)
// better to do in css or named functions in JS??? (do research)
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



// SAVE BUTTON EVENT
$('.idea-input-save-button').on('click', function(e) {
  e.preventDefault();

 // pass title & body as arguments to idea/todo constructor
  var ideaInputTitle = $('.idea-input-title').val();
  var ideaInputBody = $('.idea-input-body').val();
  var newIdea = new Idea();

  newIdea.generateID();
  newIdea.title = ideaInputTitle;
  newIdea.body = ideaInputBody;

  createBox(newIdea);

  localStorage.setItem(newIdea.id, JSON.stringify(newIdea));

  // make below function to clear input fields and focus on title
  $('.idea-input-title').val('');
  $('.idea-input-body').val('');
  $('.idea-input-title').focus();

});

// SEARCH BAR EVENT LISTENER
$('.search-bar-input').keyup(function (e) {
  e.preventDefault();
  var currentInputField = $(this).val();
  var matchingIdeas = globalArray.filter(function(element){
  return element.title.includes(currentInputField) || element.body.includes(currentInputField);
  })

  // change below to only remove non-matching cards
  $('.idea-box').remove();
  for(var i = 0; i < matchingIdeas.length; i++){
    createBox(matchingIdeas[i]);
  }
})

// DELETE BUTTON EVENT LISTENER
$('.bottom').on('click', '.idea-box-delete-button', function(){

  // use named functions to deal with localStorage
  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

  // create function to find index (use for upvote & downvote)
  var key = $(this).closest('article').find('.idea-box-id-hidden').text();
  var index = parsedGlobalArray.findIndex(function(element){
    return element.id === key;
  })

  // own function to splice localStorage array??
  parsedGlobalArray.splice(index, 1);
  // globalArray = parsedGlobalArray;

  //named function for storing in localStorage
  var stringifiedGlobalArray = JSON.stringify(globalArray);
  localStorage.setItem('globalArray', stringifiedGlobalArray);

  // make its own function
    $(this).closest('article').remove();
});

// UPVOTE BUTTON EVENT LISTENER

$('.bottom').on('click','.idea-box-upvote-button', function() {
  // use named functions to deal with localStorage
  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

  // create function to find index (use for upvote & downvote)
  var key = $(this).closest('article').find('.idea-box-id-hidden').text();
  var index = parsedGlobalArray.findIndex(function(element){
    return element.id === key;
  })

  if (parsedGlobalArray[index].quality === 'swill') {
    parsedGlobalArray[index].quality = 'plausible';
    $(this).closest('div').find('span').text('plausible');
    globalArray = parsedGlobalArray;
    pushGlobalArrayToLocalStorage();

  } else if (parsedGlobalArray[index].quality === 'plausible'){
      parsedGlobalArray[index].quality = 'genius';
      $(this).closest('div').find('span').text('genius');
      globalArray = parsedGlobalArray;
      pushGlobalArrayToLocalStorage();
  }
})

// use an array here for quality -jw

// DOWNVOTE BUTTON EVENT LISTENER
$('.bottom').on('click','.idea-box-downvote-button', function() {
  // use named functions to deal with localStorage
  var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
  var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

  // create function to find index (use for upvote & downvote)
  var key = $(this).closest('article').find('.idea-box-id-hidden').text();
  var index = parsedGlobalArray.findIndex(function(element){
    return element.id === key;
  })

// use array for below (Jen)
  if (parsedGlobalArray[index].quality === 'genius') {
    parsedGlobalArray[index].quality = 'plausible';
    $(this).closest('div').find('span').text('plausible');
    globalArray = parsedGlobalArray;
    pushGlobalArrayToLocalStorage();
  } else if (parsedGlobalArray[index].quality === 'plausible'){
      parsedGlobalArray[index].quality = 'swill';
      $(this).closest('div').find('span').text('swill');
      globalArray = parsedGlobalArray;
      pushGlobalArrayToLocalStorage();
  }
})

// TITLE EDIT EVENT LISTENER
  //  ternary conditional??? (use html attribute instead)
$('.bottom').on('click', '.idea-box-header', function() {
   $(this).prop("contenteditable") === true ? null : $(this).prop("contenteditable", true);


//
   $(this).on('blur', function() {
     // use named function
      var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
      var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

      // use find key function
      var key = $(this).closest('article').find('.idea-box-id-hidden').text();
      var index = parsedGlobalArray.findIndex(function(element){
        return element.id === key;
      })

      // edit localStorage directly
    parsedGlobalArray[index].title = $(this).text();
    globalArray = parsedGlobalArray;
    pushGlobalArrayToLocalStorage();
  })
})

// BODY EDIT EVENT LISTENER
// use html attribute instead
$('.bottom').on('click', '.idea-box-text', function() {
  ($(this).prop("contenteditable") === true) ? null: $(this).prop("contenteditable", true);

  $(this).on('blur', function() {
    // use named function
   var globalArrayPulledFromLocalStorage = localStorage.getItem('globalArray');
   var parsedGlobalArray = JSON.parse(globalArrayPulledFromLocalStorage);

   // use find key function
   var key = $(this).closest('article').find('.idea-box-id-hidden').text();
   var index = parsedGlobalArray.findIndex(function(element){
     return element.id === key;
   })

   parsedGlobalArray[index].body = $(this).text();
   globalArray = parsedGlobalArray;
   pushGlobalArrayToLocalStorage();
 })
})

// FUNCTIONS
// edit html more javasciprt friendly also edit html class names
// line 289 may need to change, if using array for quality
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
