import { Icon } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';

const ShowMoreText = ({ text, maxLines = 3, containerStyle }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowMore = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowAll(!showAll);
    };

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [showAll]);

    return (
        <View style={containerStyle}>
            <Text numberOfLines={showAll ? undefined : maxLines} style={styles.text}>
                {text}
            </Text>
            {text.length > maxLines * 40 && (
                <TouchableOpacity onPress={toggleShowMore}>
                    <Icon name={showAll?'chevron-up':'chevron-down'} size={30} type="ionicon" color='black' />
                </TouchableOpacity>
            )}
        </View>
    );

};
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    showMoreText: {
        color: 'blue',
        marginTop: 5,
    },
});

export default ShowMoreText;
