import {axios} from "@/utils/request";
import api from "@/api/index";


export function getMovieByPages(parameter) {
    return axios({
        url: api.getMovieByPages,
        method: 'post',
        data: parameter
    })
}

export function getCurrentRatePeople() {
    return axios({
        url: api.getCurrentRatePeople,
        method: 'post',
    })
}


export function getMovieBySelectStatus(parameter) {
    return axios({
        url: api.getMovieBySelectStatus,
        method: 'post',
        data:parameter
    })
}

export function getMovieById(parameter) {
    return axios({
        url: api.getMovieById,
        method: 'post',
        data:parameter
    })
}

export function getMovieByRating(parameter) {
    return axios({
        url: api.getMovieByRating,
        method: 'post',
        data:parameter
    })
}

export function updateRatingByUserId(parameter) {
    return axios({
        url: api.updateRatingByUserId,
        method: 'post',
        data:parameter
    })
}


export function InsertDelMovieList(parameter) {
    return axios({
        url: api.InsertDelMovieList,
        method: 'post',
        data:parameter
    })
}

export function delRatingByUserId(parameter) {
    return axios({
        url: api.delRatingByUserId,
        method: 'post',
        data:parameter
    })
}