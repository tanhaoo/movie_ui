import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
    return axios({
        url: api.Login,
        method: 'post',
        data: parameter
    })
}

export function register(parameter) {
    return axios({
        url: api.register,
        method: 'post',
        data: parameter
    })
}

export function getInfo() {
    return axios({
        url: api.userInfo,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export function getCurrentUserNav(token) {
    return axios({
        url: '/user/nav',
        method: 'get'
    })
}

export function logout() {
    return axios({
        url: api.logout,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step(parameter) {
    return axios({
        url: api.twoStepCode,
        method: 'post',
        data: parameter
    })
}

export function uploadImage(parameter) {
    return axios({
        url: api.uploadImage,
        method: 'post',
        data: parameter
    })
}

export function updateUserByName(parameter) {
    return axios({
        url: api.updateUserByName,
        method: 'post',
        data: parameter
    })
}