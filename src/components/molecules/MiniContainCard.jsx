import { Text } from "@rneui/themed"
import { View } from "react-native"

const MiniContainCard = ({ title, children, titleStyle, containerStyle, titleContainerStyle }) => {
    const defaultTitleStyle = { fontSize: 15, color: 'grey' };
    const mergedTitleStyle = { ...defaultTitleStyle, ...titleStyle };
    const defaultContainerStyle = { margin: 5 }
    const mergedContainerStyle = { ...defaultContainerStyle, ...containerStyle }
    return (
        <View style={mergedContainerStyle}>
            <View style={titleContainerStyle}>
                <Text style={mergedTitleStyle}>{title}</Text>
            </View>
            {children}
        </View>
    )
}

export default MiniContainCard