import { View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { AppSafeAreaView, Toolbar } from "../../../common";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { paymentHistoryApi } from "../../../slices/mrSlice/mrAction";
import NavigationService from "../../../navigation/NavigationService";
import { PAYMENT_RECEIPT_SCREEN } from "../../../navigation/routes";
import { AnimationSpinner } from "../../../animation";
import { ListEmptyComponent } from "../../mr/Appointment";
import { DoctorBox } from "../../mr/Home/components/doctorBox";

const PaymentHistory = () => {
  const dispatch = useAppDispatch();

  const { paymentHistoryData, isLoading } = useAppSelector((state) => {
    return state.mr;
  });
  
  useEffect(() => {
    dispatch(paymentHistoryApi());
  }, []);

  const onPressBox = (e) => {
    NavigationService.navigate(PAYMENT_RECEIPT_SCREEN, { data: e });
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView>
        <Toolbar title="Payment History" />
        <View style={styles.mainPadding}>
          <View style={styles.container}>
            <FlatList
              data={paymentHistoryData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <DoctorBox
                  item={item}
                  num={1}
                  location={1}
                  onNavigation={() => onPressBox(item)}
                  download={true}
                />
              )}
              keyExtractor={(item) => item?.id}
              ListEmptyComponent={()=><ListEmptyComponent title = {"Payment History"}/>}
              // contentContainerStyle={commonStyles.flexGrow}
            />
          </View>
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default PaymentHistory;
