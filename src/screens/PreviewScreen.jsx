import { SafeAreaProvider } from "react-native-safe-area-context"
import { Icon, Text } from "@rneui/themed"
import { View, Image, ScrollView, TouchableHighlight, TouchableOpacity, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react"
import HeaderX from "../components/organisms/HeaderX"
import ShowMoreText from "../components/molecules/ShowMoreText"
import VideoOverlay from "../components/molecules/VideoOverlay"
import CastCard from "../components/organisms/CastCard"
import ListItemOpEd from "../components/molecules/ListItemOpEd"
import MiniContainCard from "../components/molecules/MiniContainCard"
import { getAnimeCharCast, getAnimeFull, getAnimeRecomend, getAnimeStaff } from "../server/API/handler/animeHandler";
import { useReadData } from "../hooks/readDataState";
import noImage from '../assets/images/noImage.webp'
import showToast from "../utils/showToast";
import dateFormater from "../utils/dateFormater"
import capitalEachWord from "../utils/capitalEachWord"
import ShowMoreContent from "../components/molecules/ShowMoreContent"

const PreviewScreen = ({ route, navigation }) => {
    const { mal_id } = route.params
    const [visible, setVisible] = useState(false);
    const { fullAniData, setFullAniData, charsAniData, setCharsAniData, staffAniData, setStaffAniData, aniRecomend, setAniRecomend } = useReadData()
    const [loading, setLoading] = useState(true)
    const videoOvData = {
        visible: visible,
        setVisible: setVisible,
    }
    const toggleOverlay = () => {
        setVisible(!visible)
        // videoRef.current.playAsync()
    }

    const fetchData = async () => {
        try {
            const fullAni = await getAnimeFull(mal_id)
            const charAni = await getAnimeCharCast(mal_id)
            const staffAni = await getAnimeStaff(mal_id)
            const AniRecom = await getAnimeRecomend(mal_id)
            setFullAniData(fullAni.data)
            setCharsAniData(charAni.data)
            setStaffAniData(staffAni.data)
            setAniRecomend(AniRecom.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            showToast('error', 'Failed to Load Current Anime')
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
        console.log('fetched');
    }, [])
    return (
        <SafeAreaProvider>
            <HeaderX purpose='second' navigation={navigation} />
            {loading ? (
                <View style={{ height: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='blue' />
                </View>
            ) : (
                <ScrollView>
                    <View style={{ flexDirection: 'row', height: 400, position: 'relative' }}>
                        <View style={{ width: '100%' }}>
                            <View style={{ backgroundColor: 'grey', width: '100%', height: 100, justifyContent: 'center' }}>
                                <MiniContainCard title='Score' titleStyle={{ fontSize: 20, color: 'white', marginRight: 10, }} containerStyle={{ alignItems: 'flex-end' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="star" type="font-awesome-5" style={{ marginHorizontal: 5 }} size={20} color='white' />
                                        <Text style={{ fontSize: 20, marginRight: 10, color: 'white' }}>{fullAniData ? fullAniData.score : 0}</Text>
                                    </View>
                                </MiniContainCard>
                            </View>
                            <View style={{ marginRight: 10, alignItems: 'flex-end' }}>
                                <MiniContainCard containerStyle={{ alignItems: 'flex-end' }} title='Rank' >
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.rank : 0}</Text>
                                </MiniContainCard>
                                <MiniContainCard containerStyle={{ alignItems: 'flex-end' }} title='Popularity'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.popularity : 0}</Text>
                                </MiniContainCard>
                                <MiniContainCard containerStyle={{ alignItems: 'flex-end' }} title='Member'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.members : 0}</Text>
                                </MiniContainCard>
                                <MiniContainCard containerStyle={{ alignItems: 'flex-end' }} title='Favorites'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.favorites : 0}</Text>
                                </MiniContainCard>
                            </View>
                        </View>
                        <View style={{ borderColor: 'red', borderWidth: 3, height: 300, aspectRatio: '3/4', padding: 10, position: 'absolute', marginLeft: 10, marginTop: 25 }}>
                            <Image source={fullAniData ? { uri: fullAniData.images.webp.image_url } : noImage} style={{ flex: 1, resizeMode: 'cover', width: '100%' }} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Text h3>{fullAniData ? fullAniData.title : 'Null'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'grey' }}>
                        <Text style={{ fontSize: 20, paddingVertical: 10 }}>{fullAniData ? fullAniData.type : 'Null'}, {fullAniData ? fullAniData.year : 2023}</Text>
                        <Text style={{ fontSize: 20, paddingVertical: 10 }}>{fullAniData ? fullAniData.airing ? 'Airing' : 'Finished' : 'Null'}</Text>
                        <Text style={{ fontSize: 20, paddingVertical: 10 }}>{fullAniData ? fullAniData.episodes ? fullAniData.episodes : '?' : 0} ep, 23 min</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
                        {/* prob here */}
                        {fullAniData ? fullAniData.genres.map((value, index) => (<Text key={index} style={{ fontSize: 20 }}>{index === 0 ? value.name : ` • ${value.name}`}</Text>))
                            : (<Text style={{ fontSize: 20 }}>Null</Text>)}
                    </View>
                    <ShowMoreText text={fullAniData ? fullAniData.synopsis : 'Null'} containerStyle={{ margin: 10 }} />
                    <View style={{ position: 'relative', margin: 10 }}>
                        <TouchableHighlight style={{ maxHeight: 350 }} onPress={toggleOverlay} disabled={fullAniData === null ? true : false}>
                            <Image style={{ width: '100%', aspectRatio: '16/9', resizeMode: 'cover', height: 'auto' }} source={fullAniData ? { uri: fullAniData.trailer.images.medium_image_url } : noImage} />
                        </TouchableHighlight>
                        <Icon onPress={toggleOverlay} disabled={fullAniData === null ? true : false} name="youtube" type="antdesign" size={50} color='red' containerStyle={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }} />
                    </View>
                    <View style={{ margin: 10 }}>
                        <MiniContainCard title='English'>
                            <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.title_english : 'Null'}</Text>
                        </MiniContainCard>
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: '50%' }}>
                                <MiniContainCard title='Source'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.source : 'Null'}</Text>
                                </MiniContainCard>
                                <MiniContainCard title='Studio'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.studio : 'Null'}</Text>
                                </MiniContainCard>
                                <MiniContainCard title='Rating'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? fullAniData.rating : 'Null'}</Text>
                                </MiniContainCard>
                            </View>
                            <View style={{ width: '50%' }}>
                                <MiniContainCard title='Season'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? `${capitalEachWord(fullAniData.season)} ${fullAniData.year}` : 'Null'}</Text>
                                </MiniContainCard>
                                <MiniContainCard title='Aired'>
                                    <Text style={{ fontSize: 16 }}>{fullAniData ? `${dateFormater(fullAniData.aired.from)} to ${dateFormater(fullAniData.aired.to)}` : 'Null'}</Text>
                                </MiniContainCard>
                                <MiniContainCard title='Licensor'>
                                    {fullAniData ? fullAniData.licensors.length > 0 ?
                                        fullAniData.licensors.map((value, index) => (<Text style={{ fontSize: 16 }}>{index === 0 ? value.name : `, ${value.name}`}</Text>)) :
                                        (<Text style={{ fontSize: 16 }}>unkown</Text>) :
                                        (<Text style={{ fontSize: 16 }}>Null</Text>)}
                                </MiniContainCard>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 15, color: 'blue' }}>More information</Text>
                        </View>
                        {fullAniData ? fullAniData.relations.map((value, titleIndex) => (
                            <MiniContainCard title={value.relation} key={titleIndex} containerStyle={{ flexDirection: 'row' }} titleContainerStyle={{ width: '20%' }}>
                                {value.entry.map((contain, containIndex) => (
                                    <Text key={containIndex} style={{ fontSize: 16 }}>{contain.name}</Text>
                                ))}
                            </MiniContainCard>
                        )) : (<Text style={{ fontSize: 16 }}>Null</Text>)}

                    </View>
                    <Text style={{ fontSize: 15, color: 'grey', marginHorizontal: 15, marginVertical: 5 }}>Character & Voice Actor</Text>
                    <ScrollView horizontal style={{ marginVertical: 10 }}>
                        {charsAniData ? charsAniData.slice(0, 10).map((value, index) => (
                            <CastCard purpose='char' data={value} key={index} />
                        )) : (
                            <CastCard data={''} />
                        )}

                        {charsAniData.length > 10 && (
                            <TouchableOpacity onPress={() => { console.log('Clicked') }}>
                                <View style={{ marginVertical: 3, height: 400, width: 130, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="chevron-forward" size={50} type="ionicon" color='black' />
                                    <Text style={{ fontSize: 20 }}>View More</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                    <Text style={{ fontSize: 15, color: 'grey', marginHorizontal: 15, marginVertical: 5 }}>Staff</Text>
                    <ScrollView horizontal style={{ marginVertical: 10 }}>
                        {staffAniData ? staffAniData.slice(0, 10).map((value, index) => (
                            <CastCard purpose='staff' data={value} key={index} />
                        )) : (
                            <CastCard data={''} />
                        )}
                        {staffAniData.length > 10 && (
                            <TouchableOpacity onPress={() => { console.log('Clicked') }}>
                                <View style={{ marginVertical: 3, height: 200, width: 130, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="chevron-forward" size={50} type="ionicon" color='black' />
                                    <Text style={{ fontSize: 20 }}>View More</Text>
                                </View>
                            </TouchableOpacity>
                        )}

                    </ScrollView>
                    <View style={{ margin: 10 }}>
                        <MiniContainCard title='Opening Theme'>
                            <View>
                                {fullAniData ? (<ShowMoreContent
                                    data={fullAniData.theme.openings}
                                    Render={({ value }) => (<ListItemOpEd title={value} />)}
                                    showMoreProps={(showMore) => (<Text>{showMore ? 'hide' : 'show'}</Text>)}
                                />) : (<ListItemOpEd />)}
                            </View>
                        </MiniContainCard>
                        <MiniContainCard title='Ending Theme'>
                            <View>
                                {fullAniData ? (<ShowMoreContent
                                    data={fullAniData.theme.endings}
                                    Render={({ value }) => (<ListItemOpEd title={value} />)}
                                    showMoreProps={(showMore) => (<Text>{showMore ? 'hide' : 'show'}</Text>)}
                                />) : (<ListItemOpEd />)}
                            </View>
                        </MiniContainCard>
                    </View>
                    {aniRecomend && (aniRecomend.length > 0 && (
                        <>
                            <Text style={{ fontSize: 15, color: 'grey', marginHorizontal: 15, marginVertical: 5 }}>Recomendation</Text>
                            <ScrollView horizontal style={{ marginVertical: 10 }}>
                                {aniRecomend.slice(0, 10).map((value, index) =>
                                    (<CastCard purpose='recom' data={value} key={index} />))}
                                {aniRecomend.length > 10 && (
                                    <TouchableOpacity onPress={() => { console.log('Clicked') }}>
                                        <View style={{ marginVertical: 3, height: 200, width: 130, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name="chevron-forward" size={50} type="ionicon" color='black' />
                                            <Text style={{ fontSize: 20 }}>View More</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}

                            </ScrollView>
                        </>
                    ))}

                </ScrollView>
            )}
            <VideoOverlay videoOvData={videoOvData} videoId={fullAniData ? fullAniData.trailer.youtube_id : null} />

        </SafeAreaProvider>
    )
}

export default PreviewScreen