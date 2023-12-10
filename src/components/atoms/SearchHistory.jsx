import { Icon, Text } from "@rneui/themed";
import { FlatList, TouchableOpacity, View } from "react-native"

const Item = ({ title, handleDelete, onPress }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, borderRadius: 5, padding: 5, backgroundColor: 'grey' }}>
        <TouchableOpacity onPress={() => { onPress(title) }} style={{width:'95%'}}>
            <Text style={{ fontSize: 20 }}>{title}</Text>
        </TouchableOpacity>
        <Icon onPress={()=>{handleDelete(title)}} name="close" size={25} color='black' />
    </View>
)

const SearchHistory = ({ data, handleDelete, onPress }) => {
    return (
        <FlatList
            style={{ width: '100%', paddingHorizontal: 10 }}
            data={data}
            renderItem={({ item }) => (<Item title={item} handleDelete={handleDelete} onPress={onPress} />)}
        />
    )
}

export default SearchHistory