export function getSecondLevelTemplate(data, type){ return `
    <div class="modal-close sl-close">
        <img width="24" src="images/icons/ic_arrow_left.svg"><span>Back</span>
      </div>
    <div class="sl-box slb1">
        <h1>What<br>disease</h1>
    </div>
    ${getSlCollectionTemplate(data.secondLevelItems, type)}
`}

function getSlCollectionTemplate(secondLevelItems, type){
    let t = '';
    secondLevelItems.forEach((items, i) => {
        t += `<div id="slb${i+2}" class="sl-box slb${i+2} ${type}">
                <img src="${items.img}">
                <h2>${items.title}</h2>
            </div>`
    });
    return t;
}
