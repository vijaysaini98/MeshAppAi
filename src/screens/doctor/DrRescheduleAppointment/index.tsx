import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  MEDIUM,
  THIRTY_EIGHT,
  Toolbar,
  WHITE,
  Input,
} from '../../../common';
import {colors} from '../../../theme/colors';
import {Image, View} from 'react-native';
import KeyBoardAware from '../../../common/KeyboardAware';
;
import {locationIcon, p1} from '../../../helper/ImageAssets';

import styles from './styles';

const DrRescheduleAppointment = () => {
  return (
    <AppSafeAreaView statusColor={colors.bg_second}>
      <View style={styles.mainSecond}>
        <Toolbar isBack />
        <KeyBoardAware style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <AppText type={THIRTY_EIGHT} weight={MEDIUM}>
              Mike Hoover
            </AppText>
            <View style={styles.homeToolContainer4}>
              <Image
                source={locationIcon}
                resizeMode="contain"
                style={styles.locationIcon}
                tintColor={colors.buttonBg}
              />
              <AppText weight={MEDIUM} type={FOURTEEN}>
                {' '}
                2893 Tori Lane, Boston
              </AppText>
            </View>
            <View style={styles.idContainer}>
              <AppText type={FOURTEEN} color={WHITE}>
                R.N. :- #ABC012
              </AppText>
            </View>
          </View>
         
        </KeyBoardAware>
        <View style={styles.requestButtonContainer}>
          <Button
            children="Request an Appointment"
          />
        </View>
      </View>

      <Image
        source={p1}
        resizeMode="contain"
        style={styles.profileImage2}
      />
    </AppSafeAreaView>
  );
};

export default DrRescheduleAppointment;
