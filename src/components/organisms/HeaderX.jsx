import { Avatar, Header } from "@rneui/base";
import { Icon, Text } from "@rneui/themed";
import { useAuth } from "../../hooks/authState";

const default_img_uri = 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg'

const HeaderX = ({ navigation, purpose, func }) => {

  const { state } = useAuth()

  const _openDrawer = () => {
    navigation.toggleDrawer();
  }
  const handleBack = () => {
    navigation.goBack();
  };

  const getPurposeDetails = (value) => {
    switch (value) {
      case 'main':
        return {
          leftComponent: <Avatar size='small' onPress={_openDrawer} rounded source={{ uri: state.user ? state.user.photo : default_img_uri }} />,
          centerComponent: {
            text: "Ani Note",
            style: { color: "#fff", fontSize: 20 }
          },
          rightComponent: ''
        };
      case 'second':
        return {
          leftComponent: <Icon onPress={handleBack} name="arrow-back" type="ionicon" color='white' />,
          centerComponent: {
            text: "Ani Note",
            style: { color: "#fff", fontSize: 20 },
          },
          rightComponent: ''
        };
      case 'third':
        return {
          leftComponent: <Icon onPress={handleBack} name="close" color='white' />,
          centerComponent: '',
          rightComponent: <Text onPress={func} style={{ fontSize: 20, color: 'white' }}>Save</Text>
        };
      default:
        return {
          leftComponent: <Avatar size='small' onPress={_openDrawer} rounded source={{ uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg' }} />,
          centerComponent: {
            text: "Ani Note",
            style: { color: "#fff", fontSize: 20 }
          },
          rightComponent: ''
        };
    }
  };
  const { leftComponent, rightComponent, centerComponent } = getPurposeDetails(purpose)

  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={centerComponent}
      centerContainerStyle={{ flexDirection: 'column', justifyContent: 'center' }}
      containerStyle={{}}
      leftComponent={leftComponent}
      leftContainerStyle={{ flexDirection: 'column', justifyContent: 'center' }}
      linearGradientProps={{}}
      rightComponent={rightComponent}
      rightContainerStyle={{}}
      placement="center"
      statusBarProps={{}}
    />

  );
}

export default HeaderX