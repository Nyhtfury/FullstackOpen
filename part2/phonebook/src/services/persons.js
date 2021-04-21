import axios from 'axios'
const personsEndpoint = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(personsEndpoint)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            throw error;
        });
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
        .catch(error => {
            console.log(error);
            throw error;
        })
}

const create = newPerson => {
    return axios
        .post(personsEndpoint, newPerson)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
            throw error;
        });
}

const update = (id, newPerson) => {
    return axios
        .put(`${personsEndpoint}/${id}`, newPerson)
        .catch(error => {
            console.log(error);
            throw error;
        });
}

const remove = id => {
    return axios
        .delete(`${personsEndpoint}/${id}`)
        .catch(error => {
            console.log(error);
            throw error;
        });
}

const personService = {
    getAll: getAll,
    getPersonId: getPersonId,
    create: create,
    update: update,
    remove: remove
}

export default personService