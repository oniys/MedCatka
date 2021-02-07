const server = new Fetch();

const email = document.querySelector('#login'),
    password = document.querySelector('#password'),
    signIn = document.querySelector('#check'),
    switchBtnSign = document.querySelector('.switchBtnSign'),
    switchBtnAdd = document.querySelector('.switchBtnAdd'),
    modalWindow =document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    switchBtn = document.querySelector('.switchBtnAdd');

    switchBtn.addEventListener('click', changeBtn)
        function changeBtn() {
            formA.style.display = 'inline';
            const btnSaveForServer = document.querySelector('.reedit');
            saveInformationVisit.style.display = 'inline';
            btnSaveForServer.style.display = 'none'
        }

        if(localStorage.length === 1){
            switchBtnSign.style.visibility = 'hidden';
            createdCard()
        }else{
            switchBtnSign.style.visibility = 'visible';
        }

    signIn.addEventListener('click',  function (e) {
        e.preventDefault()
            server.getToken(email.value, password.value).then(data=>{
                if(data){
                    server.saveToken(data)
                    modalWindow.style.display = 'none';
                    overlay.classList.remove('active');
                    switchBtnAdd.style.visibility ='visible';
                    switchBtnSign.style.visibility = 'hidden';
                    createdCard()
                }else{
                    e.preventDefault()
                    const error = document.createElement('p'),
                     modalAutorization = document.querySelector('.title-form');
                     error.style.color = 'red';
                     error.textContent = 'Login is not created. Try again';

                    if(modalAutorization.children[0]) {
                        return false
                    }else{
                        modalAutorization.append(error)
                    }
                }
            })
    });

async function createdCard() {
   const formOfCard = document.createElement('form');
        formOfCard.classList.add('cardForm');
    const response = await server.getFetch();

        response.forEach(content=>{

            const div = document.createElement('div'),
                btnGroup = document.createElement('div'),
                btnChange = document.createElement('button'),
                btnSeeMore = document.createElement('button'),
                btnChangeCard = document.createElement('button'),
                btnRemove = document.createElement('button');

            btnGroup.classList.add('btnGroup');
            btnChange.classList.add('cardChange');
            btnSeeMore.classList.add('cardSeeMore');
            btnSeeMore.setAttribute('data-show', 'true');
            btnChangeCard.classList.add('cardChangeCard');
            btnRemove.classList.add('cardRemove');
            btnChange.textContent = 'Змінити';
            btnSeeMore.textContent = 'Показати більше';
            btnChangeCard.textContent = 'Змінити карточку';
            btnRemove.textContent = 'Видалити карточку';
            div.classList.add('cardContainer');

            btnChangeCard.style.display = 'none';
            btnRemove.style.display = 'none';
            
            div.dataset.id = content.id
            btnChangeCard.dataset.modal = 'reg';
            btnChangeCard.classList.add('aut-modal');


         document.querySelector('.filter-conteiner').prepend(formOfCard)
    
        switch (content.doctor){
            case "Кардіолог":
                div.innerHTML = `<div class="card-group"><p class="card-header" data-name-field="doctor">Лікар: ${content.doctor}</p>
                            <p class="card-text" data-name-field="initial">ПІБ пацієнта: ${content.initial}</p>
                           <p class="card-text" data-name-field="age" hidden = true>Вік: ${content.age}</p>
                            <p class="card-text" data-name-field="urgency"  hidden = true>Приорітет: ${content.urgency}</p>
                            <p class="card-text" data-name-field="purposeVisit"  hidden = true>Мета візиту: ${content.purposeVisit}</p>
                            <p class="card-text" data-name-field="pastIllness"  hidden = true>Перенесені захворювання: ${content.pastIllness}</p>
                            <p class="card-text" data-name-field="description"  hidden = true>Опис: ${content.description}</p>
                            <p class="card-text" data-name-field="cardiovascularSystem"  hidden = true>Серцево-судинна система: ${content.cardiovascularSystem}</p>
                            <p class="card-text" data-name-field="massIndex" hidden = true >Індекс маси: ${content.massIndex}</p></div>`
                break;
            case "Стоматолог":
                 div.innerHTML = `<div class="card-group"><p class="card-header" data-name-field="doctor"> Лікар: ${content.doctor}</p>
                            <p class="card-text" data-name-field="initial">ПІБ пацієнта: ${content.initial}</p>
                            <p class="card-text" data-name-field="urgency"  hidden = false>Приорітет: ${content.urgency}</p>
                            <p class="card-text" data-name-field="purposeVisit"  hidden = false>Мета візиту: ${content.purposeVisit}</p>
                            <p class="card-text" data-name-field="description"  hidden = false>Опис: ${content.description}</p>
                            <p class="card-text" data-name-field="lastDateVisit"  hidden = false>Остання дата візиту: ${content.lastDateVisit}</p></div>`;
                break;
            case "Терапевт":
                div.innerHTML = `<div class="card-group"><p class="card-header" data-name-field="doctor"> Лікар: ${content.doctor}</p>
                            <p class="card-text" data-name-field="initial">ПІБ пацієнта: ${content.initial}</p>
                            <p class="card-text" data-name-field="urgency"  hidden = false>Приорітет: ${content.urgency}</p>
                            <p class="card-text" data-name-field="purposeVisit"  hidden = false>Мета візиту: ${content.purposeVisit}</p>
                            <p class="card-text" data-name-field="description"  hidden = false>Опис: ${content.description}</p>
                            <p class="card-text" data-name-field="lastDateVisit"  hidden = false>Вік: ${content.age}</p></div>`;
                break;
     }
                        changeCardf(btnChange,btnChangeCard,btnRemove);
                        seeMoreCardf(btnSeeMore);
                        deleteCardf(btnRemove);
                        putCardf(btnChangeCard)
                        btnGroup.append(btnChange,btnChangeCard,btnRemove,btnSeeMore);
                        div.append(btnGroup);
                 return formOfCard.append(div);
        })
    }

    function changeCardf (btnChange,btnChangeCard,btnRemove){
        btnChange.addEventListener('click', function(e) {
            ready()
            e.preventDefault()
            if (btnChangeCard.style.display === 'none') {
                btnChangeCard.style.display = 'block';
                btnRemove.style.display = 'block';
            } else {
                btnChangeCard.style.display = 'none';
                btnRemove.style.display = 'none';
            }
        })
    }

    function seeMoreCardf (btnSeeMore){
        btnSeeMore.addEventListener('click', (e)=>{
            e.preventDefault();
                if (e.target.dataset.show ==='true'){
                    const elementShow = e.target.parentElement.parentElement.querySelectorAll('p');
                    elementShow.forEach(element =>{
                        element.hidden= false;
                });
                    e.target.dataset.show ='false';
                } else if(e.target.dataset.show ==='false') {
                    const elementShow = e.target.parentElement.parentElement.querySelectorAll('p');
                    elementShow.forEach(elem =>{
                        elem.hidden = true;
                    if (elem.dataset.nameField === "doctor" || elem.dataset.nameField === "initial")  elem.hidden = false;
                });
                    e.target.dataset.show ='true';
                }

        })
    }

 function deleteCardf(btnRemove){
        btnRemove.addEventListener('click', (e)=>{
            e.preventDefault()
            const responseAnswer = server.deleteFetch(e.target.parentElement.parentElement.dataset.id);
       if(responseAnswer){
           e.target.parentElement.parentElement.remove()
       }else return false
    })
}

 function putCardf(btnChangeCard){
    btnChangeCard.addEventListener('click', (e)=>{
        formA.style.display = 'inline';
        saveInformationVisit.style.display = 'none'
        e.preventDefault();
       editCard(e);
       editCardServer(e);
    })
}

