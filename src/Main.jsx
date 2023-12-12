import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import Toast from 'react-native-toast-message';
import { CusStateDataProvider } from './hooks/dataAllState';
import { ReadDataStateProvider } from './hooks/readDataState';
import { AuthProvider } from './hooks/authState';

const Main = () => {
    return (
        <AuthProvider>
            <CusStateDataProvider>
                <ReadDataStateProvider>
                    <Navigation />
                    <StatusBar style="auto" />
                    <Toast />
                </ReadDataStateProvider>
            </CusStateDataProvider>
        </AuthProvider>
    );
}


export default Main;
