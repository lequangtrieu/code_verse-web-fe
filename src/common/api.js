const backendDomain = "http://localhost:8080/codeVerse";

const commonApi = {
    default: {
        url: backendDomain,
    },

    /** User api */
    signUP: {
        url: `${backendDomain}/auth/signup`,
    },
    signIn: {
        url: `${backendDomain}/auth/login`,
    },
    refreshToken: {
        url: `${backendDomain}/auth/refresh`,
    },
    googleLogin: {
        url: `${backendDomain}/auth/googleLogin`,
    },
    userDetail: {
        url: `${backendDomain}/auth/userDetail`,
    },
    resetPassword: {
        url: `${backendDomain}/auth/resetPassword`,
    },
    changePassword: {
        url: `${backendDomain}/auth/changePassword`,
    },

    /** Course api */
    course: {
        url: `${backendDomain}/course`,
    },

    /** Category api */
    category: {
        url: `${backendDomain}/category`,
    },

    /** Cart api */
    addToCartFree: {
        url: `${backendDomain}/cart/addFree`,
    },
    addToCart: {
        url: `${backendDomain}/cart/add`,
    },
    countCartDetail: {
        url: `${backendDomain}/cart/countCartDetail`,
    },
    detailCart: {
        url: `${backendDomain}/cart/details`,
    },
    removeCartItem: {
        url: `${backendDomain}/cart/remove`,
    },
    clearCart: {
        url: `${backendDomain}/cart/clear`,
    },
    checkout: {
        url: `${backendDomain}/cart/checkout`,
    },
    confirmPayment: {
        url: `${backendDomain}/cart/confirm-payment`,
    },

    /** Admin api */
    adminCourses: {
        url: `${backendDomain}/course/admin`
    },
    createCourse: {
        url: `${backendDomain}/course`
    },
    getCoursesByUser: (userId) => `${backendDomain}/course/user/${userId}`,
    getInProgressCourses: (userId) => `${backendDomain}/course/user/${userId}/in-progress`,
    getCompletedCourses: (userId) => `${backendDomain}/course/user/${userId}/completed`,
    getSuggestedCourses: (userId) => `${backendDomain}/course/user/${userId}/suggested`,

}


export default commonApi