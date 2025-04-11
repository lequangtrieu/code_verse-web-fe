const backendDomain = "http://localhost:8080";

const commonApi = {
    default: {
        url: backendDomain,
    },

    /** User api */
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    googleLogin: {
        url: `${backendDomain}/api/googleLogin`,
        method: "post"
    },
}


export default commonApi