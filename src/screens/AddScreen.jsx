import SearchBox from "../components/atoms/SearchBox";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HeaderX from "../components/organisms/HeaderX";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@rneui/themed";
import ListItemComponent from "../components/organisms/ListItemComponent";
import SearchHistory from "../components/atoms/SearchHistory";
import showToast from "../utils/showToast";
import { getAnimeSearch } from "../server/API/handler/animeHandler";
import { getDataAsync, storeDataAsync } from "../store/asyncStorage/handler";
import { useDataAll } from "../hooks/dataAllState";

const AddScreen = ({ navigation }) => {
    const [searchVal, setSearchVal] = useState('')
    const [searchData, setSearchData] = useState([])
    const [showHistory, setShowHistory] = useState(true)
    const { cusStateData, setCusStateData } = useDataAll()
    const [historyData, setHistoryData] = useState(['XXXX', 'DDDD'])
    const [loading, setLoading] = useState(false)

    const purpose = 'onlineHistory'
    const handleSearchSubmit = async () => {
        if (searchVal !== '' && searchVal.length > 2) {
            setLoading(true)
            setShowHistory(false)
            fetchData(searchVal)
            // setSearchData(groupAndFilterData(cusStateData, searchVal))
            const recent = historyData.find((value) => value === searchVal)
            if (recent === undefined) {
                const addHistory = [...historyData, searchVal]
                setHistoryData(addHistory)
                await storeDataAsync(purpose, JSON.stringify(addHistory))
            }
        }
    }

    const handleClear = () => {
        setSearchVal('')
        setShowHistory(true)
    }

    const historyPress = (value) => {
        setSearchVal(value)
        setShowHistory(false)
        // setSearchData(groupAndFilterData(cusStateData, value))

    }

    const historyDelete = async (value) => {
        const newHistory = historyData.filter((item) => item !== value)
        setHistoryData(newHistory)
        await storeDataAsync(purpose, JSON.stringify(newHistory))
    }

    const refreshData = (mal_id, status, curr_eps) => {

        const dataTemp = cusStateData.map(anime => {
            if (anime.mal_id === mal_id) {
                return { ...anime, curr_eps, status: status === '' ? 'watching' : status }
            }
            return anime
        })
        setCusStateData(dataTemp)
    }


    const fetchData = async (value) => {
        try {
            const aniSearch = await getAnimeSearch(value)
            setSearchData(aniSearch.data)
            setLoading(false)
        } catch (error) {
            console.error(error);
            setLoading(false)
            showToast('error', 'Failed to Load Anime Result')
        }
    }

    const getHistoryData = async () => {
        const history = await getDataAsync(purpose)
        history ? setHistoryData(JSON.parse(history)) : setHistoryData([])
    }

    useEffect(() => {
        getHistoryData()
    }, [])

    return (
        <SafeAreaProvider>
            <HeaderX navigation={navigation} purpose='second' />
            <SearchBox navigation={navigation} placeholder='Type here for add anime...' valueSearch={{ searchVal, setSearchVal }} handleSubmit={handleSearchSubmit} handleClear={handleClear} loading={loading} />
            <View style={searchData.length === 0 || historyData.length === 0 ? { alignItems: 'center', justifyContent: 'center', height: '100%' } : ''}>
                {showHistory ? historyData.length > 0 ? (<SearchHistory onPress={historyPress} handleDelete={historyDelete} data={historyData} />) :
                    (<Text h4>No History</Text>) : (
                    <ScrollView>
                        {
                            searchData.length > 0 ? searchData.map((value, index) => (<ListItemComponent key={index} data={value} navigation={navigation} updater={refreshData} purpose='search' added={cusStateData.some((item)=> item.mal_id === value.mal_id)} />)) :
                                (<Text h4>No Result</Text>)
                        }
                    </ScrollView>
                )}

            </View>
        </SafeAreaProvider>
    )
}

export default AddScreen;