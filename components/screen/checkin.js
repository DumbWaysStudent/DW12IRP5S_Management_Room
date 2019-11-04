import React, { Component } from 'react';
import { Container, Content, View, Text, Header, Body, Title, Item, Input, Button, Row, Icon, } from 'native-base';
import { StyleSheet, FlatList, StatusBar, Picker, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux'
import * as act from '../_actions/room'
import { ip } from '../ip'
import axios from 'axios'
import CountDown from 'react-native-countdown-component'

class Checkin extends Component {

    constructor() {
        super();
        this.state = {
            token: null,
            name: '',
            roomID: null,
            duration: null,
            durationCO: 0,
            customerId: null,
            customer: '',
            orderId: null,
        }
    }

    async componentDidMount() {
        await this.getToken()
        // await this.getId()
        this.showOrder()
        console.log(this.props.order)
        this.showCustomer()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.showOrder()
            this.showCustomer()
        })

    }

    async getToken() {
        const getToken = await AsyncStorage.getItem('token')
        this.setState({
            token: getToken
        })
    }

    showOrder = () => {
        this.props.getOrder(token = this.state.token)
    }

    showCustomer = () => {
        this.props.getCustomer(token = this.state.token)
    }

    handleModalCheckin = (name, roomID) => {
        this.setState({
            name,
            roomID
        })
        this.refs.modalCheckin.open()
    }

    checkin = () => {
        this.props.checkin(this.state.token, this.state.roomID, this.state.customerId, this.state.duration)
        this.props.getOrder(token = this.state.token)
        this.refs.modalCheckin.close()
        this.setState({
            duration: null
        })
    }

    handleModalCheckout = (name, roomID, customer, customerId, orderId, durationCO) => {
        this.setState({
            name,
            roomID,
            customer,
            customerId,
            orderId,
            durationCO
        })
        this.refs.modalCheckout.open()
    }

    checkout = () => {
        axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            url: `${ip}/order/${this.state.orderId}`,
            data: {
                room_id: this.state.roomID,
                customer_id: this.state.customerId,
                duration: this.state.duration
            }
        }).then(res => {
            this.refs.modalCheckout.close()
            this.setState({
                durationCO: 0
              })
            this.showOrder()
        })
    }

    checkoutTimer = (orderId) => {
        axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            url: `${ip}/order/${orderId}`,
            data: {}
        }).then(res => {
            this.showOrder()
        })
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#f3b5f5" barStyle="light-content" />
                <Header style={{ backgroundColor: "#f3b5f5" }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Title style={{ color: 'white', letterSpacing: 5.0, }}>CHECKIN</Title>
                    </Body>
                </Header>
                <Content>
                <View>
                    <FlatList
                        data={this.props.order.order}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        renderItem={({ item }) =>
                            <View >
                                {item.customers.length > 0 ?
                                    (<View >
                                        <Row>
                                        <TouchableOpacity
                                            onPress={() => this.handleModalCheckout(item.name, item.id, item.customers[0].name, item.customers[0].id, item.customers[0].order.room_id, item.customers[0].order.duration)}
                                        >
                                            <View style={styles.epstxt}>
                                                <Text style={styles.namee}>{item.name}</Text>
                                                <CountDown
                                                    until={(item.customers[0].order.duration)*60}
                                                    size={10}
                                                    digitStyle={styles.DurationStyle}
                                                    timeToShow={['M', 'S']}
                                                    timeLabels={{}}
                                                    onFinish={() => this.checkoutTimer(item.customers[0].order.room_id)}
                                                />
                                            </View>

                                        </TouchableOpacity>
                                        </Row>
                                    </View>) :
                                    (<View >
                                        <TouchableOpacity
                                            onPress={() => this.handleModalCheckin(item.name, item.id)}
                                        >
                                            <View style={styles.epstxtt}>
                                                <Text style={styles.namee}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>)
                                }
                            </View>
                        } />
                </View>
                </Content>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={"modalCheckin"}>
                    <View style={{ position: "absolute", width: 250 }}>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ADD CHECK IN</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Room</Text>
                            <TextInput
                                placeholder='Room Name'
                                value={this.state.name}
                                editable={false}
                                style={styles.TextInput}
                            />
                            <Text style={styles.label}>Customer</Text>
                            <View style={styles.TextInput}>
                                <Picker
                                    selectedValue={this.state.customerId}
                                    onValueChange={(itemValue) =>
                                        this.setState({
                                            customerId: itemValue
                                        })
                                    }
                                >
                                    {this.props.customer.customer.map((item) => {
                                        return <Picker.Item key={item.id} value={item.id} label={item.name} />
                                    })}
                                </Picker>
                            </View>
                            <Text style={styles.label}>Duration</Text>
                            <TextInput
                                keyboardType="numeric"
                                value={this.state.duration}
                                onChangeText={duration => this.setState({ duration })}
                                style={styles.TextInput}
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Row>
                                <Button
                                    style={styles.ButtonCancel}
                                    onPress={() => this.refs.modalCheckin.close()}
                                >
                                    <Text>Cancel</Text>
                                </Button>
                                <Button
                                    style={styles.ButtonSave}
                                    onPress={() => this.checkin()}
                                >
                                    <Text>Check In</Text>
                                </Button>
                            </Row>
                        </View>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={"modalCheckout"}>
                    <View style={{ position: "absolute", width: 250 }}>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CHECKOUT</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Room</Text>
                            <TextInput
                                value={this.state.name}
                                editable={false}
                                style={styles.TextInput}
                            />
                            <Text style={styles.label}>Customer</Text>
                            <TextInput
                                value={this.state.customer}
                                editable={false}
                                style={styles.TextInput}
                            />
                            <Text style={styles.label}>Duration</Text>
                            <TextInput
                                value={this.state.durationCO.toString()}
                                editable={false}
                                style={styles.TextInput}
                            />

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Row>
                                <Button
                                    style={styles.ButtonCancel}
                                    onPress={() => this.refs.modalCheckout.close()}
                                >
                                    <Text>Cancel</Text>
                                </Button>
                                <Button
                                    style={styles.ButtonSave}
                                    onPress={() => this.checkout()}
                                >
                                    <Text>Check Out</Text>
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
        order: state.order,
        room: state.room,
        customer: state.customer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrder: (token) => dispatch(act.getOrder(token)),
        getRoom: (token) => dispatch(act.getRoom(token)),
        getCustomer: (token) => dispatch(act.getCustomer(token)),
        checkin: (token, roomID, customerId, duration) => dispatch(act.checkin(token, roomID, customerId, duration))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkin)

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3b5f5',
        height: 400,
        width: 300,
        borderRadius: 10
    },
    ButtonCancel: {
        marginTop: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#f5e90c'
    },
    ButtonSave: {
        marginTop: 10,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ff8af5'
    },
    TextInput: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#ff8af5',
        marginBottom: 3,
        borderRadius: 10,
        fontSize: 15,
        textAlign: 'center'
    },
    label: {
        marginTop: 5,
        fontWeight: 'bold'
    },
    DurationStyle: {
        backgroundColor: '#f3b5f5',
        color: '#1CC625',
        marginBottom: -30,
        marginTop: 1
    },

    epstxt: {
        // padding: 30,
        margin: 10,
        width: 117,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#d9d6ce',
        marginTop: 20,
        fontSize: 20,
        borderRadius: 10,
        fontWeight: 'bold'
    },
    epstxtt: {
        // padding: 30,
        margin: 10,
        width: 117,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#e882d7',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    namee: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    conImg: {
        width: 100,
        height: 100,
        marginTop: 3,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black'
    },
})