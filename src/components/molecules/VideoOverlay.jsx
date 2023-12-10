import { Overlay } from "@rneui/themed"
import { View } from "react-native"
import YoutubeIframe from "react-native-youtube-iframe"

const VideoOverlay = ({ videoOvData, videoId=null }) => {
    const { visible, setVisible } = videoOvData
    const toggleOverlay = () => {
        setVisible(!visible)
    }
    return (
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} style={{ width: '100%' }}>
            <View style={{ width: '90%', aspectRatio: '16/9', alignItems: 'center' }} >
                <YoutubeIframe
                    videoId={videoId}
                    width="100%"
                    height={300}
                />
            </View>

        </Overlay>
    )
}

export default VideoOverlay