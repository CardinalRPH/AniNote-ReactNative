import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import Toast from 'react-native-toast-message';
import { CusStateDataProvider } from './hooks/dataAllState';
import { ReadDataStateProvider } from './hooks/readDataState';

const Main = () => {
    return (
        <CusStateDataProvider>
            <ReadDataStateProvider>
                <Navigation />
                <StatusBar style="auto" />
                <Toast />
            </ReadDataStateProvider>
        </CusStateDataProvider>
    );
}


export default Main;
