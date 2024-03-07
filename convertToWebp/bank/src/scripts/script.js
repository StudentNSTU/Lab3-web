const deposit_type = document.getElementsByClassName('deposit')[0]
const deposit_period = document.getElementsByClassName('deposit-period')[0]
const result = document.getElementsByClassName('result-text')[0]
const calc_btn = document.getElementsByClassName('calc')[0]
const depValue = document.getElementsByClassName('value')[0]
const depValueInput = document.getElementsByClassName('value-input')[0]
const reactDevCheckbox = document.getElementsByClassName('react-dev-inp')[0]
const { emergencyPeriods, replenishedPeriods } = require("./periods")

import './../style.css';

window.addEventListener('load', () => {
    changeDepositPeriod(deposit_type.value)
    depValue.innerText = depValueInput.value + '₽'
})

calc_btn.addEventListener('click', renderResult)
deposit_type.addEventListener('change', () => changeDepositPeriod(deposit_type.value))
depValueInput.addEventListener('input', () => depValue.innerText = depValueInput.value + '₽')

function changeDepositPeriod(dep_type) {

    deposit_period.innerHTML = ''

    switch (dep_type) {
        case 'Пополняемый': {
            renderPeriod(replenishedPeriods)
            break;
        }
        case 'Срочный': {
            renderPeriod(emergencyPeriods)
            break;
        }
    }
}


function renderPeriod(arr) {
    arr.forEach((element) => {
        const option = document.createElement('option')
        option.innerHTML = `${element.period} - ${element.percents}%`
        deposit_period.append(option)
    })
}

function renderResult() {

    const depPeriodType = {
        monthCout: deposit_period.value.split(' ')[0],
        monthText: deposit_period.value.split(' ')[1],
        percent: parseInt(deposit_period.value.split(' ')[3].replace('%', ''))
    }

    if (reactDevCheckbox.checked)
        depPeriodType.percent += 5

    const finalResult = parseInt(depValueInput.value) * (depPeriodType.percent / 100) * (depPeriodType.monthCout / 12)

    result.innerHTML = `Вклад "${deposit_type.value}" на срок  "${depPeriodType.monthCout +
        ' ' + depPeriodType.monthText}" на сумму ${depValueInput.value}₽<br/><br/>
    
    В конце срока вы получите ${finalResult}₽`
}

