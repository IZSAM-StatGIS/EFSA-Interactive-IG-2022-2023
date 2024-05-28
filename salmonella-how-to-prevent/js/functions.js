const bodyEl = document.body;
let JSON_contents;

fetch('contents.json').then(response => {
  if (!response.ok) { throw new Error("HTTP error " + response.status)}
  return response.json();
}).then(json => {
  JSON_contents = json;
}).catch((err) =>{
  console.log(err)
});

document.querySelectorAll('.lc').forEach((elem) =>{
  elem.addEventListener ("click", openLevel, false);
})

document.querySelector('#back').addEventListener('click', resetSelection, false);


function openLevel(elem){
  let main = document.querySelector('.main');
  let cardContainer = document.querySelector('.card-container');
  let htmlelem = document.querySelector('#'+elem.currentTarget.id);

  resetSelection();
  cardContainer.innerHTML = getCollectionTemplate(JSON_contents[elem.currentTarget.id]);
  main.classList.add('level-selected');
  htmlelem.classList.add('selected');
}

function resetSelection(){
  let main = document.querySelector('.main');
  let htmlelem = document.querySelector('.selected');

  main.classList.remove('level-selected');
  if (htmlelem) {
    htmlelem.classList.remove('selected');
  }
}

function getCollectionTemplate(data){
  let t = '';
  if (data.collection.length>0) {
    data.collection.forEach((elem) => {
      t += `
          <div class="card" style="background-image: url('${elem.img}')">
            <div class="txt-cont">
              <span>${elem.title}</span>`
      if(elem.info!==''){
        t += `<hr class="divider">
              <small>${elem.info}</small>`
      }

      t += `</div></div>`
    });
  }
  return t;
}
