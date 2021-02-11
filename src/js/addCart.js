const targetDoctor = document.querySelector(".form-add");
const conteinersAdd = document.createElement('div');
const select = document.createElement('select');


const doctorProfile = ['Кардіолог', 'Стоматолог', 'Терапевт'];
const priority = ['Звичайна', 'Пріоритетна', 'Невідкладна'];

//-------Додає на сторінку option докторів

function addRendersSelect() {
    select.id = 'listDoc';
        doctorProfile.forEach(element => {
            const option = new Option(`${element}`, `${element}`);
     if (select.options.length <=2){
         select.add(option);
         targetDoctor.append(select)
     }
    })
    priority.forEach(element => {
        if (selectSearch.options.length <=3) {
            const option = new Option(`${element}`, `${element}`);
            selectSearch.add(option);
        }
    })
    return select
}
addRendersSelect();

//-------------- Головний клас візит------------------

class GeneralParamsAddVisit {
    constructor(purposeVisit, description, urgency, initial) {
        this._purposeVisit = purposeVisit;
        this._description = description;
        this._urgency = urgency;
        this._initial = initial;
    }
}
//--------------клас кардиолог----------------------

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

//--------------клас стоматолог----------------------

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

//--------------клас терапевт ----------------------

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

//--------- рендер візиту всередину модального вікна------------------

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

const saveInformationVisit = document.querySelector('#save'),
      listDoc = document.querySelector('#listDoc'),
       formA = document.querySelectorAll('[action]')[1];

saveInformationVisit.addEventListener('click', (e)=>{
            formA.style.display = ' none';
            overlay.classList.remove('active')
            server.postFetch(addCardToServer());

})

//--------- додавання інформації з модульного вікна на сервер  ------------------

function addCardToServer(nameDoctor=null) {
    let timedArray = [];
    timedArray.push({'doctor': nameDoctor || listDoc.value});
     timedArray.push({'status': 'Open'})
    for(let item of conteinersAdd.children){
        timedArray.push({[item.className]: item.value})
    }
    const inputValue = Object.assign({}, ...timedArray);
    return inputValue
}


