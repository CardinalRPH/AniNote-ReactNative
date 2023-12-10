import { Avatar } from "@rneui/base"
import { Icon, ListItem} from "@rneui/themed"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const SideBar = () => {
    return (
        <SafeAreaView style={{justifyContent:'space-between', height:'100%'}}>
            <View>
                <ListItem containerStyle={{ backgroundColor: 'grey'}}>
                    <Avatar size='medium' rounded source={{ uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg' }} />
                    <ListItem.Content>
                        <ListItem.Title h4 style={{ color: 'white' }}>XXXX</ListItem.Title>
                        <ListItem.Subtitle>ZZZZZ</ListItem.Subtitle>
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