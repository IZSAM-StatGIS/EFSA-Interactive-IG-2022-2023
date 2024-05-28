export function getSymptomTemplate(data, type){ return `
    <div class="modal-close d-close">
      <img width="24" src="images/icons/ic_arrow_left.svg"><span>Back</span>
    </div>
    <div class="detail-modal-body d-slb2 symptoms ${type}">
      <img src="${data.backgroundImage.src}" class="l-img">
      <div class="d-modal-contents">
        <h2>Symptoms</h2>
        ${getIncubation(data)}
        ${getText(data)}
        <div class="collection-cont">
            ${getSymptomCollectionTemplate(data)}
        </div>
      </div>
    </div>
`}

function getIncubation(data){
    let t = '';
    if (data.incubationPeriod!==''){
        t += `
        <div class="incubation-container">
          <img src="images/icons/ic_incubation.svg">
          <div>
            <span>Incubation period</span><br><h3>${data.incubationPeriod}</h3>
          </div>
        </div>
        `
    }
    return t;
}

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

function getSymptomCollectionTemplate(data){
    let t = '';
    if (data.collections.length>0) {
        data.collections.forEach((cObj) => {
            t += `<div>`;
            t += `<div class="list-container">`;
            cObj.collection.forEach((elem) => {
                t += `<div>
                        <img src="${elem.img}">
                        <strong>${elem.name}</strong>
                        <small>${elem.abstract}</small>
                      </div>`;
            });
            t += `</div>`;
            if ( cObj.subjects.length>0){
                t += `<div class="subj-container">`;
                cObj.subjects.forEach((elem) => {
                    t += `<div class="subj">
                            <div>
                                <img src="${elem.img}">
                            </div>
                            <small>${elem.name}</small>
                          </div>`;
                });
                t += `</div>`;
            }
            t += `</div>`;
        });
    }
    return t;
}
