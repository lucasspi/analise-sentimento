// LIBS IMPORTS
import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment/min/moment-with-locales'
// LOCAL IMPORTS
import Theme from '../constants/theme';
import Modal from './modal';
import { getApi } from '../environments/config'
// CONSTS SETUP
const { COLOR, WEIGHT, FONT } = Theme;
const server = getApi('api');
moment.locale('pt-BR');

export default function tweetsList() {
	const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [tweetText, setTweetText] = useState('')
  const [modal, setModal] = useState(false)
  const [humor, setHumor] = useState('')
  const [errorSearch, setErrorSearch] = useState(null)
  const [status, setStatus] = useState(null)
	
	const state = useSelector(state => state);
	
  async function searchFeelings(text) {
		// O CONTROLLER DESTA REQUISIÇÃO ESTÁ DEMONSTRADO NO DIRETÓRIO `src/api/index.js` line 6
    let response = await fetch(server.url + `auth/analyzeSentiment`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text
      })
    });
    response = await response.json();
    let humor = response.score <= -0.25 ? "😔" : response.score >= 0.25 ? "🙂" : "😐"
		dispatch({type: 'HUMOR', humor })
		setModal(true)
    setLoading(false);
  }

  async function fetchTwitterData() {
		// O CONTROLLER DESTA REQUISIÇÃO ESTÁ DEMONSTRADO NO DIRETÓRIO `src/api/index.js` line 27
    let response = await fetch(server.url + `auth/twitter/${search}`);
    response = await response.json();
    if (response.error) {
			setStatus("Ops! Não existe nenhuma conta com o nome inserido.")
			dispatch({type: 'TWITTER_LIST', list: [] })
    }else if(response.tweets && response.tweets.length === 0){
			setStatus("Ops! A conta inserida não contém nenhum Tweet publico.")
			dispatch({type: 'TWITTER_LIST', list: [] })
		} else {
			dispatch({type: 'TWITTER_LIST', list: response.tweets })
			setStatus(null)
    }
      setLoading(false);
  }

  function secondStepAction(){
    setLoading(true);
    if(search){
      fetchTwitterData()
    }else{
      setErrorSearch("O campo busca não pode estar vazio");
      setLoading(false);
    }
  }

	return (
		<View style={styles.flex}>
			<View style={styles.containerTopBar}>
				<View style={styles.topContainer}>
					<View style={styles.flex}>
						<Text style={styles.nameTitle}>Olá, {state.name}!</Text>
					</View>
					<View style={styles.contentImg}>
						<Image 
							style={styles.logo}
							source={require("../assets/logo-brand-white.png")}
						/>
					</View>
				</View>
			</View>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				contentContainerStyle={styles.paddingContent}>
				<View style={styles.padding_20}>
					<Text style={styles.title}>Vamos fazer uma análise de sentimentos</Text>
					<Text style={styles.subtitle}>Digite abaixo o usuário que deseja listar os Tweets</Text>
					<View style={styles.flexRow}>
						<View style={styles.txtInputContainerSearch}>
							<TextInput 
								style={styles.txtInputContent}
								value={search}
								placeholder="Digite aqui o nome de usuário sem @"
								onChangeText={(text) => {setSearch(text); setErrorSearch(null); setStatus(null)}}
								onSubmitEditing={secondStepAction}
							/>
						</View>
						<TouchableOpacity style={styles.mainBtnSearch} onPress={() => {secondStepAction()}}>
							{loading ? <ActivityIndicator size="small" color="#FFFFFF"/> : <Text style={styles.mainBtnLabel}>BUSCAR</Text>}
						</TouchableOpacity>
					</View>
				{ errorSearch ?  <Text style={styles.labelError}>{errorSearch}</Text> : null }
				</View>
				{state && state.list.length > 0 && state.list.map((item, index) => 
					<TouchableOpacity 
						key={index} 
						onPress={() => {setTweetText(item.text); searchFeelings(item.text)}}
						style={styles.containerTweet}>
						<View style={styles.flex}>
							<Image 
								style={styles.imgTweet}
								source={{
									uri: item.user.profile_image_url_https,
								}}   
							/>
						</View>
						<View style={styles.containerContentTweet}>
							<View style={styles.contentTweet}>
								<Text style={styles.usernameTweet}>{item.user.name}</Text>
								<Text style={styles.screenNameTweet}>@{item.user.screen_name}</Text>
								<Text style={styles.screenNameTweet}>• {moment(item.created_at).format('DD/MMM')}</Text>
							</View>
							<Text style={styles.textTweet}>{item.text}</Text>
						</View>
					</TouchableOpacity>
				)}
				{
					status ? 
					<View style={styles.statusContainer}>
						<Text style={styles.textTweet}>{status}</Text>
					</View> : null
				}
			</ScrollView>
			{modal ? 
				<Modal
					close={() => setModal(false)}
				/> 
			: null}
		</View>
	)
}

