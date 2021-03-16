import {axios} from "@/utils/request";

export function selectCompany() {
    return axios({
        url: '/estate/selectCompany',
        method: 'get'
    })
}

export function insertEstate(parameter) {
    return axios({
        url: '/estate/insertEstate',
        method: 'post',
        data: parameter
    })
}

export function selectBuilding(parameter) {
    return axios({
        url: '/estate/selectBuilding',
        method: 'post',
        data: parameter
    })
}

export function updateBuilding(parameter) {
    return axios({
        url: '/estate/updateBuilding',
        method: 'post',
        data: parameter
    })
}

export function selectUnit(parameter) {
    return axios({
        url: '/estate/selectUnit',
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json'
        }//415
    })
}

export function updateUnit(parameter) {
    return axios({
        url: '/estate/updateUnit',
        method: 'post',
        data: parameter,
    })
}

export function insertCell(parameter) {
    return axios({
        url: '/estate/insertCell',
        method: 'post',
        data: parameter,
        headers: {
            'Content-Type': 'application/json'
        }//415
    })
}


export function selectEstate(parameter) {
    return axios({
        url: '/estate/selectEstate',
        method: 'post',
        data: parameter
    })
}