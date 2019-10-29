import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, Content, View, Row, Footer, Button, Fab, FooterTab, Icon } from 'native-base';
// import { ip } from '../ip'
// import axios from 'axios';
import Modal from 'react-native-modalbox';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import { ip } from '../ip'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import * as act from '../_actions/room'

class Detail extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            name: '',
            roomID: null

        }
    }
    async componentDidMount() {
        await this.getToken()
        await this.getId()
        this.showRoom()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.showRoom()
        })

    }

    async getToken() {
        const getToken = await AsyncStorage.getItem('token')
        this.setState({
            token: getToken
        })
    }


    async getId() {
        await AsyncStorage.getItem('id').then(key =>
            this.setState({
                id: JSON.parse(key)
            }))
    }

    showRoom = () => {
        this.props.getRoom(id = this.state.id, token = this.state.token)

    }

    addroom = () => {
        axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            url: `${ip}/room`,
            data: {
                name: this.state.name,
            }
        }).then(res => {
            this.refs.modalAdd.close()
            this.showRoom()
        })
    }

    handleModalEdit = (name, roomID) => {
        this.setState({
            name,
            roomID
        })
        this.refs.modalEdit.open()
    }

    editRoom = () => {
        axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            url: `${ip}/room/${this.state.roomID}`,
            data: {
                name: this.state.name,
            }
        }).then(res => {
            this.refs.modalEdit.close()
            this.showRoom()
        })
    }


    render() {
        return (
            <Container>
                <View>
                    <FlatList
                        data={this.props.room.room}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View >
                                <View style={styles.conView}>
                                    <Row>
                                        <View style={styles.conval}>
                                            <TouchableOpacity
                                                onPress={() => this.handleModalEdit(item.name, item.id)}
                                            >
                                                <Text style={styles.epstxt}>{item.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Row>
                                </View>
                            </View>
                        )}

                    />
                </View>

                <Content />
                <View >
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#e171f0' }}
                        position="bottomRight"
                        onPress={() => this.refs.modalAdd.open()}>
                        <Icon type="FontAwesome" name="plus" />
                    </Fab>
                </View>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={"modalAdd"}>
                    <View style={{ position: "absolute" }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Room</Text>
                        </View>
                        <View>
                            <TextInput
                                placeholder='Room Name'
                                onChangeText={name => this.setState({ name })}
                                style={styles.TextInput}
                            />
                            <Row>
                                <Button
                                    style={styles.Cancel}
                                    onPress={() => this.refs.modalAdd.close()}
                                >
                                    <Text>Cancel</Text>
                                </Button>
                                <Button
                                    style={styles.Save}
                                    onPress={() => this.addroom()}
                                >
                                    <Text>Save</Text>
                                </Button>
                            </Row>
                        </View>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={"modalEdit"}>
                    <View style={{ position: "absolute" }}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Edit Room</Text>
                        </View>
                        <View>
                            <TextInput
                                placeholder='Room Name'
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                                style={styles.TextInput}
                            />
                            <Row>
                                <Button
                                    style={styles.Cancel}
                                    onPress={() => this.refs.modalEdit.close()}
                                >
                                    <Text>Cancel</Text>
                                </Button>
                                <Button
                                    style={styles.Save}
                                    onPress={() => this.editRoom()}
                                >
                                    <Text>Save</Text>
                                </Button>
                            </Row>
                        </View>
                    </View>
                </Modal>

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        room: state.room
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRoom: (id, token) => dispatch(act.getRoom(id, token))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)

const styles = StyleSheet.create({

    epstxt: {
        padding: 35,
        borderRadius: 5,
        backgroundColor: '#f9defa',
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    conView: {
        marginHorizontal: 10,
        marginBottom: 10,
    },

    conval: {
        margin: 10,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3b5f5',
        height: 200,
        width: 320,
        borderRadius: 20
    },
    Cancel: {
        marginHorizontal: 5,
        borderRadius: 5,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5e90c'

    },
    Save: {
        marginHorizontal: 5,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ff8af5'
    },
    TextInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 15,
        textAlign: 'center'
    }





})