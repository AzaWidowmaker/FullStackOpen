import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

function getAll() {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

function create(personObject) {
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

function deletePerson(id) {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

function update(id, updatedPerson) {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    deletePerson,
    update
}