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
    googleLogin: {
        url: `${backendDomain}/auth/googleLogin`,
    },
    userDetail: {
        url: `${backendDomain}/auth/userDetail`,
    },
    resetPassword: {
        url: `${backendDomain}/auth/resetPassword`,
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
}


export default commonApi