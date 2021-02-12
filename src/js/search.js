const selectSearch = document.getElementById('prioritySearch')
const searhInput = document.querySelector('.search-place');

selectSearch.onchange = function () {
    const indexSelected = selectSearch.selectedIndex,
        options = selectSearch.querySelectorAll('option')[indexSelected];
    document.querySelectorAll(".cardContainer").forEach(elements => {
        seach(elements, options.value)
    })
}

searhInput.oninput = function () {
    document.querySelectorAll(".cardContainer").forEach(elements => {
        seach(elements, searhInput.value)
    })
};

function seach(elements, val) {
    if (elements.children[0].textContent.indexOf(`${val}`) !== -1) {
        elements.style.display = 'table';
    } else if (val === selectSearch.querySelectorAll('option')[0].value) {
        elements.style.display = 'table';
    } else {
        elements.style.display = 'none';
    }
}
