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
    delRatingByUserId:'movieRating/delRatingByUserId',
    InsertDelMovieList: '/movieList/InsertDelMovieList',

}
export default api
