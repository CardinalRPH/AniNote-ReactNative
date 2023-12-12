import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AddScreen from "../screens/AddScreen";
import SideBar from "../components/organisms/SideBar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddEditFormScreen from "../screens/AddEditFormScreen";
import PreviewScreen from "../screens/PreviewScreen";
import AuthScreen from "../screens/AuthScreen";
import { useAuth } from "../hooks/authState";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Add" component={AddScreen} />
            <Stack.Screen name="AddEditForm" component={AddEditFormScreen} />
            <Stack.Screen name="AnimePreview" component={PreviewScreen} />
        </Stack.Navigator>
    )
}
const Navigation = () => {
    const {state} = useAuth()
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={() => <SideBar />} screenOptions={{headerShown:false, swipeEnabled:false}}>
                <Drawer.Screen name="Main" component={state.isAuthenticated? MainStack: AuthScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;