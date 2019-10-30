import React, { Component } from 'react';
import { Container, Content, View, Text, Form, Item, Input, Button, Icon } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { ip } from '../ip'

const hight = Dimensions.get('window').height
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
        <View style={styles.Theme}>
          <View style={styles.title}>
            <Text style={styles.login}>AMBACANG</Text>
            <Text style={styles.loginn}>Ambacang To Live Word</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.Textadmin}>Login Administrator</Text>
            <View>
              {/* <View style={styles.formes}> */}
              <Form style={styles.formes}>
                <Text style={styles.label}>Username</Text>
                <Item rounded style={{ backgroundColor: 'white' }}>
                  <Icon active name='home' />
                  <Input placeholder="Username" onChangeText={username => this.userValidation(username)}
                    keyboardType="Email" />
                </Item>
                <Text style={styles.labels}>Password</Text>
                <Item rounded style={{ backgroundColor: 'white' }}>
                  <Icon active name='lock' />
                  <Input placeholder="Password" secureTextEntry={this.state.pass} onChangeText={password => this.passValidation(password)} />
                  <Icon name={this.state.icon} onPress={() => this.changeIcon()} />
                </Item>


                <Button
                  dark disabled={this.state.isDisabled} rounded block style={styles.button}
                  onPress={() => this.userLogin()}
                >
                  <Text >LOG IN</Text>
                </Button>
              </Form>
            </View>
          </View>
        </View>
        {/* </View> */}

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    marginTop: 90,
    marginBottom: 150,
    fontFamily: 'Georgia'
  },
  Theme: {
    backgroundColor: '#f3b5f5',
  },
  Textadmin: {
    marginBottom: 20,
    marginTop: 50,
    marginHorizontal: 70,
    fontSize: 20,
    fontFamily: 'Lora'
  },
  login: {
    fontSize: 35,
    color: "#696969",
    marginBottom: 10
  },
  loginn: {
    fontSize: 12,
    color: "#696969"
  },
  labels: {
    marginTop: 20,
    fontWeight: 'bold'
  },
  container: {
    paddingHorizontal: 30,
    borderTopStartRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: '#fffcfc',
  },
  formes: {
    marginTop: 20,
    height: hight
  },
  label: {
    padding: 5,
    fontWeight: 'bold'
  },
  button: {
    marginTop: 30,
  },
})