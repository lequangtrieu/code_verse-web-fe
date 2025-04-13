const backendDomain = "http://localhost:8080/codeVerse";

const commonApi = {
    default: {
        url: backendDomain,
    },

    /** User api */
    signUP: {
        url: `${backendDomain}/auth/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/auth/login`,
        method: "post"
    },
    googleLogin: {
        url: `${backendDomain}/auth/googleLogin`,
        method: "post"
    },
}


export default commonApi