const targetDoctor = document.querySelector(".form-add")
const conteinersAdd = document.createElement('div')
const select = document.createElement('select')


const doctorProfile = ['Кардіолог', 'Стоматолог', 'Терапевт'];
const priority = ['звичайна', 'пріоритетна', 'невідкладна'];

function addRendersSelect() {
    select.id = 'listDoc';
    doctorProfile.forEach(element => {
        const option = new Option(`${element}`, `${element}`);
        select.add(option)
    })
    targetDoctor.append(select)
}

addRendersSelect();


class GeneralParamsAddVisit {
    constructor(purposeVisit, description, urgency, initial) {
        this._purposeVisit = purposeVisit;
        this._description = description;
        this._urgency = urgency;
        this._initial = initial;
    }
}

class CardiologyParamsAddVisit extends GeneralParamsAddVisit {
    constructor(purposeVisit, description, urgency, initial) {
        super(purposeVisit, description, urgency, initial);
        this.qualification = 'Кардіолог';
        this.pressure = null;
        this.massIndex = null;
        this.cardiovascularSystem = null
        this.age = null;
    }

    createInputsCardiology() {
        this.elements = {
            initial: document.createElement('input'),
            age: document.createElement('input'),
            purposeVisit: document.createElement('input'),
            description: document.createElement('textarea'),
            pastIllness: document.createElement('textarea'),
            pressure: document.createElement('input'),
            massIndex: document.createElement('input'),
            cardiovascularSystem: document.createElement('input'),
            urgency: document.createElement('select'),
        };
        const {initial, age, purposeVisit, pressure, urgency, massIndex, cardiovascularSystem,pastIllness, description} = this.elements;
        initial.classList.add('initial');
        initial.placeholder = 'ПІБ пацієнта';

        age.classList.add('age');
        age.placeholder = 'Вік';

        purposeVisit.classList.add('purposeVisit');
        purposeVisit.placeholder = 'Мета візиту';

        description.classList.add('description');
        description.placeholder = ('Опис');

        pastIllness.classList.add('pastIllness');
        pastIllness.placeholder = 'Перенесені захворювання';

        pressure.classList.add('pressure');
        pressure.placeholder = 'Тиск';

        massIndex.classList.add('massIndex');
        massIndex.placeholder = 'Індекс маси';

        cardiovascularSystem.classList.add('cardiovascularSystem');
        cardiovascularSystem.placeholder = 'Серцево-судинна система';

        urgency.classList.add('urgency');
        priority.forEach(element => {
            const option = new Option(`${element}`, `${element}`);
            urgency.add(option)
        })
    }
}

class StomatologyParamsAddVisit extends GeneralParamsAddVisit {
    constructor(purposeVisit, description, urgency, initial) {
        super(purposeVisit, description, urgency, initial);
        this.qualification = 'Стоматолог';
        this.lastDateVisit = null;
    }

    createInputsStomatology() {
        this.elements = {
            initial: document.createElement('input'),
            purposeVisit: document.createElement('input'),
            description: document.createElement('textarea'),
            lastDateVisit: document.createElement('input'),
            urgency: document.createElement('select'),
        };
        const {initial, purposeVisit, description, lastDateVisit, urgency} = this.elements;
        initial.classList.add('initial');
        initial.placeholder = 'ПІБ пацієнта';

        purposeVisit.classList.add('purposeVisit');
        purposeVisit.placeholder = 'Мета візиту';

        description.classList.add('description');
        description.placeholder = 'Опис';
        description.style.resize = 'none';

        lastDateVisit.classList.add('lastDateVisit');
        lastDateVisit.placeholder = 'Наступна дата візіту';

        urgency.classList.add('urgency');
        priority.forEach(element => {
            const option = new Option(`${element}`, `${element}`);
            urgency.add(option)
        })
    }
}

class TerapevtParamsAddVisit extends GeneralParamsAddVisit {
    constructor(purposeVisit, description, urgency, initial) {
        super(purposeVisit, description, urgency, initial);
        this.qualification = 'Терапевт';
        this.age = null;
    }

