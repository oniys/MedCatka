const email = document.querySelector('#login'),
    password = document.querySelector('#password'),
    signIn = document.querySelector('#check'),
    switchBtnSign = document.querySelector('.switchBtnSign'),
    switchBtnAdd = document.querySelector('.switchBtnAdd'),
    modalWindow =document.querySelector('.modal'),
    overlay = document.querySelector('.overlay');

const server = new Fetch();
    signIn.addEventListener('click',  function (e) {
        e.preventDefault()
            server.getToken(email.value, password.value).then(data=>{
                if(data){
                    server.saveToken(data)
                    modalWindow.style.display = 'none';
                    overlay.classList.remove('active')
                    switchBtnAdd.style.visibility ='visible';
                    switchBtnSign.style.visibility = 'hidden';
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

async function testOfCreated() {
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
            btnSeeMore.setAttribute('data-show', 'true')
            btnChangeCard.classList.add('cardChangeCard');
            btnRemove.classList.add('cardRemove');
            btnChange.textContent = 'Змінити';
            btnSeeMore.textContent = 'Показати більше';
            btnChangeCard.textContent = 'Змінити карточку';
            btnRemove.textContent = 'Видалити карточку';
            div.classList.add('cardContainer');

            btnChangeCard.style.display = 'none';
            btnRemove.style.display = 'none';


         document.querySelector('.form-search').append(formOfCard)
    
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
                        changeCardf(btnChange,btnChangeCard,btnRemove)
                        seeMoreCardf(btnSeeMore)
                        btnGroup.append(btnChange,btnChangeCard,btnRemove,btnSeeMore)
                        div.append(btnGroup)
                 return  formOfCard.append(div)
        })
    }

    function changeCardf (btnChange,btnChangeCard,btnRemove){
        btnChange.addEventListener('click', function(e) {
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
                        console.log(element)
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
testOfCreated()