async function editCardServer(curentEl) {
    const btnSaveForServer = document.querySelector('.reedit'),
          timeNameOfDoctor = curentEl.target.parentElement.parentElement.children[0].firstElementChild.textContent.split(' ')[2];
    const valueOfDoctor = addRendersSelect();
    console.log(!Boolean(timeNameOfDoctor))
    if(!Boolean(timeNameOfDoctor)) {
        valueOfDoctor.value = 'Кардіолог'
    } else {
        valueOfDoctor.value = timeNameOfDoctor
    }
    btnSaveForServer.style.display = 'inline'
    btnSaveForServer.addEventListener('click', (e) => {
        e.preventDefault();
    const putServer = server.putFetch(curentEl.target.parentElement.parentElement.dataset.id, addCardToServer())
    formA.style.display = 'none';
    overlay.classList.remove('active');
})
}

async function editCard(curentEl){
    const pudDataFromServer = await server.getFetch(curentEl.target.parentElement.parentElement.dataset.id);
    switch (pudDataFromServer.doctor) {
         case "Кардіолог":
             const cardiology = new CardiologyParamsAddVisit();
                 cardiology.createInputsCardiology()
                 renderReception(cardiology,pudDataFromServer);
             break;
        case "Стоматолог":
            const stomatilogy = new StomatologyParamsAddVisit();
                stomatilogy.createInputsStomatology()
                renderReception(stomatilogy,pudDataFromServer);
            break;
        case "Терапевт":
            const terapevt = new TerapevtParamsAddVisit();
                terapevt.createInputsTerapevt();
                renderReception(terapevt, pudDataFromServer);
            break;
    }
}

