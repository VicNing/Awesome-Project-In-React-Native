/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    ToastAndroid,
    Image,
    ScrollView,
    Dimensions,
    ViewPagerAndroid
} from 'react-native';

export default class AwesomeProject extends Component {
    constructor(props) {
        super(props);
        this.state = { source: '' };
        this.onPress = this.onPress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Text style={styles.custom}>
                    This is kinda cool.
                </Text>
                <Button title='What is this now?' onPress={this.onPress} />
                <ImageGroup data={this.state.data} />
            </View>
        );
    }

    onPress() {
        fetch('http://app.bilibili.com/x/banner?plat=4&build=423001&channel=bili')
            .then((response) => response.text())
            .then((data) => {
                let result = JSON.parse(data);
                this.setState({ data: result.data });
            });
    }
}

class ImageGroup extends Component {
    constructor(props) {
        super(props);

        this.width = Dimensions.get('window').width;
        this.height = this.width / 3.2;
    }

    render() {
        return (
            <ScrollView>
                {this.props.data && this.props.data.map((item, index) => {
                    return (
                        <View key={index}>
                            <Image source={{ uri: item.image }} style={{ alignItems: 'center', width: this.width, height: this.height }} />
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    custom: {
        padding: 10,
        fontSize: 40
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
