import { View, Text, StyleSheet } from 'react-native';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import { LinearGradient } from 'expo-linear-gradient'


const HorizontalPickers = ({ onChange, value, maxValue = 100, horizonRef }) => {
    const Items = Array.from(Array(maxValue + 1).keys());
    const renderItem = (item, index) => (
        <View key={index} style={[styles.item]}>
            <Text style={styles.itemText}>
                {item}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>

            <HorizontalPicker
                scroll
                ref={horizonRef}
                data={Items}
                renderItem={renderItem}
                itemWidth={80}
                defaultIndex={value}
                onChange={onChange}
                snapTimeout={50}
                animatedScrollToDefaultIndex
            />
            <LinearGradient
                colors={['rgba(242, 242, 242, 1)', 'rgba(242, 242, 242, 0)']}
                start={{ x: 0, y: 1 }}
                style={{width:80*2+10, height:300, position:'absolute', left:0}}
            />
            <LinearGradient
                colors={['rgba(242, 242, 242, 1)', 'rgba(242, 242, 242, 0)']}
                start={{ x: 1, y: 1 }}
                style={{width:80*2+10, height:300, position:'absolute', right:0}}
            />
            <View style={{
                backgroundColor: 'rgba(222, 211, 180, 0.5)',
                width:80, height:300, position:'absolute'
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        position:'relative'
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        height: '100%',
        padding: 10,
        width: 80
    },
    itemText: {
        fontSize: 30,
    },
});

export default HorizontalPickers;
