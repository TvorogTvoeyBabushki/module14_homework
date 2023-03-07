// Задание 1

// const xmlString = `
// <list>
// <student>
//   <name lang="en">
//     <first>Ivan</first>
//     <second>Ivanov</second>
//   </name>
//   <age>35</age>
//   <prof>teacher</prof>
// </student>
// <student>
//   <name lang="ru">
//     <first>Петр</first>
//     <second>Петров</second>
//   </name>
//   <age>58</age>
//   <prof>driver</prof>
// </student>
// </list>
// `
// const parser = new DOMParser()
// const xmlDOM = parser.parseFromString(xmlString, "text/xml")
// const listNode = xmlDOM.querySelector('list')
// const studentNodes = [...listNode.querySelectorAll('student')]
// const array = new Array()

// studentNodes.forEach(student => {
//   const nameNode = student.querySelector('name')
//   const ageNode = student.querySelector('age')
//   const profNode = student.querySelector('prof')
//   const langAttr = nameNode.getAttribute('lang')

//   array.push({
//     name: nameNode.textContent.trim().replace(/\n/g, ""), age: Number(ageNode.textContent), prof: profNode.textContent.trim(), lang: langAttr.trim()
//   })
// })

// const result = {
//   list: array
// }
// console.log(result)

// Задание 2

// function convertJSONToObject(a) {
//   const data = JSON.parse(a)
//   return data
// }
// console.log(convertJSONToObject(`{
//   "list": [
//     {
//       "name": "Petr",
//       "age": "20",
//       "prof": "mechanic"
//     },
//     {
//       "name": "Vova",
//       "age": "60",
//       "prof": "pilot"
//     }
//   ]
// }`))

// Задание 3

// const resultNode = document.querySelector('.result1')
// const btnNode = document.querySelector('.button1')
// const inputNode = document.querySelector('.input1')

// function useRequest(url, callback) {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', url)
//     xhr.onload = function () {
//         if (xhr.status !== 200) {
//             console.log('Статус ответа: ', xhr.status)
//         } else {
//             const result = JSON.parse(xhr.response)
//             if (callback) {
//                 callback(result)
//             }
//         }
//     }
//     xhr.onerror = function () {
//         console.log('Ошибка! Статус ответа: ', xhr.status)
//     }
//     xhr.send()
// }

// function displayResult(apiData) {
//     let cards = ''

//     apiData.forEach(item => {
//         const cardBlock = `
//         <div class="card">
//             <img class="card__img1" src="${item.download_url}">
//             <p class="card__title">${item.author}</p>
//         </div>
//         `
//         cards += cardBlock
//         resultNode.innerHTML = cards
//     })
// }

// btnNode.addEventListener('click', () => {
//     if(inputNode.value < 1 || inputNode.value > 10 || isNaN(inputNode.value)) {
//         resultNode.innerHTML = 'число вне диапазона от 1 до 10'
//     } else {
//         useRequest(`https://picsum.photos/v2/list/?limit=${inputNode.value}`, displayResult)
//     }
// })

// Задание 4

// const resultNode = document.querySelector('.result2')
// const inputNode1 = document.querySelector('.input2-width')
// const inputNode2 = document.querySelector('.input2-height')
// const btnNode = document.querySelector('.button2')

// const useRequest = (url) => {
//     return fetch(url)
//         .then((response) => {
//             return response
//         })
//         .then((data) => {
//             const cardBlock = `
//                     <div class="card">
//                         <img class="card__img2" src="${data.url}">
//                     </div>
//                     `
//             resultNode.innerHTML = cardBlock
//         })
//         .catch(() => {
//             console.log('error')
//         })
// }

// btnNode.addEventListener('click', async () => {
//     if (inputNode1.value < 100 || inputNode1.value > 300 || isNaN(inputNode1.value)) {
//         resultNode.innerHTML = 'одно из чисел вне диапазона от 100 до 300'
//     } else if (inputNode2.value < 100 || inputNode2.value > 300 || isNaN(inputNode2.value)) {
//         resultNode.innerHTML = 'одно из чисел вне диапазона от 100 до 300'
//     } else {
//         await useRequest(`https://picsum.photos/${inputNode1.value}/${inputNode2.value}`)
//     }
// })

// Задание 5

const resultNode = document.querySelector('.result3')
const inputNumberPageNode = document.querySelector('.input3-number-page')
const inputLimitNode = document.querySelector('.input3-limit')
const btnNode = document.querySelector('.button3')

if(localStorage.getItem("images")) {
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
            localStorage.setItem("images", imagesData)
            showCards()
        })
        .catch(() => {
            console.log('error')
        })
}

function showCards() {
    let cards = ''
    const data = localStorage.getItem("images")

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