import { Card } from "@rneui/themed"
import { View } from "react-native"

const FormCard = ({ children, title, style, titleStyle }) => {
    return (
        <Card containerStyle={{ padding: 2, marginVertical:0, borderColor: 'white' }}>
            <Card.Title style={titleStyle} >{title}</Card.Title>
            <View style={style}>
                {children}
            </View>
        </Card>
    )
}

export default FormCard