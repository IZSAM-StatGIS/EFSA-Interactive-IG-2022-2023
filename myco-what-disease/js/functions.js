import {getSymptomTemplate} from "../parts/symptoms.js";
import {getComplicationsTemplate} from "../parts/complications.js";
import {getWhoIsAtRiskTemplate} from "../parts/whoisatrisk.js";
import {getSecondLevelTemplate} from "../parts/second-level.js";
import {EnumType} from "./type.enum.js";

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


document.querySelectorAll('.fl-box').forEach((elem) =>{
  elem.addEventListener ("click", openSecondLevel, false);
})

function openSecondLevel(elem) {
  let htmlIw = document.querySelector('.infographics-wrap');
  let otherHtmlElem = htmlIw.querySelector('div:not(#'+elem.currentTarget.id+')');
  let htmlElem = document.querySelector('#'+elem.currentTarget.id);
  let slModal = document.querySelector('.sl-modal');

  switch (elem.currentTarget.id){
    case 'fb1':
      slModal.innerHTML = getSecondLevelTemplate(JSON_contents.humans, EnumType.HUMAN);
      break;
    case 'fb2':
      slModal.innerHTML = getSecondLevelTemplate(JSON_contents.animals, EnumType.ANIMAL);
      break;
  }

  document.querySelector('.sl-close').addEventListener ("click", closeSecondLevel, false);
  document.querySelectorAll('.sl-box').forEach((elem)=>{
    elem.addEventListener ("click", openDetailLevel, false);
  });

  otherHtmlElem.classList.add('fl-box-closed');
  setTimeout(() => {htmlElem.classList.add('opacity-0', 'f-selected')}, 290);
  setTimeout(() => {htmlElem.classList.add('d-none')}, 400);
  setTimeout(() => {slModal.classList.add('sl-modal-inn')}, 400);
  setTimeout(() => {slModal.classList.add('opacity-1')}, 410);
}

function closeSecondLevel() {
  let htmlIw = document.querySelector('.infographics-wrap');
  let otherHtmlElem = htmlIw.querySelector('div:not(.f-selected)');
  let htmlElem = document.querySelector('.f-selected');
  let slModal = document.querySelector('.sl-modal');

  slModal.classList.remove('opacity-1');
  setTimeout(() => {slModal.classList.remove('sl-modal-inn')}, 200);
  setTimeout(() => {htmlElem.classList.remove('d-none')}, 300);
  setTimeout(() => {htmlElem.classList.remove('opacity-0', 'f-selected')}, 400);
  setTimeout(() => {otherHtmlElem.classList.remove('fl-box-closed');}, 600);
}

function openDetailLevel(elem) {
  let slModal = document.querySelector('.sl-modal');
  let dModal = document.querySelector('.d-modal');
  let htmlElem = document.querySelector('#'+elem.currentTarget.id);
  let otherElemCollection = slModal.querySelectorAll('div:not(#'+elem.currentTarget.id+')');

  let type = (htmlElem.classList.contains(EnumType.HUMAN) ? EnumType.HUMAN : EnumType.ANIMAL);

  switch (elem.currentTarget.id){
    case 'slb2':
      dModal.querySelector('.detail-modal-body').innerHTML = getSymptomTemplate(JSON_contents[type].symptoms, type);
      break;
    case 'slb3':
      dModal.querySelector('.detail-modal-body').innerHTML = getWhoIsAtRiskTemplate(JSON_contents[type].whois, type);
      break;
    case 'slb4':
      dModal.querySelector('.detail-modal-body').innerHTML = getComplicationsTemplate(JSON_contents[type].complications, type);
      break;

  }

  document.querySelector('.d-close').addEventListener ("click", closeDetailLevel, false);
  otherElemCollection.forEach((item) => { item.classList.add('sl-box-closed'); });
  htmlElem.classList.add('sl-box-inn');
  setTimeout(() => {htmlElem.classList.add('opacity-0')}, 300);
  setTimeout(() => {dModal.classList.add('d-block')}, 350);
  setTimeout(() => {dModal.classList.add('opacity-1')}, 400);
}

function closeDetailLevel(){
  let slModal = document.querySelector('.sl-modal');
  let dModal = document.querySelector('.d-modal');
  let htmlElem = document.querySelector('.sl-box-inn');
  let otherElemCollection = slModal.querySelectorAll('div:not(.sl-box-inn)');

  /*
  dModal.querySelectorAll('.detail-modal-body').forEach((item) =>{
    if(!item.classList.contains('d-none')){
      item.classList.add('d-none')
    }
  })
   */
  dModal.classList.remove('opacity-1');
  setTimeout(() => {dModal.classList.remove('d-block')}, 300);
  setTimeout(() => {htmlElem.classList.remove('opacity-0')}, 300);
  setTimeout(() => {
    htmlElem.classList.remove('sl-box-inn');
    otherElemCollection.forEach((item) => { item.classList.remove('sl-box-closed'); });
  }, 500);
}


