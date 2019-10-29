import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Footer, FooterTab, Icon, Text, View, Button, Card, CardItem } from 'native-base';


export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: '',
            banners: []
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ alignItems: 'center', marginVertical: 50 }}>
                        <Image source={{ uri: 'https://www.caesarsforum.com/properties/flamingo/files/mobile/1.jpg' }}
                            style={styles.profImg} />
                        <Text style={styles.ProfText} style={{ fontSize: 20 }}> AMBACANG</Text>
                    </View>

                    <Card>
                        <CardItem footer button onPress={() => this.props.navigation.navigate('Login')} style={{ backgroundColor: '#f3b5f5' }}>
                            <Text style={{ color: 'white' }}> Log Out </Text>
                        </CardItem>
                    </Card>
                </Content>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#39c45e',
    },

    icon: {
        color: 'white'
    },

    profImg: {
        width: 150,
        height: 150,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: '#38D40A'
    },

    profText: {
        marginVertical: 20,
        marginTop: 20,
        fontWeight: 'bold',
        letterSpacing: 2,

    }

})