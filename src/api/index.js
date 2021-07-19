const api = {
    Login: '/user/login',
    logout: '/user/logout',
    uploadImage: '/user/uploadImage',
    ForgePassword: '/auth/forge-password',
    register: '/user/register',
    twoStepCode: '/user/2step-code',
    // get my info
    userInfo: '/user/info',
    updateUserByName: '/user/updateUserByName',
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
    insertMovieToList: '/movieList/insertMovieToList',
    removeMovieFromList: '/movieList/removeMovieFromList'
}
export default api
