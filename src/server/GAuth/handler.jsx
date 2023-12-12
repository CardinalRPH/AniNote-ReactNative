const { GoogleSignin } = require("@react-native-google-signin/google-signin");


GoogleSignin.configure({
    webClientId: process.env.WEB_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
})

export const signIn = async () => {
    try {
        const userInfo = await GoogleSignin.signIn();
        return userInfo.user
    } catch (error) {
        console.error(error);
        return error
    }
}

export const signOut = async () => {
    try {
        await GoogleSignin.signOut()
        return null
    } catch (error) {
        console.error(error);
        return error;
    }
}