// const backendDomain = "http://localhost:8080/codeVerse";
const backendDomain = "https://code-verse-web-be.onrender.com/codeVerse";

const commonApi = {
    default: {
        url: backendDomain,
    },

    healthAPI: {
        url: `${backendDomain}/health`,
    },

    /** AI HELP */
    aiFeedback: {
        url: `${backendDomain}/ai/feedback`,
    },

    /** Code api */
    executionCode: {
        url: `${backendDomain}/code/execute`,
    },

    quizProgress: {
        url: (userId, lessonId) => `${backendDomain}/quiz/progress/${userId}/${lessonId}`,
    },

    startQuiz: {
        url: (userId, lessonId) => `${backendDomain}/quiz/start/${userId}/${lessonId}`,
    },

    submitQuiz: {
        url: (userId, lessonId) => `${backendDomain}/quiz/submit/${userId}/${lessonId}`,
    },

    submitQuizPer: {
        url: (userId, lessonId) => `${backendDomain}/quiz/submitPer/${userId}/${lessonId}`,
    },

    /** Discussion message */
    discussion: {
        getByLesson: (lessonId) => `${backendDomain}/discussions/lesson/${lessonId}`,
        create: `${backendDomain}/discussions`,
        reply: (parentId) => `${backendDomain}/discussions/${parentId}/reply`,
        delete: (id) => `${backendDomain}/discussions/${id}`,
        update: (id) => `${backendDomain}/discussions/${id}`,
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
    updateQr: {
        url: `${backendDomain}/api/users/updateQrCode`,
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
    courseDetail: {
        url: (courseId) => `${backendDomain}/course/${courseId}`
    },
    viewCourseRating: {
        url: (courseId) => `${backendDomain}/api/ratings/course/${courseId}`
    },
    authorCourses: {
        url: (instructorId, excludeCourseId) =>
            `${backendDomain}/course/authorOther/${instructorId}?excludeCourseId=${excludeCourseId}`,
    },
    popularCourses: {
        url: () => `${backendDomain}/course/popular`,
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

    // Notification api
    notificationUreadCount: {
        url: `${backendDomain}/notifications/user/count`
    },
    getNotifications: {
        url: `${backendDomain}/notifications/history/received`
    },
    getNotificationsSent: {
        url: `${backendDomain}/notifications/history/sent`
    },
    markRead: {
        url: (notificationId) => `${backendDomain}/notifications/${notificationId}/user/read`
    },
    markAllAsRead: {
        url: `${backendDomain}/notifications/user/mark-all-as-read`
    },
    createNotification: {
        url: `${backendDomain}/notifications`
    },

    /** Instructor api */
    getLearners: {
        url: (courseId) => `${backendDomain}/course/${courseId}/learners`
    },
    instructorCourses: {
        url: `${backendDomain}/course/instructor`
    },
    getExerciseByLessonId: {
        url: (lessonId) => `${backendDomain}/exercise/lesson/${lessonId}`
    },
    createCourse: {
        url: `${backendDomain}/course`
    },
    getModules: {
        url: (courseId) => `${backendDomain}/module/course/${courseId}`
    },
    createModule: {
        url: `${backendDomain}/module`
    },
    createLesson: {
        url: `${backendDomain}/lesson`
    },
    getTheory: {
        url: (lessonId) => `${backendDomain}/theory/lesson/${lessonId}`
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
    updateExerciseTask: {
        url: (taskId) => `${backendDomain}/exercise-task/${taskId}`
    },
    createTestCase: {
        url: `${backendDomain}/test-case`
    },
    updateTestCase: {
        url: (testCaseId) => `${backendDomain}/test-case/${testCaseId}`
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
    getMonthlyStats: {
        url: `${backendDomain}/course/monthly-stats/instructor`
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
    getActiveUsers: {
        url: `${backendDomain}/api/users/active`
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
        url: (id) => `${backendDomain}/course/admin/instructor/${id}`
    },
    getAllCoursesByAdmin: {
        url: `${backendDomain}/course/admin`
    },
    getInactiveInstructors: {
        url: `${backendDomain}/api/users/inactive-instructors`
    },
    activateInstructor: {
        url: (instructorId) => `${backendDomain}/api/users/${instructorId}/activate`
    },
    deactivateInstructor: {
        url: (instructorId) => `${backendDomain}/api/users/${instructorId}/deactivate`
    },

    /** report user api */
    userReport: {
        url: `${backendDomain}/api/user-reports`,
    },
    getReportReasons: {
        url: `${backendDomain}/api/report-reasons`
    },
    getAllReports: {
        url: `${backendDomain}/api/user-reports/list-report`
    },
    updateReportStatus: {
        url: (id) => `${backendDomain}/api/user-reports/admin-review/${id}`
    },

    instructor: {
        income: {
            url: (instructorId) => `${backendDomain}/api/instructors/${instructorId}/income`
        }
    },

    // withdrawal api
    withdrawal: {
        getMyRequests: {
            url: (instructorId) => `${backendDomain}/api/instructors/${instructorId}/withdrawals`
        },
        cancelRequest: {
            url: (instructorId, requestId) =>
                `${backendDomain}/api/instructors/${instructorId}/withdrawals/${requestId}/cancel`
        },
        createRequest: {
            url: (id) => `${backendDomain}/api/instructors/${id}/withdrawals/create`
        }
    },

    // admin withdrawal api
    admin: {
        withdrawals: {
            getAll: { url: `${backendDomain}/api/admin/withdrawals` },
            approve: { url: (id) => `${backendDomain}/api/admin/withdrawals/${id}/approve` },
            reject: { url: (id) => `${backendDomain}/api/admin/withdrawals/${id}/reject` }
        }
    }
}

export default commonApi