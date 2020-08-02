// LIBS IMPORTS
import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
// LOCAL IMPORTS
import Theme from '../constants/theme';
// CONSTS SETUP
const { COLOR, WEIGHT, FONT } = Theme;
const { height } = Dimensions.get('window');

const modal = ({close, btnText}) => {
	const humor = useSelector(state => state.humor)
	return (
		<View style={styles.component}>
			<View style={styles.wholeContent}>
				<Text style={styles.humorText1}>O emoji que mais se aproxima do Tweet é:</Text>
				<Text style={styles.humorText2}>{humor}</Text>
				<TouchableOpacity
					onPress={close}
					style={styles.mainBtn}>
					<Text style={styles.mainBtnLabel}>OK</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mainBtnLabel:{
		color: COLOR.WHITE,
		textAlign: 'center',
		fontWeight: WEIGHT.FAT
	},
	humorText1: {
		color: COLOR.GREY,
		fontSize: FONT.MEDIUM,
		fontWeight: WEIGHT.FAT,
		textAlign: 'center',
		padding: 20,
	},
	humorText2: {
		textAlign: 'center',
		fontSize: 55,
		padding: 10,
	},
	mainBtn: {
		backgroundColor: COLOR.PRIMARY,
		borderRadius: 6,
		marginVertical:20,
		paddingVertical: 14,
		paddingHorizontal: 20,
		marginHorizontal: 15,
	},
	component: { 
		position: 'absolute', 
		justifyContent: 'center', 
		alignItems: 'center', 
		top: 0, 
		left: 0, 
		right: 0, 
		backgroundColor: "rgba(0,0,0,0.5)", 
		height
	},
	wholeContent: { 
		justifyContent: 'center', 
		alignItems: 'stretch', 
		backgroundColor: 'white', 
		width: 250, 
		height: 280, 
		borderRadius: 5
	}
});

export default modal;