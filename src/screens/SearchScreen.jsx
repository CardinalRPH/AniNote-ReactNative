import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchBox from "../components/atoms/SearchBox";
import HeaderX from "../components/organisms/HeaderX";
import { useEffect, useState } from "react";
import { useDataAll } from "../hooks/dataAllState";
import { SectionList, View } from "react-native";
import { Text } from "@rneui/themed";
import ListItemComponent from "../components/organisms/ListItemComponent";
import groupAndFilterData from "../utils/groupFilterData";
import SearchHistory from "../components/atoms/SearchHistory";
import { getDataAsync, storeDataAsync } from "../store/asyncStorage/handler";

const purpose = 'localHistory'
const SearchScreen = ({ navigation }) => {
  const [searchVal, setSearchVal] = useState('')
  const { cusStateData, setCusStateData } = useDataAll()
  const [searchData, setSearchData] = useState([])
  const [showHistory, setShowHistory] = useState(true)
  const [historyData, setHistoryData] = useState(['XXXX', 'DDDD'])

  const handleSearchSubmit = async () => {
    if (searchVal !== '') {
      setShowHistory(false)
      setSearchData(groupAndFilterData(cusStateData, searchVal))
      const recent = historyData.find((value) => value === searchVal)
      if (recent === undefined) {
        const addHistory = [...historyData, searchVal]
        setHistoryData(addHistory)
        await storeDataAsync(purpose, JSON.stringify(addHistory))
      }
    }
  }

  const handleClear = () => {
    setSearchData('')
    setShowHistory(true)
  }

  const historyPress = (value) => {
    setSearchVal(value)
    setShowHistory(false)
    setSearchData(groupAndFilterData(cusStateData, value))

  }

  const historyDelete = (value) => {
    setHistoryData(historyData.filter((item) => item !== value))
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
      <SearchBox navigation={navigation} placeholder='Type here for search...' valueSearch={{ searchVal, setSearchVal }} handleSubmit={handleSearchSubmit} handleClear={handleClear} />
      <View style={searchData.length === 0 || historyData.length === 0 ? { alignItems: 'center', justifyContent: 'center', height: '100%' } : ''}>
        {showHistory ? historyData.length > 0 ? (<SearchHistory onPress={historyPress} handleDelete={historyDelete} data={historyData} />) :
          (<Text h4>No History</Text>) :
          searchData.length > 0 ? (
            <SectionList
              sections={searchData}
              renderSectionHeader={({ section: { title } }) => (
                <Text h4>{title}</Text>
              )}
              renderItem={({ item }) => (
                <ListItemComponent data={item} navigation={navigation} updater={refreshData} />
              )}
            />) :
            (<Text h4>No Result</Text>)}

      </View>
    </SafeAreaProvider>
  )
}

export default SearchScreen;