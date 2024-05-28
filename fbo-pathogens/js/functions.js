const bodyEl = document.body;
const html = document.documentElement;
var nav = document.querySelector('nav');
var navPathogensContainer = document.querySelector('.organisms');
var JSON_contents;
var grid = document.querySelector('.grid');
var iso = new Isotope( grid, {
  // options
  itemSelector: '.grid-item',
  percentPosition: true,
  layoutMode: 'fitRows',
  fitWidth: true,
  masonry: {
    // use element for option
    columnWidth: '.grid-sizer'
  },
});

imagesLoaded( grid ).on( 'progress', function() {
  // layout Isotope after each image loads
  iso.layout();
});

window.onresize = restartLayout;
function restartLayout() {
  location.reload();
  return false;
}

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener( 'click', function( event ) {
  // only work with buttons
  if ( !matchesSelector( event.target, 'li' ) ) {
    return;
  } else {
    [].forEach.call(document.querySelectorAll('.button'), function (el) {
        el.classList.remove('is-checked');
    });
    event.target.classList.toggle("is-checked");
  }
  var filterValue = event.target.getAttribute('data-filter');
  iso.arrange({ filter: filterValue });
});

/* Get JSON contents */
function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', url);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      JSON_contents = JSON.parse(xobj.responseText);
      callback(JSON_contents);
    }
  };
  xobj.send(null);
}

loadJSON('contents.json', function(result) {
  console.log(result);
});

  //for(var key in JSON_contents.jsonData) {
  //  for (var key1 in JSON_contents.jsonData[key]) {
  //    console.log(JSON_contents.jsonData[key][key1].id);
  //  }
  //}

/* Build contents from JSON */
function loadContents(elem) {
  var elemId = elem.id;
  var elemSelection = document.querySelector('#'+elemId);
  var categoryBlock = elemSelection.closest(".grid-item");
  if (categoryBlock.classList.contains("bacteria")) {
    category = JSON_contents.bacteria[elemId];
    categoryName = JSON_contents.bacteria["catname"];
  }
  if (categoryBlock.classList.contains("bacterial-toxins")) {
    category = JSON_contents.toxins[elemId];
    categoryName = JSON_contents.toxins["catname"];
  }
  if (categoryBlock.classList.contains("viruses")) {
    category = JSON_contents.viruses[elemId];
    categoryName = JSON_contents.viruses["catname"];
  }
  if (categoryBlock.classList.contains("parasites")) {
    category = JSON_contents.parasites[elemId];
    categoryName = JSON_contents.parasites["catname"];
  }
  if (categoryBlock.classList.contains("other")) {
    category = JSON_contents.other[elemId];
    categoryName = JSON_contents.other["catname"];
  }
  // define dom variable
  var pathongenHead = document.querySelector('.pathogen-name');
  var pathongenCategory = pathongenHead.querySelector('h3');
  var pathongenName = pathongenHead.querySelector('h1');
  var pathongenVisual = document.querySelector('.visual');
  var pathongenIncubationPeriod = document.querySelector('.incubation-period p');
  var pathongenDescription = document.querySelector('.pathogen-content-description p');
  var pathongenSymptoms = document.querySelector('.pathogen-content-symptoms p');
  var pathongenTransmission = document.querySelector('.pathogen-transmission');
  var pathongenTransmissionContents = pathongenTransmission.querySelector('.pathogen-content-transmission p');
  // define contents
  pathongenCategory.innerHTML = categoryName;
  pathongenName.innerHTML = category.name;
  pathongenIncubationPeriod.innerHTML = category.incubation;
  pathongenVisual.getElementsByTagName("img")[0].src = category.cover["src"];
  pathongenVisual.getElementsByTagName("img")[0].alt = category.cover["alt"];
  pathongenDescription.innerHTML = category.description;
  pathongenSymptoms.innerHTML = category.symptoms;
  pathongenTransmission.getElementsByTagName("img")[0].src = category.mtimage["src"];
  pathongenTransmission.getElementsByTagName("img")[0].alt = category.mtimage["alt"];
  pathongenTransmissionContents.innerHTML = category.transmission;
  // show loadContents
  bodyEl.classList.toggle("show-contents");
  imagesLoaded( pathongenTransmission, function( instance ) {
    pathongenTransmission.classList.toggle("show-image");
  });
}

function backToMenu() {
  bodyEl.classList.remove("show-contents");
  var pathongenTransmission = document.querySelector('.pathogen-transmission');
  pathongenTransmission.classList.toggle("show-image");
  setTimeout(function(){
    pathongenTransmission.getElementsByTagName("img")[0].src = "";
    pathongenTransmission.getElementsByTagName("img")[0].alt = "";
  }, 800);
}

bodyEl.onload = function() {
  bodyEl.classList.add("loaded");
}

function showModal(elem) {
  var elemParentId = elem.parentNode.parentNode.id;
  var pathogenBlock = document.querySelector('#'+elemParentId);
  //Get card contents
  var title = pathogenBlock.querySelector('h5');
  var titleValue = title.innerHTML;
  var visual = pathogenBlock.querySelector('.pathogen-info-item-illustration');
  var visualSrc = visual.getElementsByTagName("img")[0].src;
  var visualAlt = visual.getElementsByTagName("img")[0].alt;
  var content = pathogenBlock.querySelector('.pathogen-content');
  var contentValue = content.innerHTML;
  //Set modal contents
  var modal = document.querySelector('.modal');
  var modalVisual = document.querySelector('.modal-visual');
  var modalTitle = document.querySelector('.modal-title');
  var modalContent = document.querySelector('.modal-content');
  modalVisual.getElementsByTagName("img")[0].src = visualSrc;
  modalVisual.getElementsByTagName("img")[0].alt = visualAlt;
  modalTitle.innerHTML = "<h2>"+titleValue+"</h2>";
  modalContent.innerHTML = contentValue;
  //Set styles
  modal.id = "modal-"+elemParentId;
  bodyEl.classList.add("show-modal");
}

function closeModal(elem) {
  bodyEl.classList.remove("show-modal");
}

nav.onscroll = function() {
  if (nav.scrollTop > 100) {
    bodyEl.classList.add("scrolling");
  } else {
    bodyEl.classList.remove("scrolling");
  }
};
