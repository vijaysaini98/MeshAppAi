import { View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { AppSafeAreaView, Toolbar } from "../../../common";
import styles from "./styles";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  DoctorpaymentHistoryApi,
} from "../../../slices/mrSlice/mrAction";
import NavigationService from "../../../navigation/NavigationService";
import {
  DOCTOR_PAYMENT_RECEIPT,
} from "../../../navigation/routes";
import { AnimationSpinner } from "../../../animation";
import { ListEmptyComponent } from "../Appointment";
import { DoctorBox } from "../../mr/Home/components/doctorBox";

const DoctorPaymentHistory = () => {
  const dispatch = useAppDispatch();

  const { doctorPaymentHistoryData, isLoading } = useAppSelector((state) => {
    return state.mr;
  });

  useEffect(() => {
    dispatch(DoctorpaymentHistoryApi());
  }, []);

  const onPressBox = (e) => {
    NavigationService.navigate(DOCTOR_PAYMENT_RECEIPT, { data: e });
  };

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView>
        <Toolbar title="Payment History" />
        <View style={styles.mainPadding}>
          <View style={styles.container}>
            <FlatList
              data={doctorPaymentHistoryData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <DoctorBox
                  item={item}
                  num={1}
                  location={1}
                  onNavigation={() => onPressBox(item)}
                  download={true}
                  type="dr"
                />
              )}
              keyExtractor={(item) => item?.id}
              ListEmptyComponent={()=><ListEmptyComponent title = {"Payment History"}/>}
            />
          </View>
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default DoctorPaymentHistory;
