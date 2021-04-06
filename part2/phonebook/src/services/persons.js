import axios from 'axios'
const personsEndpoint = 'http://localhost:3001/persons'

const getAll = () => {
    const request =  axios.get(personsEndpoint);
    return request.then(response => response.data);
}

const create = newPerson => {
    const request = axios.post(personsEndpoint, newPerson);
    return request.then(response => response.data);
}

const personService = {
    getAll: getAll,
    create: create
}

export default personService