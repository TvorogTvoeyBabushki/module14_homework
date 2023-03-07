function convertJSONToObject(a) {
  const data = JSON.parse(a)
  return data
}
console.log(convertJSONToObject(`{
  "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
  ]
}`))