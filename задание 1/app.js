const xmlString = `
<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>
`
const parser = new DOMParser()
const xmlDOM = parser.parseFromString(xmlString, "text/xml")
const listNode = xmlDOM.querySelector('list')
const studentNodes = [...listNode.querySelectorAll('student')]
const array = new Array()

studentNodes.forEach(student => {
  const nameNode = student.querySelector('name')
  const ageNode = student.querySelector('age')
  const profNode = student.querySelector('prof')
  const langAttr = nameNode.getAttribute('lang')

  array.push({
    name: nameNode.textContent.trim().replace(/\n/g, ""), age: Number(ageNode.textContent), prof: profNode.textContent.trim(), lang: langAttr.trim()
  })
})

const result = {
  list: array
}
console.log(result)