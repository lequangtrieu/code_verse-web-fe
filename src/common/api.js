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
    viewProfile: {
        url: `${backendDomain}/api/users/myInfo`,
    },
    updateProfile: {
        url: `${backendDomain}/api/users/updateMyInfo`,
    },
    updateAvatar: {
        url: `${backendDomain}/api/users/updateAvatar`,
    },

    /** Course api */
    course: {
        url: `${backendDomain}/course`,
    },
    getCourseDetails: {
        url: (courseId, userId) => `${backendDomain}/course/${userId}/${courseId}/lesson`,
    },
    submitCode: {
        url: () => `${backendDomain}/course/submitCode`,
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
    getExerciseByLessonId: {
        url: (lessonId) => `${backendDomain}/exercise/lesson/${lessonId}`
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
    createExercise: {
        url: `${backendDomain}/exercise`
    },
    createExerciseTask: {
        url: `${backendDomain}/exercise-task`
    },
    createTestCase: {
        url: `${backendDomain}/test-case`
    },
    createQuizBank: {
        url: (lessonId) => `${backendDomain}/quiz/lesson/${lessonId}`
    },
    validateCourse: {
        url: (courseId) => `${backendDomain}/course/${courseId}/validate`
    },
    updateCourseModule: {
        url: (moduleId) => `${backendDomain}/module/${moduleId}`
    },
    updateLesson: {
        url: (lessonId) => `${backendDomain}/lesson/${lessonId}`
    },
    updateCourseStatus: {
        url: (courseId) => `${backendDomain}/course/${courseId}/status`
    },
    getCoursesByUser: (userId) => `${backendDomain}/course/user/${userId}`,
    getInProgressCourses: (userId) => `${backendDomain}/course/user/${userId}/in-progress`,
    getCompletedCourses: (userId) => `${backendDomain}/course/user/${userId}/completed`,
    getSuggestedCourses: (userId) => `${backendDomain}/course/user/${userId}/suggested`,
    instructorGetCourse: {
        url: (id) => `${backendDomain}/course/${id}/for-instructor`
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