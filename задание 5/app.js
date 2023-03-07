const resultNode = document.querySelector('.result3')
const inputNumberPageNode = document.querySelector('.input3-number-page')
const inputLimitNode = document.querySelector('.input3-limit')
const btnNode = document.querySelector('.button3')

if(JSON.parse(localStorage.getItem("images"))) {
    showCards()
}

const useRequest = (url) => {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            let imagesData = []
            data.forEach(item => {
                imagesData.push({
                    imageSrc: item.download_url,
                })
            })
            localStorage.setItem("images", JSON.stringify(imagesData))
            showCards()
        })
        .catch(() => {
            console.log('error')
        })
}

function showCards() {
    let cards = ''
    const data = JSON.parse(localStorage.getItem("images"))

    data.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img class="card__img1" src="${item.imageSrc}">
            </div>
        `
        cards += cardBlock
        resultNode.innerHTML = cards
    })
}

btnNode.addEventListener('click', async () => {
    if ((inputNumberPageNode.value < 1 || inputNumberPageNode.value > 10 || isNaN(inputNumberPageNode.value)) && (inputLimitNode.value < 1 || inputLimitNode.value > 10 || isNaN(inputLimitNode.value))) {
        resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10'
    } else if (inputNumberPageNode.value < 1 || inputNumberPageNode.value > 10 || isNaN(inputNumberPageNode.value)) {
        resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10'
    } else if (inputLimitNode.value < 1 || inputLimitNode.value > 10 || isNaN(inputLimitNode.value)) {
        resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10'
    } else {
        await useRequest(`https://picsum.photos/v2/list?page=${inputNumberPageNode.value}&limit=${inputLimitNode.value}`)
    }
})