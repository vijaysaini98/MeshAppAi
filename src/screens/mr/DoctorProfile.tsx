import React from "react";
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  MEDIUM,
  THIRTY_EIGHT,
  Toolbar,
  WHITE,
} from "../../common";
import { colors } from "../../theme/colors";
import { Image, View } from "react-native";
import { styles } from "../../styles/styles";
import KeyBoardAware from "../../common/KeyboardAware";
;
import { DummyDoctor, DummyUser, locationIcon } from "../../helper/ImageAssets";
import NavigationService from "../../navigation/NavigationService";
import { REQUEST_APPOINTMENT_SCREEN } from "../../navigation/routes";
import {
  SIXTEEN,
  THIRTY_FOUR,
  NORMAL,
} from "../../common/AppText";
import { IMAGE_PATH1 } from "../../helper/Constants";

const DoctorProfile = ({ route }) => {
  const data = route?.params?.data ?? "";

  const address = data?.address ?? "";

  const onPressRequest = () => {
    NavigationService.navigate(REQUEST_APPOINTMENT_SCREEN, { data: data });
  };


  return (
    <AppSafeAreaView statusColor={colors.bg_second}>
      <View style={styles.mainSecond}>
        <Toolbar isBack />
        <KeyBoardAware style={styles.profileContainer}>
          <View
            style={[
              styles.profileInfo,
              {
                marginTop: 75,
              },
            ]}
          >
            <AppText type={THIRTY_EIGHT} weight={MEDIUM}>
              {data?.user_details?.name ? data?.user_details?.name : data?.name} 
            </AppText>
            {(address?.state != null && address?.state )?(
              <View style={[styles.homeToolContainer4,{alignItems:'center',justifyContent:'center'}]}>
              <Image
                source={locationIcon}
                resizeMode="contain"
                style={styles.locationIcon}
                tintColor={colors.buttonBg}
              />
              <AppText weight={MEDIUM} type={FOURTEEN} >
                {`${address?.address},${address?.city},${address?.state}`}
              </AppText>
            </View>)
          :<></>  
          }
            <View style={styles.idContainer}>
              <AppText type={FOURTEEN} color={WHITE}>
                R.N. :- {data?.rn_number?.rn_number ? data?.rn_number?.rn_number : data?.doctor_details?.rn_number}
              </AppText>
            </View>
          </View>
          {/* <View style={styles.feesContainer}>
            <AppText style={styles.feeStyle} type={SIXTEEN} weight={NORMAL}>
              Fee:
            </AppText>
            <AppText type={THIRTY_FOUR} weight={MEDIUM}>
              {`₹ ${data?.rn_number ? data?.rn_number?.fees : data?.doctor_details?.fees}`}
            </AppText>
          </View> */}
          <View style={styles.specialtyContainer}>
            <AppText type={FOURTEEN}>Specialty:</AppText>
            <View style={styles.homeToolContainer2}>
              { data?.spec_details?
              data?.spec_details?.map((e, index) => {
                return (
                  <View
                    key={e?.id}
                    style={[
                      styles.department,
                    ]}
                  >
                    <AppText color={WHITE}>
                      {e?.speciality?.specialization}
                    </AppText>
                  </View>
                );
              })
              :
              data?.doctor_speciality?.map((e, index) => {
                return (
                  <View
                  key={e?.id}
                    style={[
                      styles.department,
                    ]}
                  >
                    <AppText color={WHITE}>
                      {e?.specialization}
                    </AppText>
                  </View>
                );
              })
            }
            </View>
          </View>
        </KeyBoardAware>
          <Button
            children="Request an Appointment"
            onPress={() => onPressRequest()}
            containerStyle={{margin:10}}
          />
      </View>
      <Image
        source={
          data?.user_details?.avatar 
            ? {uri:IMAGE_PATH1 + data?.user_details?.avatar }
            :data?.avatar 
            ? {uri:IMAGE_PATH1 + data?.avatar }
            : DummyDoctor
        }
        resizeMode="cover"
        style={styles.profileImage2}
      />
    </AppSafeAreaView>
  );
};

export default DoctorProfile;