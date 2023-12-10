import { View } from "react-native"
import HeaderX from "../components/organisms/HeaderX"
import { Tab, TabView, Text } from '@rneui/themed';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import FloatingButton from "../components/molecules/FloatingButton";
import ListItemComponent from "../components/organisms/ListItemComponent";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAllData } from "../server/firebase/handler/animeHandler";
import { useDataAll } from "../hooks/dataAllState";
import showToast from "../utils/showToast";


const HomeScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0)
    const { cusStateData, setCusStateData } = useDataAll()
    const [dataWatching, setDataWatching] = useState([])
    const [dataCompleted, setDataCompleted] = useState([])
    const [dataOnHold, setDataOnHold] = useState([])
    const [dataDropped, setDataDropped] = useState([])
    const [dataPlanToWatch, setDataPlanToWatch] = useState([])

    const fetchData = async () => {
        try {
            const dataSnap = await getAllData('demoUser')
            setCusStateData(dataSnap)
            updateData(dataSnap);
        } catch (error) {
            showToast('error', 'Failed to Laod Anime List')
            console.error(error);
        }
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

    const updateData = (dataSource) => {
        setDataCompleted(dataSource.filter((value) => value.status === 'completed'))
        setDataDropped(dataSource.filter((value) => value.status === 'dropped'))
        setDataOnHold(dataSource.filter((value) => value.status === 'on_hold'))
        setDataPlanToWatch(dataSource.filter((value) => value.status === 'plan_to_watch'))
        setDataWatching(dataSource.filter((value) => value.status === 'watching'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        updateData(cusStateData)
    }, [cusStateData])


    return (
        <SafeAreaProvider>
            <HeaderX navigation={navigation} purpose='main' />
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Tab value={index} style={{ marginLeft: 50, marginRight: 50 }} onChange={setIndex} indicatorStyle={{ backgroundColor: 'blue', height: 3 }} dense>
                        <Tab.Item titleStyle={{ minWidth: 50, color: 'blue' }}>All</Tab.Item>
                        <Tab.Item titleStyle={{ minWidth: 50 }}>Watching</Tab.Item>
                        <Tab.Item titleStyle={{ minWidth: 50 }}>Completed</Tab.Item>
                        <Tab.Item titleStyle={{ minWidth: 50 }}>On Hold</Tab.Item>
                        <Tab.Item titleStyle={{ minWidth: 50 }}>Dropped</Tab.Item>
                        <Tab.Item titleStyle={{ minWidth: 50 }}>Plan to Watch</Tab.Item>
                    </Tab>
                </ScrollView>
            </View>
            <TabView value={index} onChange={setIndex} animationType="spring" onSwipeStart={setIndex}>
                <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
                    <ScrollView>
                        <View style={cusStateData.length === 0 ? { alignItems: 'center' } : ''}>
                            {cusStateData.length === 0 ? (
                                <Text h1>No List Anime Here</Text>
                            ) : cusStateData.map((userAni) => (
                                <ListItemComponent data={userAni} key={userAni.mal_id} navigation={navigation} updater={refreshData} />
                            ))}
                        </View>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'grey', width: '100%' }}>
                    <ScrollView>
                        <View style={dataWatching.length === 0 ? { alignItems: 'center' } : ''}>
                            {dataWatching.length === 0 ? (
                                <Text h1>No List Anime Here</Text>
                            ) : dataWatching.map((userAni) => (
                                <ListItemComponent data={userAni} key={userAni.mal_id} navigation={navigation} updater={refreshData} />
                            ))}
                        </View>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'grey', width: '100%' }}>
                    <ScrollView>

                        <View style={dataCompleted.length === 0 ? { alignItems: 'center' } : ''}>
                            {dataCompleted.length === 0 ? (
                                <Text h1>No List Anime Here</Text>
                            ) : dataCompleted.map((userAni) => (
                                <ListItemComponent data={userAni} key={userAni.mal_id} navigation={navigation} updater={refreshData} />
                            ))}
                        </View>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'grey', width: '100%' }}>
                    <ScrollView>

                        <View style={dataOnHold.length === 0 ? { alignItems: 'center' } : ''}>
                            {dataOnHold.length === 0 ? (
                                <Text h1>No List Anime Here</Text>
                            ) : dataOnHold.map((userAni) => (
                                <ListItemComponent data={userAni} key={userAni.mal_id} navigation={navigation} updater={refreshData} />
                            ))}
                        </View>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'grey', width: '100%' }}>
                    <ScrollView>

                        <View style={dataDropped.length === 0 ? { alignItems: 'center' } : ''}>
                            {dataDropped.length === 0 ? (
                                <Text h1>No List Anime Here</Text>
                            ) : dataDropped.map((userAni) => (
                                <ListItemComponent data={userAni} key={userAni.mal_id} navigation={navigation} updater={refreshData} />
                            ))}
                        </View>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ backgroundColor: 'grey', width: '100%' }}>
                    <ScrollView>
                        <View style={dataPlanToWatch.length === 0 ? { alignItems: 'center' } : ''}>
                            {dataPlanToWatch.length === 0 ? (
                                <Text h1>No List Anime Here</Text>
                            ) : dataPlanToWatch.map((userAni) => (
                                <ListItemComponent data={userAni} key={userAni.mal_id} navigation={navigation} updater={refreshData} />
                            ))}
                        </View>
                    </ScrollView>
                </TabView.Item>
            </TabView>
            <FloatingButton navigation={navigation} />
        </SafeAreaProvider>

    )
}

export default HomeScreen