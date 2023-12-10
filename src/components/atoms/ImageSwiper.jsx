import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSwiper = () => {
    const images = ['https://cdn.myanimelist.net/images/anime/1588/138395.jpg', 'https://cdn.myanimelist.net/images/anime/1953/138935.jpg'];

    const renderImages = () => {
        return images.map((image, index) => (
            <Image source={{ uri: image }} key={index} style={{ flex: 1, resizeMode: 'contain'}} />
        ));
    };

    return (
        <Swiper loop={false} height={300}  >
            {renderImages()}
        </Swiper>
    );
};

export default ImageSwiper;
