import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { Text } from "@rneui/themed";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { signIn } from "../server/GAuth/handler";
import { useAuth } from "../hooks/authState";

const AuthScreen = () => {
    const { dispatch } = useAuth()

    const handleSignIn = async () => {
        try {
            const user = await signIn()
            dispatch({ type: 'LOGIN', payload: user })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaProvider>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Text h4>Welcome to AniNote</Text>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={handleSignIn}
                />
            </View>
        </SafeAreaProvider>
    )
}
export default AuthScreen;