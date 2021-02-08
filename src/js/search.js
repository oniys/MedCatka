const selectSearch = document.getElementById('prioritySearch')

selectSearch.onchange = function() {
    const indexSelected = selectSearch.selectedIndex,
        options = selectSearch.querySelectorAll('option')[indexSelected];
    const cardContainerAllId = document.querySelectorAll(".cardContainer")
    cardContainerAllId.forEach(elements => {
        if(elements.children[0].children[3].textContent.indexOf(`${options.value}`) !== -1){
            elements.style.display = 'block';
        }else if(options.value === selectSearch.querySelectorAll('option')[0].value) {
            elements.style.display = 'block';
        }
        else {
            elements.style.display = 'none';
        }
    })
}