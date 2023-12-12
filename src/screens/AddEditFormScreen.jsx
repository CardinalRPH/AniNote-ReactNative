import { ButtonGroup, Icon, Text } from "@rneui/themed";
import { useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HorizontalPickers from "../components/molecules/HorizontalPicker";
import HeaderX from "../components/organisms/HeaderX";
import { TouchableOpacity, View } from "react-native";
import { getSpecifiedData, updateData, writeData } from "../server/firebase/handler/animeHandler";
import { useDataAll } from "../hooks/dataAllState";
import showToast from "../utils/showToast";
import { useReadData } from "../hooks/readDataState";
import { useAuth } from "../hooks/authState";


const buttons = ['Watching', 'Completed', 'Plan to Watch', 'On Hold', 'Dropped'];
const buttonValues = ['watching', 'completed', 'plan_to_watch', 'on_hold', 'dropped']


const AddEditFormScreen = ({ route, navigation }) => {
    const { mal_id, added } = route.params
    const horizonRef = useRef(null)
    const [selectedIndexBGroup, setSelectedIndexBGroup] = useState(0)
    const [curr_eps, setCurr_eps] = useState(0);
    const { cusStateData, setCusStateData } = useDataAll()
    const { aniToAdd } = useReadData()
    const { state } = useAuth()
    const [readValue, setReadValue] = useState({
        title: "",
        airing: false,
        episodes: 0,
    })
    state.user.id

    const fetchData = async () => {
        try {
            const { status, curr_eps, title, episodes, airing } = await getSpecifiedData(state.user.id, mal_id)
            setSelectedIndexBGroup(buttonValues.indexOf(status))
            setReadValue({
                title, airing, episodes
            })
            setCurr_eps(curr_eps)
        } catch (error) {
            showToast('error', 'Failed to Get Current Anime')
        }
    }

    const fetchDataOL = () => {
        const { status, curr_eps, title, episodes, airing } = aniToAdd
        setSelectedIndexBGroup(buttonValues.indexOf(status))
        setReadValue({
            title, airing, episodes
        })
        setCurr_eps(curr_eps)
    }

    const saveData = async () => {
        try {
            await updateData(state.user.id, mal_id, {
                status: buttonValues[selectedIndexBGroup],
                curr_eps
            })
            updateAllData(mal_id, buttonValues[selectedIndexBGroup], curr_eps)
            navigation.goBack()
            // navigation.navigate('Home')
        } catch (error) {
            showToast('error', 'Failed to Update Current Anime')
            console.error(error);
        }
    }

    const saveNewData = async () => {
        try {
            const newData = { ...aniToAdd, curr_eps, status: buttonValues[selectedIndexBGroup] }
            await writeData(state.user.id, mal_id, newData)
            setCusStateData([...cusStateData, newData])
            navigation.goBack()
        } catch (error) {
            showToast('error', 'Failed to Save Current Anime')
            console.error(error);
        }
    }

    const updateAllData = (mal_id, status, curr_eps) => {
        const dataTemp = cusStateData.map(anime => {
            if (anime.mal_id === mal_id) {
                return { ...anime, curr_eps, status: status === '' ? 'watching' : status }
            }
            return anime
        })
        setCusStateData(dataTemp)
    }

    const handleHorizontalPick = (value) => {
        setCurr_eps(value)
        if (curr_eps === readValue.episodes) {
            setSelectedIndexBGroup(1)
        }
    }

    const handleBtnGroupChange = (value) => {
        setSelectedIndexBGroup(value)
        if (value === 1) {
            horizonRef.current ? horizonRef.current.scrollToPosition(readValue.episodes) : null
            setCurr_eps(readValue.episodes)
        }
    }

    useEffect(() => {
        added ? fetchData() : fetchDataOL()
    }, [])
    return (
        <SafeAreaProvider>
            <HeaderX navigation={navigation} purpose='third' func={() => { added ? saveData() : saveNewData() }} />
            <View style={{ justifyContent: 'space-between', height: '90.5%' }}>

                <View style={{ margin: 20 }}>
                    <Text h3>{readValue.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Status</Text>
                        <Text>{readValue.airing ? 'Airing' : 'Finished'}</Text>
                    </View>
                    <ButtonGroup
                        buttons={buttons}
                        selectedIndex={selectedIndexBGroup}
                        onPress={handleBtnGroupChange}
                        containerStyle={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'transparent', borderWidth: 0, marginVertical: 10, justifyContent: 'center' }}
                        buttonStyle={{ width: 100, height: 100, borderRadius: 3, borderColor: 'grey', borderWidth: 1, paddingHorizontal: 5 }}
                        buttonContainerStyle={{ margin: 5 }}
                        vertical
                    />
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                        <Text>Progress Episode</Text>
                        <Text h1>{curr_eps}/{readValue.episodes}</Text>
                        <Text>Episodes</Text>
                    </View>
                    <Icon name="caretdown" type="antdesign" style={{ marginHorizontal: 5 }} size={20} />
                    <HorizontalPickers onChange={handleHorizontalPick} value={curr_eps} maxValue={readValue.episodes} horizonRef={horizonRef} />
                    <Icon name="caretup" type="antdesign" style={{ marginHorizontal: 5 }} size={20} />
                </View>
                <TouchableOpacity onPress={() => { console.log('haha') }}>
                    <View style={{ flexDirection: 'row', width: '100%', height: 70, alignItems: 'center', borderTopWidth: 2, borderColor: 'grey', paddingHorizontal: 20 }}>
                        <Icon name="delete" type="material-community" style={{ marginHorizontal: 5 }} color='red' size={30} />
                        <Text>Remove From List</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaProvider>
    )

}
export default AddEditFormScreen;