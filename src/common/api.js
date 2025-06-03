const backendDomain = "http://localhost:8080/codeVerse";

const commonApi = {
    default: {
        url: backendDomain,
    },

    /** Code api */
    executionCode: {
        url: `${backendDomain}/code/execute`,
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

    /** Instructor api */
    instructorCourses: {
        url: `${backendDomain}/course/instructor`
    },
    createCourse: {
        url: `${backendDomain}/course`
    },
    createModule: {
        url: `${backendDomain}/module`
    },
    createLesson: {
        url: `${backendDomain}/lesson`
    },
    createTheory: {
        url: `${backendDomain}/theory`
    },
    getCoursesByUser: (userId) => `${backendDomain}/course/user/${userId}`,
    getInProgressCourses: (userId) => `${backendDomain}/course/user/${userId}/in-progress`,
    getCompletedCourses: (userId) => `${backendDomain}/course/user/${userId}/completed`,
    getSuggestedCourses: (userId) => `${backendDomain}/course/user/${userId}/suggested`,
    adminGetCourse: {
        url: (id) => `${backendDomain}/course/admin/${id}`
    },
    updateCourse: {
        url: (id) => `${backendDomain}/course/${id}`
    },
    getAllUsers: {
        url: `${backendDomain}/api/users`
    },
    lockUser: {
        url: (id) => `${backendDomain}/api/users/${id}/lock`
    },
    createLearnerByExcel: {
        url: `${backendDomain}/api/users/import`
    },
    getUserDetailInfoByUserID: {
        url: (id) => `${backendDomain}/api/users/admin/detailUser/${id}`
    },
    getAllCourseByLearnerID: {
        url: (id) => `${backendDomain}/course/user/${id}/all-courses`
    },
    getAllCoursesByInstructorID: {
        url: (id) => `${backendDomain}/course/instructor/${id}`
    },
    getAllCoursesByAdmin: {
        url: `${backendDomain}/course/admin`
    },
}

export default commonApi