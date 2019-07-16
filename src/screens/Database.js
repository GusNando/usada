/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image'
import { bold } from 'ansi-colors';
import { FlatGrid } from 'react-native-super-grid';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = { text: '', data: [] };
    }

    componentDidMount() {
        this.fetchDataGet();
    }

    fetchDataGet = () => {
        // do not uncomment its annoying feature

        const url = 'http://sistemusadabali.com/postlist.php';
        // this.setState({ isFetchingData: true })
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                });
            }
            )
            .catch(err => {
                this.setState({
                    error: err.error,
                    // isFetchingData: false,
                })
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#388e3c"
                    barStyle="dark-content"
                />
                <View style={styles.header}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FastImage
                        style={{ width: 60, height: 60 }}
                        source={require('../../src/images/sibuda.png')}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View>
                        <Text style={{ color: '#ffffff', fontSize: 18, marginLeft: 10 }}>Sistem Usada Bali</Text>
                        <Text style={{ color: '#ffffff', fontSize: 14, marginLeft: 10 }}>Database</Text>
                    </View>
                </View>
                    

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        style={{
                            height: 40, width: 300, backgroundColor: '#FFFFFF', color: '#424242', marginTop: 10, paddingLeft: 10,
                            elevation: 1, borderTopLeftRadius: 3, borderBottomLeftRadius: 3
                        }}
                        onChangeText={(text) => this.setState({ text })}
                        placeholder='masukkan kata kunci'
                        value={this.state.text}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#388e3c', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', marginTop: 10, borderTopRightRadius: 3, borderBottomRightRadius: 3 }}>
                        <Icon name="md-search" size={30} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                </View>

                <FlatGrid
                    itemDimension={300}
                    style={{flex: 1, backgroundColor: '#EEEEEE'}}
                    items={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <View style={{ flexDirection: 'row', height: 80, marginHorizontal: 15, marginVertical: 15 }}>
                                <View style={{ width: 80, height: 80, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <FastImage
                                        style={{ width: 60, height: 60 }}
                                        source={require('../../src/images/sibuda.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center', width: 250}}>
                                    <Text style={{ fontWeight: 'bold' }}> {item.penyakit.trim()} </Text>
                                    <Text> {item.gejala.trim()} </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    borderBottomColor: '#bdbdbd',
                                    borderBottomWidth: 1,
                                    marginHorizontal: 10
                                }}
                            />
                        </TouchableOpacity>

                    )}
                />

                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    header: {
        borderColor: '#388e3c',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        height: 130,
        backgroundColor: '#fff',
        backgroundColor: '#4caf50', 
        paddingHorizontal: 20,
        paddingTop: 10
    }
});
