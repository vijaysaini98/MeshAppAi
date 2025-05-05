import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppSafeAreaView, Input, Button, AppText, SIXTEEN, FOURTEEN, SEMI_BOLD} from '../../../../common';
import KeyBoardAware from '../../../../common/KeyboardAware';
import {
  calendarIcon,
  cardIcon,
  cvvIcon,
  paypal,
  userIcon,
} from '../../../../helper/ImageAssets';
import {colors} from '../../../../theme/colors';

const MasterCard = () => {
  return (
    <View>
    
    <View style={{}}>
      <View style={{}}>
        <Input icon={userIcon} placeholder="Card Holder Name" />
        <Input icon={cardIcon} placeholder="Card Number" />
        <View style={styles.groupStyle}>
          <Input
            containerStyle={styles.cvvStyle}
            icon={cvvIcon}
            placeholder="CVV"
          />
          <Input
            containerStyle={styles.dateStyle}
            icon={calendarIcon}
            placeholder="Expired Date"
          />
        </View>
      </View>
    </View>
      <View style={styles.bottomView}>
        {/* <Input/> */}
        <View style={styles.amountView}>
        <AppText type={FOURTEEN}>Amount</AppText>
        <AppText type={FOURTEEN}>$950.00</AppText>
        </View>
        <View style={styles.amountView}>
        <AppText type={FOURTEEN}>GST Tax</AppText>
        <AppText type={FOURTEEN}>₹50.00</AppText>
        </View>
        <View style={styles.lineView}></View>
        <View style={styles.totalamountView}>
        <AppText type={FOURTEEN}>Total Amount</AppText>
        <AppText weight={SEMI_BOLD} type={FOURTEEN}>₹1000.00</AppText>
        </View>
      </View>
    </View>
  );
};

export default MasterCard;

const styles = StyleSheet.create({
  cvvStyle: {
    width: 120,
  },
  dateStyle: {
    width: 192,
  },
  groupStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    // position:"absolute",
    // bottom:10
  },
  bottomView:{
    height:150,
    backgroundColor:colors.tabBg,
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    marginTop:10,
    position:"absolute",
    top:Dimensions.get('window').height-400,
    left:0,
    right:0
  },
  amountView:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:16,
    opacity:0.6,
    marginTop:16
  },
  lineView:{
    height:1,
    backgroundColor:colors.lineColor,
    marginTop:16,
    marginHorizontal:16
  },
  totalamountView:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:16,
    // opacity:0.6,
    marginTop:16
  }
});
