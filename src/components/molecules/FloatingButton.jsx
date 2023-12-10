import { Icon, SpeedDial } from '@rneui/themed';
import { useState } from 'react';

const FloatingButton = ({ navigation }) => {
  const [open, setOpen] = useState(false);

  const goToAdd = () => {
    navigation.navigate('Add')
    setOpen(!open)
  }

  const goToSearch = () => {
    navigation.navigate('Search')
    setOpen(!open)
  }

  return (

    <SpeedDial
      isOpen={open}
      icon={<Icon name="ellipsis-vertical" size={25} color="white" type='ionicon' />}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={<Icon name="playlist-plus" size={23} color="white" type='material-community' />}
        title="Add list"
        onPress={goToAdd}
      />
      <SpeedDial.Action
        icon={{ name: 'search', color: '#fff' }}
        title="Search list"
        onPress={goToSearch}
      />
    </SpeedDial>
  );
};

export default FloatingButton;