    createInputsTerapevt() {
        this.elements = {
            initial: document.createElement('input'),
            age: document.createElement('input'),
            purposeVisit: document.createElement('input'),
            description: document.createElement('textarea'),
            urgency: document.createElement('select'),
        };
        const {initial, age, description, purposeVisit, urgency} = this.elements;

        initial.classList.add('initial');
        initial.placeholder = 'ПІБ пацієнта';

        age.classList.add('age');
        age.placeholder = 'Вік';

        description.classList.add('description');
        description.placeholder = 'Опис';
        description.style.resize = 'none';

        purposeVisit.classList.add('purposeVisit');
        purposeVisit.placeholder = 'Мета візиту';

        urgency.classList.add('urgency');
        priority.forEach(element => {
            const option = new Option(`${element}`, `${element}`);
            urgency.add(option)
        })
    }
}

document.getElementById('add').onclick = listActiv;
document.getElementById("listDoc").onchange = listActiv;

function listActiv() {
    const cardiology = new CardiologyParamsAddVisit()
    const stomatilogy = new StomatologyParamsAddVisit()
    const terapevt = new TerapevtParamsAddVisit()

    if (cardiology.qualification === this.value || select.value) {
        cardiology.createInputsCardiology()
        renderReception(cardiology);

    }
    if (stomatilogy.qualification === this.value) {
        stomatilogy.createInputsStomatology()
        renderReception(stomatilogy);
    }
    if (terapevt.qualification === this.value) {
        terapevt.createInputsTerapevt()
        renderReception(terapevt);
    }
}

function renderReception(reception) {
    conteinersAdd.classList.add('containers-add');
    remove();
    for (let key in reception.elements) {
        if (reception.elements.hasOwnProperty(key)) {
            conteinersAdd.append(reception.elements[key])
        }
    }
    targetDoctor.append(conteinersAdd);
}

function remove() {
    const rangeRemove = document.createRange();
    rangeRemove.selectNodeContents(conteinersAdd);
    rangeRemove.deleteContents();
}
const saveInformationVisit = document.querySelector('#save');
const listDoc = document.querySelector('#listDoc');

saveInformationVisit.addEventListener('click', (e)=>{
    e.preventDefault()
    let timedArray = [];
    timedArray.push({'doctor': listDoc.value})
    for(let item of conteinersAdd.children){
        timedArray.push({[item.className]: item.value})
}
const inputValue = Object.assign({}, ...timedArray)
  //  testOfCreate(inputValue)
  //   server.postFetch(inputValue)

})

// age: "33"
// cardiovascularSystem: "213"
// description: "колить"
// doctor: "Кардіолог"
// id: 8762
// initial: "Тест 2"
// massIndex: "11"
// pastIllness: "ні"
// pressure: "180 на 120"
// purposeVisit: "серце"
// urgency: "пріоритетна"


// function testOfCreate(content) {
//      const div = document.createElement('div'),
//          formOf = document.createElement('form');
//             div.classList.add('cardContainer');
//         formOf.classList.add('cardForm');
//         switch (content.doctor){
//             case "Кардіолог":
//                 div.innerHTML =
//                     `
//                     `
//                 break;
//             case "Стоматолог":
//                 div.innerHTML = `<p class="card-header" data-name-field="doctor">${content.doctor}</p>
//                             <p class="card-text" data-name-field="urgency"  hidden = false>Urgency: ${content.urgency}</p>
//                             <p class="card-text" data-name-field="purposeVisit"  hidden = false>Visit purpose: ${content.purposeVisit}</p>
//                             <p class="card-text" data-name-field="description"  hidden = false>Visit decrtiption: ${content.description}</p>
//                             <p class="card-text" data-name-field="lastDateVisit"  hidden = false>Last visit date: ${content.lastDateVisit}</p>`;
//                 break;
//             case "Терапевт":
//                 div.innerHTML =
//                     `
//                     `
//                 break;
//
//         }
//         console.log(div)
//     document.querySelector('.form-search').append(formOf)
//      formOf.append(div)
// }






// Кардиолог
// цель визита, 1 purpose visit
// краткое описание визита, 2 description
// выпадающее поле - срочность (обычная, приоритетная, неотложная), 3 urgency
// обычное давление,
// индекс массы тела,
// перенесенные заболевания
// сердечно-сосудистой системы,
// возраст,
// ФИО. 4 initial

// Стоматолог
// цель визита, 1 purpose visit
// краткое описание визита, 2 description
// выпадающее поле - срочность (обычная, приоритетная, неотложная), 3 urgency
// дата последнего посещения,
// ФИО. 4 initial
//
//
// Терапевт:
// цель визита, 1 purpose visit
// краткое описание визита, 2 description
// выпадающее поле - срочность (обычная, приоритетная, неотложная), 3 urgency
// возраст,
// ФИО. 4 initial

