import { Avatar } from "@rneui/base"
import { Icon, ListItem } from "@rneui/themed"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../hooks/authState"

const default_img_uri = 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'
const SideBar = () => {
    const { state } = useAuth()
    return (
        <SafeAreaView style={{ justifyContent: 'space-between', height: '100%' }}>
            <View>
                <ListItem containerStyle={{ backgroundColor: 'grey' }}>
                    <Avatar size='medium' rounded source={{ uri: state.user ? state.user.photo : default_img_uri }} />
                    <ListItem.Content>
                        <ListItem.Title h4 style={{ color: 'white' }}>{ state.user? state.user.givenName:'NUll'}</ListItem.Title>
                        <ListItem.Subtitle>{ state.user? state.user.familyName:'Null'}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
            <ListItem containerStyle={{ backgroundColor: 'grey' }}>
                <Icon name="logout" size={30} color="white" type='material-community' />
                <ListItem.Content>
                    <ListItem.Title style={{ color: 'white' }}>LogOut</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </SafeAreaView>
    )
}

export default SideBar