import React from 'react';
import PropTypes from 'prop-types';
import {
    Image,
    View,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import { Dimensions as RNDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';


import * as globalStyles from '../styles/global';

const scale = 0.8;

const SplashImage = ( { src, id, description, onImageLoad, onNavigateToDetail, style, ...rest } ) => (

    <Animated.View style={[style, styleSheet.splashView]}>
        <View style={[styleSheet.borderLeft]}><Text
            style={[globalStyles.COMMON_STYLES.text]}>{description} </Text></View>
        <TouchableWithoutFeedback onPress={() => onNavigateToDetail(id)}>
            <View style={[{ marginTop: 15 }]}>
                <FastImage onLoad={() => {
                    //console.log('FastImage onLoad');
                    // onImageLoad(id);
                }}
                           source={{ uri: src, priority: FastImage.priority.normal, }}
                           style={[styleSheet.image]}
                           resizeMode={FastImage.resizeMode.contain}
                /></View>
        </TouchableWithoutFeedback>
    </Animated.View>
);

SplashImage.propTypes = {
    src: PropTypes.string,
};

const styleSheet = StyleSheet.create({
    borderLeft: {
        borderLeftWidth: 5,
        borderColor: globalStyles.TEXT_COLOR,
        paddingLeft: 5,
        backgroundColor: 'white',
        width: '100%',
    },
    splashView: {
        position: 'absolute',
        width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale,
        padding: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        height: 230,
    },
    image: {
        width: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale,
        height: Math.min(Dimensions.get('window').width, Dimensions.get('window').height) * scale * 9 / 16,

    },
});

export default SplashImage;
