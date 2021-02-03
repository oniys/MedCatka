class creareCard {
    constructor(parentEl){
            this.parentEl = parentEl;
    }
    createNewCardForm(){
        this.elements = {
            blockCard: document.createElement('div'),
            writeForDoctor: document.createElement('div'),
            cardIcon: document.createElement('img'),
            cardIconText: document.createElement('p'),
            formOfCard: document.createElement('form'),
            nameDoctor:document.createElement('p'),
            namePartient: document.createElement('p'),
            targetPartient: document.createElement('p'),
            descriptionPartient: document.createElement('p'),
            urgencyPartient: document.createElement('p'),
            pressurePartient: document.createElement('p'),
            indexPartient: document.createElement('p'),
            agePartient: document.createElement('p'),
            lastVisitPartient: document.createElement('p'),
            btnChange: document.createElement('button'),
            btnSeeMore:document.createElement('button'),
            btnChangeCard: document.createElement('button'),
            btnRemove:document.createElement('button'),
    }
    const { blockCard, writeForDoctor,formOfCard,nameDoctor,namePartient,btnChange,btnSeeMore,btnChangeCard,btnRemove,cardIcon ,cardIconText} = this.elements;
            blockCard.classList.add('cardContainer');
             writeForDoctor.classList.add('cardBlockImg')
            cardIcon.classList.add('cardIcon');
            cardIconText.classList.add('cardIconText');
            formOfCard.classList.add('cardForm');
            nameDoctor.classList.add('cardDoctor');
            namePartient.classList.add('cardPatient');
            btnChange.classList.add('cardChange');
            btnSeeMore.classList.add('cardSeeMore');
            btnChangeCard.classList.add('cardChangeCard');
            btnRemove.classList.add('cardRemove');


             cardIcon.src = '../img/vector.png';
             cardIcon.style.cursor = 'pointer';
             nameDoctor.style.paddingBottom = '5px';
             cardIconText.textContent = 'Запис до лікаря';
             btnChange.textContent = 'Змінити';
             btnSeeMore.textContent = 'Показати більше';
             btnChangeCard.textContent = 'Змінити карточку';
             btnRemove.textContent = 'Видалити карточку';

             btnChangeCard.style.display = 'none';
             btnRemove.style.display = 'none';

        writeForDoctor.append(cardIcon,cardIconText)
        formOfCard.append(nameDoctor,namePartient,btnChange,btnChangeCard,btnRemove,btnSeeMore)
        blockCard.append(writeForDoctor,formOfCard)
    }

    handHelper(){
        
        const { btnChange,btnSeeMore,btnChangeCard,btnRemove} = this.elements;
        btnChange.addEventListener('click', function() {
            if (btnChangeCard.style.display === 'none') {
                btnChangeCard.style.display = 'block';
                btnRemove.style.display = 'block';
            } else {
                btnChangeCard.style.display = 'none';
                btnRemove.style.display = 'none';
            }
        })
    }
    render(){
        this.handHelper()
        const { blockCard, writeForDoctor,formOfCard,nameDoctor,namePartient,cardIcon ,cardIconText} = this.elements;
        const cardInfoFromServer = server.getFetch().then(data=> {
            data.forEach(el=>{
                nameDoctor.textContent = `Лікар : ${el.doctor}`
                namePartient.textContent = `ФИО : ${el.FullName}`
            })
    })


        this.parentEl.append(blockCard)
    }
}
 const newCard = new creareCard(document.querySelector('.form-search'))
newCard.createNewCardForm()
newCard.render()
