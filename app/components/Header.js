import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const GloboHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedUser, setLoggedUser] = useState('');
  const navigation = useNavigation();

  const toggleUser = () => {
    if (isLoggedIn) {
      AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
        setIsLoggedIn(false);
        setLoggedUser('');
        Alert.alert('User logged out');
      });
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('userLoggedIn', (err, result) => {
      if (result === 'none') {
        console.log('NONE');
      } else if (result === null ){
        AsyncStorage.setItem('userLoggedIn', 'none',(err,result)=>{
          console.log('Set user to NONE')
        })
      }
      else {
        setIsLoggedIn(true);
        console.log("result",result);
        setLoggedUser(result);
      }
    });
  });

  let display = isLoggedIn ? LoggedUser : 'Tap to Login';

  return (
    <View style={styles.headStyle}>
      <Image style={styles.imageStyle} source={require('../img/logo-2.png')} />
      <Text style={styles.headText} onPress={toggleUser}>
        {display}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headStyle: {
    backgroundColor: '#35605a',
    flexDirection: 'row',
  },
  imageStyle: {
    alignSelf: 'flex-start',
    height: 100,
    width: 200,
    flex: 1,
  },
  headText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    color: '#ffffff',
    flex: 1,
    paddingRight: 15,
  },
});

export default GloboHeader;
