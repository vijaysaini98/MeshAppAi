import { View, StyleSheet, Image } from "react-native";
import React, { FC } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  AppText,
  Button,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  TWENTY_FOUR,
} from "../../../common";
import { styles } from "../../../styles/styles";
import { colors } from "../../../theme/colors";
import { Dropdown } from "react-native-element-dropdown";
import { downArrow_Icon } from "../../../helper/ImageAssets";
import { universalPaddingHorizontalMedium } from "../../../theme/dimens";

interface ClinicRequestAcceptSheetProps {
  refSheet: any;
  isLoading: boolean;
  onPressSubmit: () => void;
  locationData: any;
  locationId: number;
  setLocationId: any;
}

const ClinicRequestAcceptSheet: FC<ClinicRequestAcceptSheetProps> = ({
  refSheet,
  isLoading,
  onPressSubmit,
  locationData,
  locationId,
  setLocationId,
}) => {
  return (
    <View>
      <RBSheet
        ref={refSheet}
        height={300}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: colors.rbSheetBackgroung,
          },
          draggableIcon: {
            backgroundColor: "silver",
            width: 100,
          },
        }}
      >
        <View style={acceptSheetStyle.mainContainer}>
          <AppText
            type={TWENTY_FOUR}
            weight={SEMI_BOLD}
            style={styles.sendMessageBottomSheet}
          >
            Accept Clinic Request
          </AppText>
          <AppText
            type={SIXTEEN}
            weight={MEDIUM}
            style={[styles.typeOfAppointment, { marginBottom: 20 }]}
          >
            Select Location
          </AppText>

          <Dropdown
            style={acceptSheetStyle.dropdown}
            dropdownPosition="top"
            placeholderStyle={[acceptSheetStyle.placeholderStyle]}
            selectedTextStyle={acceptSheetStyle.selectedTextStyle}
            inputSearchStyle={acceptSheetStyle.inputSearchStyle}
            iconStyle={acceptSheetStyle.iconStyle}
            data={locationData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Select Location"}
            searchPlaceholder="Search..."
            itemTextStyle={{ color: colors.black }}
            value={locationId}
            onChange={(item) => {
              setLocationId(item?.value);
            }}
            renderRightIcon={() => (
              <Image
                source={downArrow_Icon}
                resizeMode="contain"
                style={acceptSheetStyle.icon}
              />
            )}
          />
        </View>
        <View style={styles.sendMessageSubmitButton}>
          <Button
            loading={isLoading}
            containerStyle={styles.submit}
            children="Submit"
            onPress={() => onPressSubmit()}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default ClinicRequestAcceptSheet;

const acceptSheetStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  feeTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 5,
    justifyContent: "center",
  },
  feeStatusContainer: {
    paddingHorizontal: 10,
    backgroundColor: colors.buttonBg,
    borderRadius: 5,
  },
  dropdown: {
    height: 60,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 6,
    paddingHorizontal: universalPaddingHorizontalMedium,
  },
  placeholderStyle: {
    fontSize: 14,
    color: colors.place_holder,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: colors.black,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 18,
    height: 10,
  },
});
