import React, { Component } from 'react';
import { Container, Content, View, Text, Form, Item, Input, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { ip } from '../ip'


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      icon: "eye-off",
      pass: true,
      isDisabled: true,
      username: "",
      password: null,
      token: "",
      id: null

    }
  }

  userLogin = () => {
    axios({
      method: 'POST',
      url: `${ip}/login`,
      data: {
        email: this.state.username,
        password: this.state.password
      }
    }).then(res => {

      this.setState({
        token: res.data.token,
        id: res.data.user.id
      })



      if (typeof res.data.token !== 'undefined') {
        AsyncStorage.setItem('token', this.state.token)
        AsyncStorage.setItem('id', JSON.stringify(this.state.id))
        this.props.navigation.navigate('Detail')
      } else {
        alert('Login failed!')
      }
    })
  }


  changeIcon = () => {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      pass: !prevState.pass
    }))
  }

  userValidation = (username) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(username) == true && this.state.password != null) {
      this.setState({
        username,
        isDisabled: false,
      })
    } else {
      this.setState({
        username,
        isDisabled: true
      })
    }
    this.setState({
      username,
    })
  }

  passValidation = (password) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (password != null && reg.test(this.state.username) == true) {
      this.setState({
        password,
        isDisabled: false,
      })
    } else {
      this.setState({
        password,
        isDisabled: true
      })
    }
    this.setState({
      password
    })
  }


  render() {
    return (
      <Container>

        <Content padder >

          <View style={styles.title}>

            <Text style={styles.login}>AMBACANG</Text>

          </View>

          <View style={styles.container}>
            <View style={styles.formes}>
              <Form >

                <Text style={styles.label}>Username</Text>
                <Item rounded style={{ backgroundColor: 'white' }}>
                  <Icon active name='home' />
                  <Input placeholder="Username" onChangeText={username => this.userValidation(username)}
                    keyboardType="Email" />
                </Item>
                <Text style={styles.label}>Password</Text>
                <Item rounded style={{ backgroundColor: 'white' }}>
                  <Icon active name='lock' />
                  <Input placeholder="Password" secureTextEntry={this.state.pass} onChangeText={password => this.passValidation(password)} />
                  <Icon name={this.state.icon} onPress={() => this.changeIcon()} />
                </Item>

              </Form>
              <Button
                dark disabled={this.state.isDisabled} rounded block style={styles.button}
                onPress={() => this.userLogin()}
              >
                <Text >LOG IN</Text>
              </Button>

            </View>
          </View>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    marginTop: 45,
    marginBottom: 120,

    fontFamily: 'Austin-Light'
  },
  label: {
    padding: 5
  },
  logo: {
    width: 200,
    height: 200
  },
  login: {
    fontSize: 35,

  },
  container: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderTopRightRadius: 100,
    backgroundColor: '#f3b5f5',
  },
  formes: {
    marginTop: 50,
    marginBottom: 300,
  },
  label: {
    padding: 5,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 20,
  },
  skip: {
    alignItems: 'center',
    marginTop: 35,
  },
  skipText: {
    color: '#66cdaa',

  }
})