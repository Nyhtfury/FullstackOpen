import axios from 'axios'
const personsEndpoint = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(personsEndpoint)
        .then(response => response.data)
        .catch(response => console.log(response));
}

const getPersonId = personName => {
    return axios
        .get(personsEndpoint)
        .then(response => {
            for (let person of response.data) {
                if (person.name === personName)
                    return person.id;
            }
            return -1;
        })
        .catch(response => {
            console.log(response);
            return -1;
        })
}

const create = newPerson => {
    return axios
        .post(personsEndpoint, newPerson)
        .then(response => response.data)
        .catch(response => console.log(response));
}

const update = (id, newPerson) => {
    return axios
        .put(`${personsEndpoint}/${id}`, newPerson)
        .catch(response => console.log(response));
}

const remove = id => {
    return axios
        .delete(`${personsEndpoint}/${id}`)
        .catch(response => console.log(response));
}

const personService = {
    getAll: getAll,
    getPersonId: getPersonId,
    create: create,
    update: update,
    remove: remove
}

export default personService