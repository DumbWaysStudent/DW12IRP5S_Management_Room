import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, Content, View, Row, Footer, Button, Fab, FooterTab, Icon } from 'native-base';
// import { ip } from '../ip'
// import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import * as act from '../_actions/room'

class checkin extends Component {

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
        // this.setState({ Order: this.props.order.order.map(res => res.room_id) })
        // this.props.getRoom(id = this.state.id, token = this.state.token)

    }


    render() {
        return (
            <Container>
                <View>
                    <FlatList
                        data={this.props.order.order}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View key={item.id}>
                                <Row>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('')} >
                                        <View style={styles.epstxt}>
                                            <Text style={styles.namee}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </Row>
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
)(checkin)

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
        // padding: 30,
        margin: 18,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#f9defa',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    namee: {
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