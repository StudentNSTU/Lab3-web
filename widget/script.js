const input = document.getElementsByClassName('vacancy-input')[0];

input.addEventListener('input', ()=>searchVacancy());

async function searchVacancy(page = 1) {

    const vacancy = await fetch(`https://api.hh.ru/vacancies?text=${input.value}&per_page=10&page=${page}`).then(res => res.json()).then(res => res.items);
    const vacancyCount = await fetch(`https://api.hh.ru/vacancies?clusters=true&per_page=0&text=${input.value}`).then(res => res.json()).then(res => res.found);

    renderVacancy(vacancy, vacancyCount)
    renderPages(page, vacancyCount)
}

function renderVacancy(vacancy) {

    const vacancyContainer = document.getElementsByClassName('vacancy-container')[0];
    vacancyContainer.innerHTML = '';

    vacancy.forEach(element => {
        const div = document.createElement('div');
        div.className = 'vacancy';
        div.innerHTML = `
            <a href="${element.alternate_url}" target="_blank">
                <b>${element.name}</b>
            </a>
            <p class="area">${element.area.name}</p>
            <p class="experience">Опыт: ${element.experience.name}</p>
        `
        vacancyContainer.append(div);
    });
}

function renderPages(activePage, vacancyCount){
    const pagesContainer = document.getElementsByClassName('pages')[0];

    pagesContainer.innerHTML ='';

    const pagesCount = vacancyCount/10

    const prevLimit = activePage - 1 == 0 ? 1 : activePage - 1
    const maxLimit = activePage + 5 > pagesCount ? pagesCount : activePage + 5

    for(let i = prevLimit; i < maxLimit; i++){
        const p = document.createElement('p');
        if(i == activePage)
            p.className = 'page active';
        else
            p.className = 'page';
        p.addEventListener('click', changePage)
        p.innerText = `${i}`;
        pagesContainer.append(p);
    }
}

function changePage(e){
    e.target.classList.add('active')
    searchVacancy(parseInt(e.target.innerText))
    window.scrollTo(0,0)
}