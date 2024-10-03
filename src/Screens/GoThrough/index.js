import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../Constants/images';
import {styles} from './index.style';
import CustomText from '../../Components/Text';

const GoThrough = ({navigation}) => {
  return (
    <FastImage source={images.AuthBackground} style={{flex: 1}}>
      <View style={{height: 230}} />
      <View>
        <View
          style={{
            backgroundColor: '#3295D1',
            height: 120,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderTopColor: '#1EF1F5',
            borderBottomColor: '#1EF1F5',
          }}>
          <CustomText
            text={'       Digital Map \n Marketing Agency'}
            style={styles.App_title_txt}
          />
        </View>
        <View style={{marginHorizontal: 35}}>
          <TouchableOpacity
            style={[
              styles.container,
              {marginTop: 25, backgroundColor: 'black'},
            ]}>
            <Image source={images.apple_icon} style={{marginRight: 20}} />
            <CustomText style={styles.txt} text={'Continue with Apple'} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.container, {}]}>
            <Image source={images.Google_Icon} style={{marginRight: 20}} />
            <CustomText
              style={[styles.txt, {color: 'black'}]}
              text={'Continue with Google'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.container, {backgroundColor: '#1878F3'}]}>
            <Image source={images.Facebook_Logo} style={{marginRight: 20}} />
            <CustomText style={styles.txt} text={'Continue with Facebook'} />
          </TouchableOpacity>
          <CustomText
            text={
              'By registering, you agree to our Terms of Service, Privacy     Policy and Cookie Policy'
            } style={styles.policyTxt}
          />
          <TouchableOpacity
           onPress={()=> navigation.navigate('Login')}
            style={[
              styles.container,
              {marginTop: 30, backgroundColor: '#376CE3'},
            ]}>
            <CustomText style={styles.txt} text={'Get Started'} />
          </TouchableOpacity>
        </View>
      </View>
    </FastImage>
  );
};

export default GoThrough;
