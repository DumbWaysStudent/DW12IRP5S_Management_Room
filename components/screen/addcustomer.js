import React, { Component } from 'react'
import { Container, Content, View, Text, Form, Item, Icon, Input, Button, Row } from 'native-base'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import { ip } from '../ip'
import AsyncStorage from '@react-native-community/async-storage'

export default class addcustomer extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            name: '',
            identity_card: '',
            phone_number: ''
        }
    }

    async componentDidMount() {
        await this.getToken()
        await this.getId()
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

    AddCustomer = () => {
        axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            url: `${ip}/customer`,
            data: {
                name: this.state.name,
                identity_card: this.state.identity_card,
                phone_number: this.state.phone_number
            }
        }).then(res => {
            this.props.navigation.navigate('customer')
        })
    }

    render() {
        return (

            <Container style={{ backgroundColor: '#f3b5f5' }}>
                <Content padder >
                    <View style={styles.container}>
                        <Form >
                            <Text style={styles.label}>Add Customer</Text>
                            <Item rounded style={{ backgroundColor: 'white', marginTop: 20 }}>
                                <Input placeholder="Name"
                                    onChangeText={name => this.setState({ name })} keyboardType="Email" />
                            </Item>
                            <Item rounded style={{ backgroundColor: 'white', marginTop: 20 }}>
                                <Input placeholder="Number"
                                    onChangeText={identity_card => this.setState({ identity_card })} keyboardType="Email" />
                            </Item>

                            <Item rounded style={{ backgroundColor: 'white', marginTop: 20 }}>
                                <Input placeholder="Phone Number"
                                    onChangeText={phone_number => this.setState({ phone_number })} keyboardType="Email" />
                            </Item>

                        </Form>
                        <Button dark rounded block style={styles.button}
                            onPress={() => this.AddCustomer()}
                            dark disabled={this.state.isDisabled} rounded block style={styles.button} >
                            <Text >Save</Text>
                        </Button>

                    </View>

                </Content>
            </Container>

        );
    }
}
const styles = StyleSheet.create({
    title: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 25,
        fontFamily: 'Austin-Light',
        paddingVertical: 30
    },
    login: {
        fontSize: 30,
        marginBottom: 3,
    },
    container: {
        paddingHorizontal: 30,

    },
    label: {
        padding: 5,
        alignItems: "center",
        fontFamily: 'Austin-Light',

    },
    button: {
        marginTop: 25,
        justifyContent: 'center'
    },

    buttons: {
        marginBottom: 20,
        justifyContent: 'center'
    }
})

