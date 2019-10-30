import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Footer, FooterTab, Icon, Text, View, Button, Card, CardItem } from 'native-base';
import { connect } from 'react-redux'
import * as act from '../_actions/users'
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            token: null

        }
    }

    async componentDidMount() {
        await this.getToken()
        await this.getId()
        this.User()
        console.log(this.props.user, "??????????????????")
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

    User = () => {
        this.props.getUser(id = this.state.id, token = this.state.token)
    }

    async logout() {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('id')
        this.props.navigation.navigate('Login')
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/pink_screen-profile_image-727b3760759153ce-300x300.jpeg' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>AMBACANG</Text>
                        <Text style={styles.info}>Administrator</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.logout()}>
                            <Text>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (id, token) => dispatch(act.getUser(id, token))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#f3b5f5",
        height: 250,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 160
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
        fontFamily: 'Lato'
    },
    info: {
        fontSize: 16,
        color: "#f3b5f5",
        marginTop: 10,
        fontFamily: 'Lato'

    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 50,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#f3b5f5",
    },
});