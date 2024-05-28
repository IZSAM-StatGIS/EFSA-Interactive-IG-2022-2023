export function getWhoIsAtRiskTemplate(data, type){ return `
    <div class="modal-close d-close">
      <img width="24" src="images/icons/ic_arrow_left.svg"><span>Back</span>
    </div>
    <div class="detail-modal-body d-slb2">
      <img src="${data.backgroundImage.src}" class="l-img">
      <div class="d-modal-contents">
        <h2>Who is at risk?</h2>
        ${getText(data)}
        ${getCollectionTemplate(data, type)}
      </div>
    </div>
`}

function getText(data){
    let t = '';
    if (data.text!==''){
        t += `
        <div class="incubation-container">
          <div>
            <span>${data.text}</span>
          </div>
        </div>
        `
    }
    return t;
}

function getCollectionTemplate(data, type){
    let t = '';
    if (data.collection.length>0) {
        t += `<div class="${type} risk list-container">`;
        data.collection.forEach((elem) => {
            t += `<div>
                <img src="${elem.img}">
                <strong>${elem.name}</strong>
                <small>${elem.abstract}</small>
              </div>`
        });
        t += `</div>`
    }
    return t;
}
