const api = {
    Login: '/user/login',
    logout: '/user/logout',
    ForgePassword: '/auth/forge-password',
    Register: '/auth/register',
    twoStepCode: '/user/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    // get my info
    userInfo: '/user/info',
    // property-add
    oneStep: '/oneStep',
    getMovieByPages: '/movie/getMovieByPages',
    getCurrentRatePeople: '/movie/getCurrentRatePeople',
    getMovieBySelectStatus: '/movie/getMovieBySelectStatus',
    getMovieById: '/movie/getMovieById',
    getMovieByRating: '/movie/getMovieByRating',
    updateRatingByUserId: '/movieRating/updateRatingByUserId',
    delRatingByUserId: 'movieRating/delRatingByUserId',
    InsertDelMovieList: '/movieList/InsertDelMovieList',
    getMovieByKeyWord: '/movie/getMovieByKeyWord',
    InsertMovieLists: '/movieList/InsertMovieLists',
    getUserMovieListCount: '/movieList/getUserMovieListCount',
    getMovieListByUserId: '/movieList/getMovieListByUserId',
    getMovieByUserRecommend: '/movie/getMovieByUserRecommend',
    updateMovieList: '/movieList/updateMovieList',
    deleteMovieList: '/movieList/deleteMovieList',
    getMovieListNameByUserId: '/movieList/getMovieListNameByUserId',
    insertMovieToList: '/movieList/insertMovieToList'
}
export default api
