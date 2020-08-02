// LIBS IMPORTS
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Animated,
} from 'react-native';
// LOCAL IMPORTS
import Theme from '../constants/theme';
import Intro from './intro';
import TweetsList from './tweetsList';
// CONSTS SETUP
const { COLOR } = Theme;

const home = () => {

  const firstStepFade = useRef(new Animated.Value(1)).current
  const secondStepFade = useRef(new Animated.Value(0)).current
  
  const [firstStepControll, setFirstStepControll] = useState(true)
  const [secondStepControll, setSecondStepControll] = useState(false)

  const fadeOutFirstStep = () => {
    Animated.timing(
      firstStepFade,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }
    ).start();
	}

  const fadeInSecondStep = () => {
		Animated.timing(
      secondStepFade,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }
    ).start();
	}
	
  const firstStepAction = () => {
		fadeOutFirstStep();
		setTimeout(() => {
			setFirstStepControll(false);
			setSecondStepControll(true);
			fadeInSecondStep();
		}, 500);
  }

	return (
		<View style={styles.flex}>
			<StatusBar barStyle="dark-content" />
			{firstStepControll ? 
				<Animated.View style={[styles.flexMiddle, styles.padding_20, {opacity: firstStepFade}]}>
					<Intro
						close={firstStepAction}
					/>
				</Animated.View>
				:
				<Animated.View style={[styles.flexMiddle, {opacity: secondStepFade}]}>
					<TweetsList/>
				</Animated.View>
			}
		</View>
	)
}


const styles = StyleSheet.create({
  flexMiddle: {
    flex: 1, 
    justifyContent: 'center', 
		backgroundColor: COLOR.BACKGROUND
  },
	padding_20:{
		padding: 20
	},
	flex: {
    flex: 1
  },
});
export default home;