import { View } from "react-native";
import React, { useEffect } from "react";
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  Button,
  NORMAL,
  SIXTEEN,
  TWENTY,
  Toolbar,
  WHITE,
} from "../../../common";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  downloadPaymentReceipt,
  paymentReceiptApi,
} from "../../../slices/mrSlice/mrAction";
import { AnimationSpinner } from "../../../animation";
import moment from "moment";

const DoctorPaymentReceipt = ({ route }) => {
  const dispatch = useAppDispatch();
  const details = route?.params?.data;

  const currentDate = new Date()


  const { paymentReceiptData, isLoading, paymentLoader } = useAppSelector(
    (state) => {
      return state.mr;
    }
  );

  useEffect(() => {
    dispatch(paymentReceiptApi());
  }, []);

  const paymentReceipt = [
    {
      id: "1",
      left: "Company Name:-",
      right: details?.user_name[0]?.Company?.company_name,
    },
    {
      id: "2",
      left: "From:-",
      right: details?.user_name[0]?.name,
    },
    {
      id: "3",
      left: "To:-",
      right: details?.doctor_profile?.name,
    },
    {
      id: "4",
      left: "Date:-",
      right: details?.appointment_date
        ? moment(details?.appointment_date?.created_at).format("MMMM Do YYYY")
        : moment(currentDate.created_at).format("MMMM Do YYYY")
    },
    {
      id: "5",
      left: "Payment Method:",
      right: "Mike Hoover",
    },
    {
      id: "6",
      left: "Total Amount:-",
      right: details?.final_amount ? `\u20B9 ${details?.final_amount}` : "\u20B9 0",
    },
  ];
  const onDownload = () => {
    let data = `company_name=${details?.user_name[0]?.Company?.company_name
        ? details?.user_name[0]?.Company?.company_name
        : ""
      }&from=${details?.user_name[0]?.name}&to=${details?.doctor_profile?.name
      }&date=${moment(
        details?.appointment_date
          ? details?.appointment_date[0]?.created_at
          : new Date()
      ).format("MMMM Do YYYY")}&payment_method=online&amount=${details?.final_amount ? details?.final_amount : "0"
      }&appointment_id=${details?.id}&token=Bearer `;
    dispatch(downloadPaymentReceipt(data));
  };
  return (
    <>
      {paymentLoader && <AnimationSpinner />}
      <AppSafeAreaView>
        <Toolbar title="Payment Receipt" />

        <View style={styles.mainPadding}>
          {isLoading ? (
            <AnimationSpinner />
          ) : (
            paymentReceipt.map((item, index) => {
              return (
                <View
                  style={[
                    styles.container,
                    {
                      borderTopWidth: index === 5 ? 0.5 : 0,
                      borderBottomWidth: index === 5 ? 0.5 : 0,
                    },
                  ]}
                >
                  <AppText type={SIXTEEN} style={styles.leftContainer}>
                    {item?.left}
                  </AppText>
                  {index === 4 ? (
                    <View style={styles.cardContainer}>
                      <AppText color={WHITE} style={styles.card} type={TWENTY}>
                        Online
                      </AppText>
                    </View>
                  ) : (
                    <AppText
                      type={SIXTEEN}
                      weight={index === 5 ? BOLD : NORMAL}
                      style={styles.rightContainer}
                    >
                      {item?.right}
                    </AppText>
                  )}
                </View>
              );
            })
          )}
          <View style={styles.buttonContainer}>
            <Button children="Download Receipt" onPress={() => onDownload()} />
          </View>
        </View>
      </AppSafeAreaView>
    </>
  );
};

export default DoctorPaymentReceipt;
