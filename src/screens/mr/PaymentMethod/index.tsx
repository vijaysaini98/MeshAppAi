import { View, Text, Alert, Image } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { AppSafeAreaView, AppText, Button, Toolbar } from "../../../common";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
;
import { bank, masterCard, paypal } from "../../../helper/ImageAssets";
import { colors } from "../../../theme/colors";
import Paypal from "./PaymentTypes/Paypal";
import MasterCard from "./PaymentTypes/MasterCard";
import Bank from "./PaymentTypes/Bank";
const PaymentMethod = () => {
  const [status, setStatus] = useState({
    paypal: colors.buttonBg,
    masterCard: colors.tabBg,
    bank: colors.tabBg,
  });
  const [selectedVal, setSelectedValue] = useState("paypal");

  const onPress = (button) => {
    setSelectedValue(button);

    setStatus((prevColors) => ({
      ...prevColors,
      paypal: button === "paypal" ? colors.buttonBg : colors.tabBg,
      masterCard: button === "masterCard" ? colors.buttonBg : colors.tabBg,
      bank: button === "bank" ? colors.buttonBg : colors.tabBg,
    }));
  };

  return (
    <AppSafeAreaView style={styles.mainContainer}>
      <Toolbar isAddIcon title="Payment Method" />
      <View style={styles.subContainer}>
        <View style={styles.paymentMethodStyle}>
          <TouchableOpacityView
            style={styles.paypalBox(status)}
            onPress={() => onPress("paypal")}
          >
            <Image
              source={paypal}
              style={styles.paypal}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          <TouchableOpacityView
            style={styles.masterCardStyle(status)}
            onPress={() => onPress("masterCard")}
          >
            <Image
              source={masterCard}
              style={styles.paypal}
              resizeMode="contain"
            />
          </TouchableOpacityView>
          <TouchableOpacityView
            style={styles.bankStyle(status)}
            onPress={() => onPress("bank")}
          >
            <Image source={bank} style={styles.bank} resizeMode="contain" />
          </TouchableOpacityView>
        </View>
        {selectedVal === "paypal" ? (
          <Paypal />
        ) : selectedVal === "masterCard" ? (
          <MasterCard />
        ) : (
          <Bank />
        )}
      </View>
      <View style={styles.requestButtonContainer}>
        <Button children="Pay Now" />
      </View>
    </AppSafeAreaView>
  );
};

export default PaymentMethod;
