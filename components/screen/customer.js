import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, Content, View, Row, Fab, List, ListItem, Icon, Item, Input, Button } from 'native-base';
import { ip } from '../ip'
import axios from 'axios'
import Modal from 'react-native-modalbox'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import * as act from '../_actions/room'
import AsyncStorage from '@react-native-community/async-storage';

class customer extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            token: null,
            customerId: null,
            name: '',
            identity_card: '',
            phone_number: '',
            isRefreshing: false

        }
    }
    async componentDidMount() {
        await this.getToken()
        await this.getId()
        this.showCustomer()
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.showCustomer()
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

    showCustomer = () => {
        this.props.getCustomer(id = this.state.id, token = this.state.token)

    }

    handlerefresh = async () => {
        this.setState({ isRefreshing: true });
        await this.showCustomers;
        this.setState({ isRefreshing: false });
    };

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
            this.refs.AddCustomer.close()
            this.showCustomer()
        })
    }

    handleModalEdit = (customerId, name, identity_card, phone_number, ) => {
        this.setState({
            customerId,
            name,
            identity_card,
            phone_number
        })
        this.refs.EditCustomer.open()
    }

    EditCustomer = () => {
        axios({
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            },
            url: `${ip}/customer/${this.state.customerId}`,
            data: {
                name: this.state.name,
                identity_card: this.state.identity_card,
                phone_number: this.state.phone_number,
                image: ''
            }
        }).then(res => {
            this.refs.EditCustomer.close()
            this.showCustomer()
        })
    }


    render() {
        return (
            <Container>
                <View>
                    <FlatList
                        data={this.props.customer.customer}
                        onRefresh={this.handlerefresh}
                        refreshing={this.state.isRefreshing}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.conView}>
                                <ListItem>
                                    <Row style={{ marginTop: 5 }}>
                                        <TouchableOpacity
                                            onPress={() => this.handleModalEdit(item.id, item.name, item.identity_card, item.phone_number)}>
                                            <Image style={styles.conImg} source={require('./profile.png')} />
                                        </TouchableOpacity>
                                        <View style={styles.conval}>
                                            <Text style={styles.nameCustomer} >{item.name}</Text>
                                            <Text style={styles.idCustomer} >{item.identity_card}</Text>
                                            <Text style={styles.idCustomer}>{item.phone_number}</Text>
                                        </View>
                                    </Row>
                                </ListItem>
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
                        onPress={() => this.refs.AddCustomer.open()}>
                        <Icon type="FontAwesome" name="plus" />
                    </Fab>
                </View>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={"AddCustomer"}>
                    <View style={{ position: "absolute" }} >
                        <View style={{ alignItems: 'center', marginBottom: 20, }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}> ADD CUSTOMER</Text>
                            <Item style={{ borderColor: 'black' }}>
                                <Icon type="FontAwesome5" name="user-circle" />
                                <Input
                                    placeholder="Name"
                                    onChangeText={name => this.setState({ name })}
                                />
                            </Item>
                            <Item style={{ borderColor: 'black' }}>
                                <Icon type="FontAwesome5" name="id-card" />
                                <Input
                                    placeholder="Identity Number"
                                    onChangeText={identity_card => this.setState({ identity_card })}
                                />
                            </Item>
                            <Item style={{ borderColor: 'black' }}>
                                <Icon type="FontAwesome5" name="phone" />
                                <Input
                                    placeholder="Phone Number"
                                    onChangeText={phone_number => this.setState({ phone_number })}
                                />
                            </Item>
                            <Row>
                                <Button
                                    info
                                    style={styles.Insert}
                                    onPress={() => this.AddCustomer()}>
                                    <Text>INSERT</Text>
                                </Button>
                                <Button
                                    info
                                    style={styles.Cancel}
                                    onPress={() => this.refs.AddCustomer.close()}>
                                    <Text>CANCEL</Text>
                                </Button>
                            </Row>
                        </View>
                    </View>
                </Modal>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={"EditCustomer"}>
                    <View style={{ position: "absolute" }} >
                        <View style={{ alignItems: 'center', marginBottom: 20, }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}> ADD CUSTOMER</Text>
                            <Item style={{ borderColor: 'black' }}>
                                <Icon type="FontAwesome5" name="user-circle" />
                                <Input
                                    value={this.state.name}
                                    placeholder="Name"
                                    onChangeText={name => this.setState({ name })}
                                />
                            </Item>
                            <Item style={{ borderColor: 'black' }}>
                                <Icon type="FontAwesome5" name="id-card" />
                                <Input
                                    value={this.state.identity_card}
                                    placeholder="Identity Number"
                                    onChangeText={identity_card => this.setState({ identity_card })}
                                />
                            </Item>
                            <Item style={{ borderColor: 'black' }}>
                                <Icon type="FontAwesome5" name="phone" />
                                <Input
                                    value={this.state.phone_number}
                                    placeholder="Phone Number"
                                    onChangeText={phone_number => this.setState({ phone_number })}
                                />
                            </Item>
                            <Row>
                                <Button
                                    info
                                    style={styles.Insert}
                                    onPress={() => this.EditCustomer()}>
                                    <Text>INSERT</Text>
                                </Button>
                                <Button
                                    info
                                    style={styles.Cancel}
                                    onPress={() => this.refs.EditCustomer.close()}>
                                    <Text>CANCEL</Text>
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
        customer: state.customer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCustomer: (id, token) => dispatch(act.getCustomer(id, token))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(customer)

const styles = StyleSheet.create({

    conView: {
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'white',

    },
    nameCustomer: {
        fontSize: 15,
        marginHorizontal: 10,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#696969",
    },
    idCustomer: {
        marginHorizontal: 10,
        fontSize: 12
    },

    conval: {
        margin: 10,
    },
    conView: {
        // margin: 50,
        marginBottom: 5,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3b5f5',
        height: 320,
        width: 280,
        borderRadius: 15
    },
    Insert: {
        marginHorizontal: 5,
        marginTop: 20,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#ff8af5'
    },
    Cancel: {
        marginHorizontal: 5,
        marginTop: 20,
        borderRadius: 5,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5e90c'
    },
    conImg: {
        width: 80,
        height: 80,
        marginTop: 3,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'black'
    },

    conval: {
        margin: 10,
    }

})