import React, { Component } from 'react'
import { Container, Content, View, Text, Button, Row } from 'native-base'
import { StyleSheet, ScrollView, Dimensions, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import { ip } from '../ip'
import AsyncStorage from '@react-native-community/async-storage'

export default class addroom extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            name: this.props.navigation.getParam('name'),
            roomId: this.props.navigation.getParam('roomId'),
            duration: null
        }
    }

    async componentDidMount() {
        await this.getToken()
        await this.getId()
    }

    async getId() {
        await AsyncStorage.getItem('id').then(key =>
            this.setState({
                id: JSON.parse(key)
            }))
    }

    // addroom = () => {
    //     axios({
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //             'authorization': `Bearer ${this.state.token}`
    //         },
    //         url: `${ip}/room`,
    //         data: {
    //             name: this.state.name,
    //         }
    //     }).then(res => {
    //         this.props.navigation.navigate('Detail')
    //     })
    // }

    render() {

        return (
            <Container>
                <Content>
                    <View>
                        <Text>Check In</Text>
                        <Text>Room Name</Text>
                        <TextInput
                            placeholder='Room Name'
                            value={this.state.name}
                            editable={false}
                            style={{ borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize: 20, textAlign: 'center' }}
                        />
                        <Text>Customer</Text>
                        <Text>Duration (minutes)</Text>
                        <TextInput
                            placeholder=''
                            value={this.state.duration}
                            onChangeText={duration => this.setState({ duration })}
                            style={{ borderWidth: 2, borderColor: 'black', marginTop: 7, borderRadius: 100, fontSize: 20, textAlign: 'center' }}
                        />
                    </View>
                    <View>
                        <Row>
                            <Button onPress={() => this.props.navigation.navigate('checkin')}><Text>Cancel</Text></Button>
                            <Button><Text>Save</Text></Button>
                        </Row>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({

})
