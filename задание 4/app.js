const resultNode = document.querySelector('.result2')
const inputNode1 = document.querySelector('.input2-width')
const inputNode2 = document.querySelector('.input2-height')
const btnNode = document.querySelector('.button2')

const useRequest = (url) => {
    return fetch(url)
        .then((response) => {
            return response
        })
        .then((data) => {
            const cardBlock = `
                    <div class="card">
                        <img class="card__img2" src="${data.url}">
                    </div>
                    `
            resultNode.innerHTML = cardBlock
        })
        .catch(() => {
            console.log('error')
        })
}

btnNode.addEventListener('click', async () => {
    if (inputNode1.value < 100 || inputNode1.value > 300 || isNaN(inputNode1.value)) {
        resultNode.innerHTML = 'одно из чисел вне диапазона от 100 до 300'
    } else if (inputNode2.value < 100 || inputNode2.value > 300 || isNaN(inputNode2.value)) {
        resultNode.innerHTML = 'одно из чисел вне диапазона от 100 до 300'
    } else {
        await useRequest(`https://picsum.photos/${inputNode1.value}/${inputNode2.value}`)
    }
})