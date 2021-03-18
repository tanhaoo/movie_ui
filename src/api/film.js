import {axios} from "@/utils/request";
import api from "@/api/index";


export function getMovieByPages(parameter) {
    return axios({
        url: api.getMovieByPages,
        method: 'post',
        data: parameter
    })

}