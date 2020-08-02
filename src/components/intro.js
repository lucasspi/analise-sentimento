// LIBS IMPORTS
import React, { useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch } from 'react-redux';
// LOCAL IMPORTS
import Theme from '../constants/theme';
// CONSTS SETUP
const { COLOR, FONT, WEIGHT } = Theme;

const intro = ({close}) => {

  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

	const firstStepAction = () => {
    setLoading(true);
    if (name) {
      dispatch({ type: 'USER_NAME', name: name })
			close();
    	setLoading(false);
    }else{
      setLoading(false);
      setErrorName("Digite o seu primeiro nome");
    }
  }

	return (
    <KeyboardAvoidingView 
      behavior={Platform.select({ ios: 'padding', android: null })}>
			<View style={styles.contentImg}>
				<Image 
					style={styles.logo}
					source={require("../assets/logo-brand.png")}
				/>
			</View>
			<Text style={styles.welcomeText}>Olá, para começar primeiramente digite abaixo seu primeiro nome</Text>
			<View style={styles.txtInputContainer}>
				<TextInput
					style={styles.txtInputContent}
					returnKeyType={'done'}
					autoCapitalize={'words'}
          maxLength={10}
					value={name}
					onChangeText={(text) => {setName(text); setErrorName(null)}}
          onSubmitEditing={firstStepAction}
				/>
			</View>
			{ errorName ? <Text style={styles.labelError}>{errorName}</Text> : null }
			<TouchableOpacity style={styles.mainBtn} onPress={firstStepAction}>
				{loading ? <ActivityIndicator size="small" color="#FFFFFF"/> : <Text style={styles.mainBtnLabel}>AVANÇAR</Text>}
			</TouchableOpacity>
    </KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	logo: {
		height: 45, 
		width: 300
	},
	contentImg: {
		justifyContent: 'center', 
		alignItems: 'center', 
		paddingBottom: 50
	},
  labelError: {
    color: COLOR.ERROR,
    paddingLeft: 5,
    fontSize: FONT.SMALL,
    fontWeight: WEIGHT.THIN
  },
  mainBtnLabel:{
    color: COLOR.WHITE,
    fontSize: FONT.MEDIUM,
    textAlign: 'center',
    fontWeight: WEIGHT.FAT
  },
  mainBtn: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 6,
    marginVertical:20,
    paddingVertical: 14,
    paddingHorizontal: 20
  },
  welcomeText:{
    fontSize: FONT.XMLARGE,
    textAlign: 'center',
    color: COLOR.GREY
  },
  txtInputContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: FONT.MEDIUM,
    color: COLOR.GREY
  },
  txtInputContainer: {
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.GREY_WHITE,
    borderWidth: 0.3,
    borderRadius: 6
  }
});

export default intro;