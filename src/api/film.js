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
        data: parameter
    })
}

export function getMovieById(parameter) {
    return axios({
        url: api.getMovieById,
        method: 'post',
        data: parameter
    })
}

export function getMovieByRating(parameter) {
    return axios({
        url: api.getMovieByRating,
        method: 'post',
        data: parameter
    })
}

export function updateRatingByUserId(parameter) {
    return axios({
        url: api.updateRatingByUserId,
        method: 'post',
        data: parameter
    })
}


export function InsertDelMovieList(parameter) {
    return axios({
        url: api.InsertDelMovieList,
        method: 'post',
        data: parameter
    })
}

export function delRatingByUserId(parameter) {
    return axios({
        url: api.delRatingByUserId,
        method: 'post',
        data: parameter
    })
}

export function getMovieByKeyWord(parameter) {
    return axios({
        url: api.getMovieByKeyWord,
        method: 'post',
        data: parameter
    })
}

export function InsertMovieLists(parameter) {
    return axios({
        url: api.InsertMovieLists,
        method: 'post',
        data: parameter
    })
}

export function getUserMovieListCount(parameter) {
    return axios({
        url: api.getUserMovieListCount,
        method: 'post',
        data: parameter
    })
}

export function getMovieListByUserId(parameter) {
    return axios({
        url: api.getMovieListByUserId,
        method: 'post',
        data: parameter
    })
}

export function getMovieByUserRecommend(parameter) {
    return axios({
        url: api.getMovieByUserRecommend,
        method: 'post',
        data: parameter
    })
}

export function updateMovieList(parameter) {
    return axios({
        url: api.updateMovieList,
        method: 'post',
        data: parameter
    })
}

export function deleteMovieList(parameter) {
    return axios({
        url: api.deleteMovieList,
        method: 'post',
        data: parameter
    })
}

export function getMovieListNameByUserId(parameter) {
    return axios({
        url: api.getMovieListNameByUserId,
        method: 'post',
        data: parameter
    })
}

export function insertMovieToList(parameter) {
    return axios({
        url: api.insertMovieToList,
        method: 'post',
        data: parameter
    })
}

export function removeMovieFromList(parameter) {
    return axios({
        url: api.removeMovieFromList,
        method: 'post',
        data: parameter
    })
}