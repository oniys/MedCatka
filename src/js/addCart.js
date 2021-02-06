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
        console.log(stomatilogy.createInputsStomatology())
        renderReception(stomatilogy);
        console.log(renderReception(stomatilogy));
    }
    if (terapevt.qualification === this.value) {
        terapevt.createInputsTerapevt()
        renderReception(terapevt);
    }
}

function renderReception(reception,options) {
    conteinersAdd.classList.add('containers-add');
    remove();
    for (let key in reception.elements) {
        if (reception.elements.hasOwnProperty(key)) {
            if(options){
                reception.elements[key].value = options[key]
                conteinersAdd.append(reception.elements[key])
            }else{
                conteinersAdd.append(reception.elements[key])
            }
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
   server.postFetch(inputValue)
})




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

