import { Button, Icon, Image, LinearProgress, ListItem, Text } from "@rneui/themed"
import { View } from "react-native"
import { updateData } from "../../server/firebase/handler/animeHandler"
import { useEffect, useState } from "react"
import showToast from "../../utils/showToast"
import capitalEachWord from "../../utils/capitalEachWord"
import { useReadData } from "../../hooks/readDataState"
import { useAuth } from "../../hooks/authState"
import * as Hapatics from "expo-haptics"


const ListItemComponent = ({ data, navigation, updater, purpose, added = false }) => {
    const {
        airing = true,
        curr_eps = 5,
        episodes = 10,
        images = { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1588/138395.jpg' } },
        mal_id = 0,
        season = 'unknown',
        title = 'NULL',
        type = 'unknown',
        year = 2023 } = data
    const [_curr_eps, setCurrEps] = useState(curr_eps)
    const { setAniToAdd } = useReadData()
    const { state } = useAuth()

    const goToAddEditForm = (value) => {
        navigation.navigate('AddEditForm', value)
    }

    const goToPreview = () => {
        navigation.navigate('AnimePreview', { mal_id })
    }

    const upperEpisode = async () => {
        try {
            if (_curr_eps + 1 === episodes) {
                await updateData(state.user.id, mal_id, { status: 'completed', curr_eps: _curr_eps + 1 })
                updater(mal_id, 'completed', _curr_eps + 1)
            } else {
                await updateData(state.user.id, mal_id, { curr_eps: _curr_eps + 1 })
                updater(mal_id, '', _curr_eps + 1)
            }
            Hapatics.notificationAsync(Hapatics.NotificationFeedbackType.Success)
            setCurrEps(_curr_eps + 1)
        } catch (error) {
            showToast('error', 'Failed to Update Current Anime')
            Hapatics.notificationAsync(Hapatics.NotificationFeedbackType.Error)
            console.error(error);
        }
    }

    const aniAdd = () => {
        const dataToStore = {
            airing, curr_eps: 0, images, mal_id, season, title, type, year, status: 'watching', episodes
        }
        setAniToAdd(dataToStore)
        goToAddEditForm({ mal_id, added: false })

    }

    useEffect(() => {
        setCurrEps(curr_eps)
    }, [curr_eps])
    return (
        <ListItem containerStyle={{ paddingLeft: 0, paddingBottom: 0, paddingTop: 0 }}>
            <Image style={{ height: 150, aspectRatio: '3/4', resizeMode: 'contain' }} source={{ uri: images.jpg.image_url }} />
            <ListItem.Content>
                <ListItem.Title onPress={goToPreview}>{title}</ListItem.Title>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text>{`${type}, ${season ? capitalEachWord(season) : '?'} ${year ? year : '?'}`}</Text>
                    <Text>{airing && ('Airing')}</Text>
                </View>
                {purpose !== 'search' && (
                    <>
                        <LinearProgress style={{ marginVertical: 10, height: 10 }} variant="determinate" value={_curr_eps / episodes} />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                            <Text>{_curr_eps}/{episodes} Eps</Text>
                        </View>
                    </>
                )}

            </ListItem.Content>
            <View>
                {purpose !== 'search' ? (
                    _curr_eps !== episodes ? (
                        <>
                            <Button containerStyle={{ marginBottom: 5, marginTop: 5 }} onPress={() => { goToAddEditForm({ mal_id, added: true }) }} icon={<Icon name="edit" type="feather" size={20} color='white' />} />
                            <Button containerStyle={{ marginBottom: 5, marginTop: 5 }} onPress={upperEpisode} icon={<Icon name="plus" type="feather" size={20} color='white' />} />
                        </>
                    ) : (
                        <>
                            <Button containerStyle={{ marginBottom: 5, marginTop: 5 }} onPress={() => { goToAddEditForm({ mal_id, added: true }) }} icon={<Icon name="edit" size={20} color='white' />} />
                        </>
                    )
                ) : (<Button containerStyle={{ marginBottom: 5, marginTop: 5 }} onPress={() => { added ? goToAddEditForm({ mal_id, added: true }) : aniAdd() }} icon={<Icon name={added ? 'edit' : 'plus'} type="feather" size={20} color='white' />} />)}
            </View>
        </ListItem>
    )
}

export default ListItemComponent