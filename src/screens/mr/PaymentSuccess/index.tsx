import { Image, View } from "react-native";
import React from "react";
import { AppSafeAreaView, AppText, Button, Toolbar } from "../../../common";
import styles from "./styles";
;
import { checkMark, DummyUser } from "../../../helper/ImageAssets";
import {
  EIGHTEEN,
  MEDIUM,
  TWENTY,
  SIXTEEN,
  SEMI_BOLD,
} from "../../../common/AppText";
import { useAppSelector } from "../../../store/hooks";
import NavigationService from "../../../navigation/NavigationService";
import {
  MR_HOME_SCREEN,
} from "../../../navigation/routes";
import moment from "moment";
import { IMAGE_PATH1 } from "../../../helper/Constants";

const PaymentSuccess = ({ route }) => {
  const { razorRecord,mrProfiledata } = useAppSelector((state) => {
    return state.mr;
  });
  
  const { amount, drData } = route?.params || {};
  

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar
        title="Payment Success"
        backFunction={() => NavigationService.navigate(MR_HOME_SCREEN)}
      />
      <View style={styles.subContainer}>
        <Image
          source={checkMark}
          resizeMode="contain"
          style={styles.checkMark}
        />
        <AppText type={TWENTY} style={styles.paymentText}>
          Your Payment{" "}
          <AppText type={TWENTY} style={styles.successText}>
            Successfully
          </AppText>
          {"\n"} Paid To
        </AppText>
        <View style={styles.miniProfile}>
            <Image
              source={drData?.avatar ?{
                uri:IMAGE_PATH1 + drData?.avatar
              }: DummyUser}
              resizeMode="cover"
              style={styles.drProfile}
            />
          <View style={styles.textView}>
            <AppText type={EIGHTEEN}  >
              {drData?.name}
              </AppText>
            <AppText style={styles.FeeStyle} weight={MEDIUM} type={TWENTY}>
              ₹{amount ? amount / 100 : "-"}
            </AppText>
          </View>
        </View>
        <View style={styles.trnxId}>
          <AppText style={styles.idStyle} type={SIXTEEN}>
            Transaction ID
          </AppText>
          <AppText type={SIXTEEN} weight={SEMI_BOLD}>
            {razorRecord?.razorpay_order_id}
          </AppText>
        </View>
        <View style={styles.trnxIds}>
          <AppText style={styles.idStyle} type={SIXTEEN}>
            Pay On
          </AppText>
          <AppText type={SIXTEEN} weight={SEMI_BOLD}>
            {moment().format("DD MMMM, YYYY")}
          </AppText>
        </View>
        <View style={styles.btnView}>
          <Button
            onPress={() => NavigationService.navigate(MR_HOME_SCREEN)}
            containerStyle={styles.btnStyle}
            children="Done"
          />
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default PaymentSuccess;
