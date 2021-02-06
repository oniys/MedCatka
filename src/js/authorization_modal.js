 function ready(){
    const  activeButtons = document.querySelectorAll('.aut-modal'),

        overlay = document.querySelector('.over'),
        closeButtons = document.querySelectorAll('.close');
    // console.log(activeButtons)


    activeButtons.forEach(function (butItem)
    {
        butItem.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal'),
                modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
            modalElem.classList.add('active');
            overlay.classList.add('active');
        });
    });

    closeButtons.forEach(function (cloItem) {
        cloItem.addEventListener('click', function(e) {
            const parentModal = this.closest('.modal');
            parentModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    document.body.addEventListener('keyup', function (e) {
        const key = e.keyCode;
        if (key == 27) {
            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });
}

    document.addEventListener('DOMContentLoaded', ready)

