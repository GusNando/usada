/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal'
import Display from 'react-native-display'
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
        this.state = { 
            text: '', 
            search: '', 
            data: [], 
            dataView: [], 
            pilihKategori: false,
            detailPage: false,

            lontar: ' ',
            gejala: ' ',
            penyakit: ' ',
            obat: ' ',
            cara_pengobatan: ' ',
            mantra: ' ',
            loading: false,
        };
    }

    search = (text) => {

        let data = this.state.data;

        console.warn(data);
        let itemTemp = [];
        
        itemTemp = data.filter(o => o.gejala.toLowerCase().match(text) || o.penyakit.toLowerCase().match(text) || o.obat.toLowerCase().match(text) || o.lontar.toLowerCase().match(text));
        
        console.warn(itemTemp);
        this.setState({ dataView: itemTemp });
    }

    filterKategori = (text) => {

        let data = this.state.data;

        console.warn(data);
        let itemTemp = [];

        if (text == 'Semua')
        {
            this.setState({ dataView: data, pilihKategori: false });
        }

        else{
            itemTemp = data.filter(o => o.lontar.trim().toLowerCase() == text.toLowerCase());
            this.setState({ dataView: itemTemp, pilihKategori: false });
        }

        console.warn(itemTemp);
        
    }

    componentDidMount() {
        this.fetchDataGet();
    }

    fetchDataGet = () => {
        // do not uncomment its annoying feature
        this.setState({loading: true})
        const url = 'http://sistemusadabali.com/postlist.php';
        // this.setState({ isFetchingData: true })
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson,
                    dataView: responseJson,
                    loading: false
                });
            }
            )
            .catch(err => {
                this.setState({
                    error: err.error,
                    loading: true
                    // isFetchingData: false,
                })
            });
    }

    renderDetail = (item) => {
        this.setState({
            lontar: item.lontar,
            gejala: item.gejala,
            obat: item.obat,
            penyakit: item.penyakit,
            cara_pengobatan: item.cara_pengobatan,
            mantra: item.mantra,
            detailPage: true,
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#0097a7"
                    barStyle="dark-content"
                />

                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00bcd4', paddingVertical: 5}}>
                    <Text style={{textAlign: 'center', color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>Sistem Usada Bali</Text>
                    <Text style={{ textAlign: 'center', color: '#FFFFFF'}}>Sistem Informasi Usada Bali</Text>
                </View>

                

                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginHorizontal: 10}}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'masukkan kata kunci'}
                        onChangeText={search => this.search(search)}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#00bcd4', height: 50, width: 50, justifyContent: 'center', alignItems: 'center',  borderTopRightRadius: 3, borderBottomRightRadius: 3 }}
                        onPress={()=>{this.search(this.state.search)}}
                    >
                        <Icon name="md-search" size={50} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <Modal isVisible={this.state.pilihKategori}>
                    <View style={{flex: 1, backgroundColor: '#212121'}}>
                        <Text style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Kategori</Text>
                        
                        <TouchableOpacity onPress={() => { this.setState({ pilihKategori: false }) }} style={{ borderWidth: 1, padding: 10, borderColor: '#00bcd4', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 3 }}
                            onPress={() => { this.filterKategori('Semua') }}
                        >
                            <Text style={{ color: '#00bcd4', fontSize: 20, textAlign: 'center' }}>Semua</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.setState({ pilihKategori: false }) }} style={{ borderWidth: 1, padding: 10, borderColor: '#00bcd4', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 3 }}
                            onPress={() => { this.filterKategori('Usada Rare') }}
                        >
                            <Text style={{ color: '#00bcd4', fontSize: 20, textAlign: 'center' }}>Usada Rare</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.setState({ pilihKategori: false }) }} style={{ borderWidth: 1, padding: 10, borderColor: '#00bcd4', backgroundColor: '#FFFFFF', margin: 10, borderRadius: 3 }}
                            onPress={() => { this.filterKategori('Usada Tarupramana')}}
                        >
                            <Text style={{ color: '#00bcd4', fontSize: 20, textAlign: 'center' }}>Usada Tarupramana</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.setState({ pilihKategori: false }) }} style={{ marginVertical: 10 }}>
                            <Text style={{ color: '#9e9e9e', fontSize: 22, textAlign: 'center'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={this.state.detailPage}>
                    <ScrollView style={{ flex: 1, marginVertical: 10, backgroundColor: '#FFFFFF' }}>
                        <View style={{ padding: 5, backgroundColor: '#00bcd4', width: 100, marginBottom: 5 }}>
                            <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{this.state.lontar.trim()}</Text>
                        </View>
                        <View style={{marginHorizontal: 20, flex: 1}}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{this.state.penyakit.trim()}</Text>

                            <Text style={{ fontWeight: 'bold', marginVertical: 5}}>Gejala</Text>
                            <Text>{this.state.gejala.trim()}</Text>

                            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>Obat</Text>
                            <Text>{this.state.obat.trim()}</Text>

                            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>Cara Pengobatan</Text>
                            <Text>{this.state.cara_pengobatan.trim()}</Text>

                            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>Mantra</Text>
                            <Text>{this.state.mantra.trim()}</Text>

                            
                        </View>
                        <TouchableOpacity onPress={() => { this.setState({ detailPage: false }) }} style={{ marginVertical: 20, backgroundColor: '#00bcd4', padding: 10, marginHorizontal: 10, borderRadius: 3 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 22, textAlign: 'center' }}>Kembali</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Modal>

               

                <FlatGrid
                    itemDimension={300}
                    style={{ flex: 1, backgroundColor: '#FFFFFF' }}
                    items={this.state.dataView}
                    refreshing={this.state.loading}
                    onRefresh={this.fetchDataGet}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={()=> {this.renderDetail(item)}}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', marginHorizontal: 20,  }}>
                                <View style={{flex: 1, marginVertical: 10}}>
                                    <View style={{ padding: 5, borderRadius: 3, backgroundColor: '#00bcd4', width: 100, marginBottom: 5 }}>
                                        <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>{item.lontar.trim()}</Text>
                                    </View>    
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>{item.penyakit.trim()}</Text>
                                    
                                    <Text>{item.gejala.trim()}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )}
                />

                <View style={{ flexDirection: 'row', backgroundColor: '#00bcd4', paddingVertical: 5}}>
                    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='md-home' size={25} color='#FFFFFF' />
                        <Text style={{ color: '#FFFFFF'}}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { this.setState({ pilihKategori: true }) }}
                    >
                        <Icon name='md-folder' size={25} color='#FFFFFF' />
                        <Text style={{ color: '#FFFFFF' }}>Kategori</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
    textInput: {
        width: 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        borderColor: "#00bcd4",
        marginVertical: 10,
        paddingLeft: 10
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
