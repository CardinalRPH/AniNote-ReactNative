import { Icon, ListItem } from "@rneui/themed"

const ListItemOpEd = ({title ='Null'}) => {
    return <ListItem>
        <Icon name="play-circle" type="ionicon" size={50} color='blue' />
        <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
    </ListItem>
}

export default ListItemOpEd