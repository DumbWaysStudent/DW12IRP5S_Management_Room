import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { Container, Content, View, Row, Fab, Icon } from 'native-base';
// import { ip } from '../ip'
// import axios from 'axios';
import { connect } from 'react-redux'
import * as act from '../_actions/room'
import AsyncStorage from '@react-native-community/async-storage';

class customer extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            token: null

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

    render() {
        return (
            <Container>
                <View>
                    <FlatList
                        data={this.props.customer.customer}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.conView}>
                                <Row style={{ marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('editcustomer', {
                                            customerId: item.id,
                                            name: item.name,
                                            phoneNumber: item.phone_number,
                                            identityCard: item.identity_card
                                        })}
                                    >
                                        <Image style={styles.conImg} source={require('./profile.png')} />
                                    </TouchableOpacity>
                                    <View style={styles.conval}>
                                        <Text style={styles.nameCustomer} >{item.name}</Text>
                                        <Text style={styles.idCustomer} >{item.identity_card}</Text>
                                        <Text style={styles.idCustomer}>{item.phone_number}</Text>
                                    </View>
                                </Row>
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
                        onPress={() => this.props.navigation.navigate('addcustomer')}>
                        <Icon type="FontAwesome" name="plus" />
                    </Fab>
                </View>
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
        borderWidth: 1,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'white',

    },
    nameCustomer: {
        fontSize: 15,
        marginHorizontal: 10,
        fontWeight: 'bold',
        marginBottom: 5
    },
    idCustomer: {
        marginHorizontal: 10,
        fontSize: 12
    },

    conval: {
        margin: 15
    },
    conView: {
        marginHorizontal: 10,
        marginBottom: 10,
    },

    conImg: {
        width: 90,
        height: 90,
        marginTop: 3,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'black'
    },

    conval: {
        margin: 10,
    }

})