import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  TextInput,
  Animated,
  AsyncStorage,
  Alert
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Toast from 'react-native-easy-toast';
// import { AsyncStorage } from '@react-native-community/async-storage';
import { getApi } from './src/environments/config'
const server = getApi('api');

const App: () => React$Node = () => {
  
  const [counter, setCounter] = useState(0)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [tweets, setTweets] = useState([])
  const [errorSearch, setErrorSearch] = useState(null)
  
  // FADES
  const firstStepFade = useRef(new Animated.Value(1)).current
  const secondStepFade = useRef(new Animated.Value(0)).current
  
  const [firstStepControll, setFirstStepControll] = useState(true)
  const [secondStepControll, setSecondStepControll] = useState(false)

  function fadeOutFirstStep(){
    Animated.timing(
      firstStepFade,
      {
        toValue: 0,
        duration: 400,
        useNativeDriver: false
      }
    ).start();
	}

  function fadeInSecondStep(){
		Animated.timing(
      secondStepFade,
      {
        toValue: 1,
        duration: 400,
        useNativeDriver: false
      }
    ).start();
	}

  useEffect( () => {
    //Requisição de listar Tweets
    // fetchData();
  }, [])

  async function searchFeelings() {
    console.log(server.url + `auth/analyzeSentiment`);
    //Requisição de 
    let response = await fetch(server.url + `auth/analyzeSentiment`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: search
      })
    });
    response = await response.json();
    let humor = response.score <= -0.25 ? "😔" : response.score >= 0.25 ? "🙂" : "😐"
    setLoading(false);
    Alert.alert(
        "Análise de Sentimentos",
        `O emoji que mais se aproxima do Tweet é ${humor}` 
    );
  }

  async function fetchData() {
    let response = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?user_id${search}&screen_name=twitterapi&count=12`);
    response = await response.json();
    console.log('response', response);
  }

  function firstStepAction(){
    setLoading(true);
    if (name) {
      // AsyncStorage.setItem("name", name);
      fadeOutFirstStep();
      setTimeout(() => {
        setLoading(false);
        setFirstStepControll(false);
        setSecondStepControll(true);
        fadeInSecondStep();
        
      }, 400);
    }else{
      setLoading(false);
      setErrorSearch("Digite o seu primeiro nome");

    }
  }

  function secondStepAction(){
    setLoading(true);
    console.log('search', search);
    if(search){
      searchFeelings()
    }else{
      setErrorSearch("O campo busca não pode estar vazio");
      setLoading(false);
      // this.refs.toast.show("O campo de busca não pode estar vazio", 5000);
    }
  }

  function firstStepContent(){
    return(
      <Animated.View style={[styles.flexMiddle, styles.padding_20, styles.bgWhiteGrey, {opacity: firstStepFade}]}>
        <Text style={styles.welcomeText}>Olá, digite abaixo seu primeiro nome</Text>
        <View style={styles.txtInputContainer}>
          <TextInput
            style={styles.txtInputContent}
            returnKeyType={'done'}
            autoCapitalize={'words'}
            value={name}
            onChangeText={(text) => {setName(text); setErrorSearch(null)}}
          />
        </View>
        { errorSearch ?  <Text style={styles.labelError}>{errorSearch}</Text> : null }
        <TouchableOpacity style={styles.mainBtn} onPress={() => {firstStepAction()}}>
          {loading ? <ActivityIndicator size="small" color="#FFFFFF"/> :  <Text style={styles.mainBtnLabel}>AVANÇAR</Text>}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  function secondStepContent(){
    return(
      <Animated.View style={[styles.flexMiddle, {opacity: secondStepFade}]}>
        <View style={[styles.containerTopBar]}>
          <View style={styles.degradeContainer}>
            <Text style={styles.nameTitle}>Olá, {name}!</Text>
          </View>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.bgWhiteGrey}
          contentContainerStyle={styles.paddingContent}>
            <Text style={styles.title}>Vamos fazer uma análise de sentimentos</Text>
            <Text style={styles.subtitle}>Digite abaixo o usuário que deseja listar os Tweets</Text>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={[styles.txtInputContainerSearch, {flex: 3}]}>
                <TextInput 
                  style={styles.txtInputContent}
                  value={search}
                  placeholder="Digite aqui o nome de usuário sem @"
                  onChangeText={(text) => {setSearch(text); setErrorSearch(null)}}
                  onEndEditing={() => fetchData()}
                />
              </View>
              <TouchableOpacity style={[styles.mainBtnSearch, {flex: 1}]} onPress={() => {secondStepAction()}}>
                {loading ? <ActivityIndicator size="small" color="#FFFFFF"/> :  <Text style={styles.mainBtnLabel}>BUSCAR</Text>}
              </TouchableOpacity>
            </View>
            { errorSearch ?  <Text style={styles.labelError}>{errorSearch}</Text> : null }
            {tweets.map((item, index) => 
              <Text key={index}>{item.name}</Text>
            )}
        </ScrollView>
      </Animated.View>
    )
  }

  return (
    <View style={styles.flex}>
      <StatusBar barStyle="dark-content" />
        {firstStepControll ? firstStepContent() : secondStepControll ? secondStepContent() : null}
        {/* <Toast ref="toast" /> */}
    </View>
  );
};

const styles = StyleSheet.create({

  labelError: {
    color: 'red',
    paddingLeft: 5,
    fontSize: 11,
    fontWeight: '300'
  },
  degradeContainer: {
    backgroundColor: '#2089dc',
    borderRadius: 15, 
    flex: 1,  
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    flexDirection: 'row', 
  },
  containerTopBar: {
    height: 120,
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.68,
    elevation: 4,
  },
  mainBtnLabel:{
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '700'
  },
  mainBtnSearch: {
    backgroundColor: '#2089dc',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainBtn: {
    backgroundColor: '#2089dc',
    borderRadius: 6,
    marginVertical:20,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  welcomeText:{
    fontSize: 18,
    textAlign: 'center',
    color: '#58595C',
  },
  flexMiddle: {
    flex: 1, 
    justifyContent: 'center', 
  },
  padding_20:{
    padding: 20,
  },
  nameTitle: {
    fontSize: 22,
    paddingTop: 20,
    paddingLeft: 20,
    color: 'white',
    fontWeight: '700'
  },
  title: {
    fontSize: 18,
    color: '#58595C',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 14,
    color: '#58595C',
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: '300'
  },
  txtInputContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: '#58595C',
  },
  txtInputContainerSearch: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderColor: '#bec3cc',
    borderWidth: 0.3,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  txtInputContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderColor: '#bec3cc',
    borderWidth: 0.3,
    borderRadius: 6,
  },
  paddingContent: {
    padding: 20,
    paddingBottom: 150
  },
  bgWhiteGrey: {
    backgroundColor: Colors.lighter,
  },
  flex: {
    flex: 1
  },
});

export default App;
