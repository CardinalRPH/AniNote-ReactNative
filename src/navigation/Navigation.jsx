import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AddScreen from "../screens/AddScreen";
import SideBar from "../components/organisms/SideBar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddEditFormScreen from "../screens/AddEditFormScreen";
import PreviewScreen from "../screens/PreviewScreen";

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
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={() => <SideBar />} screenOptions={{headerShown:false, swipeEnabled:false}}>
                <Drawer.Screen name="Main" component={MainStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;