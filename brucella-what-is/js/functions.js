const bodyEl = document.body;
let JSON_contents;

fetch('contents.json').then(response => {
    if (!response.ok) { throw new Error("HTTP error " + response.status)}
    return response.json();
  }).then(json => {
    JSON_contents = json;
  }).catch(function(err) {
    console.log(err)
  });


bodyEl.onload = function() {
  bodyEl.classList.add("loaded");
}

function showModal(elem) {
  let elemID = elem.id;

  //Get card contents
  let titleValue = JSON_contents[elemID].title;
  let contentValue = JSON_contents[elemID].content;
  let imgUrl = JSON_contents[elemID].imgUrl;

  //Set modal contents
  let modalVisualImg = document.querySelector('.modal-visual-img');
  let modalTitle = document.querySelector('.modal-title');
  let modalContent = document.querySelector('.modal-content');
  modalVisualImg.src = imgUrl;
  modalVisualImg.alt = titleValue;
  modalTitle.innerHTML = "<h2>"+titleValue+"</h2>";
  modalContent.innerHTML = contentValue;

  //Show modal
  let modal = document.querySelector('.modal');
  modal.classList.add('d-block')
  setTimeout(function(){modal.classList.add('inn')}, 200);

}

function closeModal(elem) {
  let modal = document.querySelector('.modal');
  modal.classList.remove('inn');
  setTimeout(function(){modal.classList.remove('d-block')}, 200);
}
