import { useState } from "react"
import { TouchableOpacity, View } from "react-native";

const ShowMoreContent = ({ data, Render, showMoreProps, minShow=5 }) => {
    const [showMore, setShowMore] = useState(false)
    const displayItemCount = showMore ? data.length : minShow
    return (

        <View>
            {data.slice(0, displayItemCount).map((item, index) => (
                <Render key={index} value={item} />
            ))}

            {data.length > 5 && (
                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                    {showMoreProps(showMore)}
                </TouchableOpacity>
            )}
        </View>
    );
}

export default ShowMoreContent