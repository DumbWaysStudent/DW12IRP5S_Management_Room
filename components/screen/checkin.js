import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, Content, View, Row, Footer, Button, Fab, FooterTab, Icon } from 'native-base';
// import { ip } from '../ip'
// import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import * as act from '../_actions/room'

class Detail extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            Order: []

        }
    }
    async componentDidMount() {
        await this.getToken()
        await this.getId()
        this.showOrder()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.showOrder()
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

    showOrder = () => {
        this.props.getOrder(id = this.state.id, token = this.state.token)
        this.setState({ Order: this.props.order.order.map(res => res.room_id) })
        this.props.getRoom(id = this.state.id, token = this.state.token)

    }


    render() {
        return (
            <Container>
                <View>
                    <FlatList
                        data={this.props.room.room}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View key={item.id}>
                                <View style={styles.conView}>
                                    <Row style={styles.Rows}>
                                        <View style={styles.conval}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('')} >
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

            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        order: state.order,
        room: state.room
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrder: (id, token) => dispatch(act.getOrder(id, token)),
        getRoom: (id, token) => dispatch(act.getRoom(id, token))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)

const styles = StyleSheet.create({

    headcon: {
        marginHorizontal: 15,
        marginTop: 15,
        alignSelf: 'center'
    },

    conView: {
        marginHorizontal: 10

    },
    icon: {
        color: "white"
    },

    conImg: {
        width: 100,
        height: 100,
        borderWidth: 3,
        borderColor: 'black'
    },

    conval: {
        margin: 15
    },

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

    conImg: {
        width: 100,
        height: 100,
        marginTop: 3,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black'
    },

    conval: {
        margin: 10,
    }





})