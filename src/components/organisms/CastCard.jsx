import { Text } from "@rneui/themed"
import { View, Image, TouchableOpacity } from "react-native"
import noImage from '../../assets/images/noImage.webp'

const CastCard = ({ purpose, data }) => {
    const { character = null, voice_actors = null, person = null, entry = null } = data
    const renderItem = () => {
        switch (purpose) {
            case 'char':
                return (
                    <>
                        <TouchableOpacity>
                            <View style={{ position: 'relative', marginVertical: 3 }}>
                                <Image style={{ height: 200, width: 130, resizeMode: 'cover' }} source={character ? { uri: character.images.webp.image_url } : noImage} />
                                <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#0000004d', width: '100%', padding: 5 }}>
                                    <Text style={{ color: 'white' }}>{character ? character.name : 'Null'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ position: 'relative', marginVertical: 3 }}>
                                <Image style={{ height: 200, width: 130, resizeMode: 'cover' }} source={voice_actors ? { uri: voice_actors[0].person.images.jpg.image_url } : noImage} />
                                <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#0000004d', width: '100%', padding: 5 }}>
                                    <Text style={{ color: 'white' }}>{voice_actors ? voice_actors[0].person.name : 'Null'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
                )
            case 'staff':
                return (
                    <TouchableOpacity>
                        <View style={{ position: 'relative', marginVertical: 3 }}>
                            <Image style={{ height: 200, width: 130, resizeMode: 'cover' }} source={person ? { uri: person.images.jpg.image_url } : noImage} />
                            <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#0000004d', width: '100%', padding: 5 }}>
                                <Text style={{ color: 'white' }}>{person ? person.name : 'Null'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            case 'recom':
                return (
                    <TouchableOpacity>
                        <View style={{ position: 'relative', marginVertical: 3 }}>
                            <Image style={{ height: 200, width: 130, resizeMode: 'cover' }} source={entry ? { uri: entry.images.webp.image_url } : noImage} />
                            <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#0000004d', width: '100%', padding: 5 }}>
                                <Text style={{ color: 'white' }}>{entry ? entry.title : 'Null'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            default:
                return (
                    <TouchableOpacity>
                        <View style={{ position: 'relative', marginVertical: 3 }}>
                            <Image style={{ height: 200, width: 130, resizeMode: 'cover' }} source={noImage} />
                            <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#0000004d', width: '100%', padding: 5 }}>
                                <Text style={{ color: 'white' }}>Null</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
        }
    }

    return (
        <View style={{ marginHorizontal: 5 }}>
            {renderItem()}
        </View>
    )
}

export default CastCard