const styles = StyleSheet.create({
	statusContainer:{
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		paddingTop: 20
	},
	logo: {
		height: 30, 
		width: 150
	},
	contentImg: {
		flex: 0.8,
		justifyContent: 'center', 
		alignItems: 'center', 
		paddingTop: 20,
		paddingRight: 20,
	},	
	containerContentTweet: {
		flex: 5.5, 
		paddingLeft: 10
	},
	contentTweet: {
		flexDirection: 'row',
		paddingBottom: 5
	},
	textTweet: {
		fontSize: FONT.MEDIUM, 
		color: COLOR.GREY,
    fontWeight: WEIGHT.THIN,
	},
	screenNameTweet: {
		fontSize: FONT.MEDIUM, 
		color: COLOR.GREY_WHITE2,
		paddingLeft: 5
	},
	usernameTweet: {
		fontSize: FONT.LARGE, 
		color: COLOR.GREY,
    fontWeight: WEIGHT.FAT
	},
	imgTweet: {
		height: 50, 
		width: 50, 
		borderRadius: 25
	},
	containerTweet: {
		flexDirection: 'row', 
		alignItems: 'center', 
		borderBottomWidth: 0.4, 
		paddingVertical: 15, 
		borderBottomColor: '#acadaf',
		paddingHorizontal: 15,
	},
  flexRow: {
    flexDirection: 'row'
  },
  labelError: {
    color: COLOR.ERROR,
    paddingLeft: 5,
    fontSize: FONT.SMALL,
    fontWeight: WEIGHT.THIN
  },
  topContainer: {
    backgroundColor: COLOR.PRIMARY,
    borderBottomRightRadius: 15, 
    borderBottomLeftRadius: 15, 
    flex: 1,  
    justifyContent: 'space-between', 
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
    color: COLOR.WHITE,
    fontSize: FONT.MEDIUM,
    textAlign: 'center',
    fontWeight: WEIGHT.FAT
  },
  mainBtnSearch: {
		flex: 1,
    backgroundColor: COLOR.PRIMARY,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameTitle: {
    fontSize: FONT.XLARGE,
    paddingTop: 20,
    paddingLeft: 20,
    color: COLOR.WHITE,
    fontWeight: WEIGHT.FAT
  },
  title: {
    fontSize: FONT.XMLARGE,
    color: COLOR.GREY,
    fontWeight: WEIGHT.FAT
  },
  subtitle: {
    fontSize: FONT.MEDIUM,
    color: COLOR.GREY,
    paddingTop: 5,
    paddingBottom: 10,
    fontWeight: WEIGHT.THIN
  },
  txtInputContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: FONT.MEDIUM,
    color: COLOR.GREY,
  },
  txtInputContainerSearch: {
		flex: 3,
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.GREY_WHITE,
    borderWidth: 0.3,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
	padding_10: {
		padding: 10
	},
	padding_20: {
		padding: 20
	},
  paddingContent: {
    paddingBottom: 150
  },
  flex: {
    flex: 1
  },
});