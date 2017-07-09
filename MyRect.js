import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
} from 'react-native';

import Svg, {
    Rect,
} from 'react-native-svg';

class Rectangle extends Component {
    
    render() {
        return (<View>
                <Svg
                    width="200"
                    height="60"
                >
                    <Rect
                        x="5%"
                        y="5%"
                        width="90%"
                        height="90%"
                        fill="rgb(0,0,255)"
                        strokeWidth="3"
                        stroke="rgb(0,0,0)"
                        strokeDasharray="5,10"
                    />
                </Svg>
            </View>
        );
    }
}

AppRegistry.registerComponent('addtothenoise', () => Rectangle);
