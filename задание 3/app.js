const resultNode = document.querySelector('.result1')
const btnNode = document.querySelector('.button1')
const inputNode = document.querySelector('.input1')

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = function () {
        if (xhr.status !== 200) {
            console.log('Статус ответа: ', xhr.status)
        } else {
            const result = JSON.parse(xhr.response)
            if (callback) {
                callback(result)
            }
        }
    }
    xhr.onerror = function () {
        console.log('Ошибка! Статус ответа: ', xhr.status)
    }
    xhr.send()
}

function displayResult(apiData) {
    let cards = ''

    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img class="card__img1" src="${item.download_url}">
            <p class="card__title">${item.author}</p>
        </div>
        `
        cards += cardBlock
        resultNode.innerHTML = cards
    })
}

btnNode.addEventListener('click', () => {
    if(inputNode.value < 1 || inputNode.value > 10 || isNaN(inputNode.value)) {
        resultNode.innerHTML = 'число вне диапазона от 1 до 10'
    } else {
        useRequest(`https://picsum.photos/v2/list/?limit=${inputNode.value}`, displayResult)
    }
})