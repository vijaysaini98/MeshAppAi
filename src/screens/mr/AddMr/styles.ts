import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { borderWidth, inputHeight, universalPaddingHorizontal } from "../../../theme/dimens";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.mainBg,
    },
    mainContainerSecond: {
        paddingHorizontal: 20
    },
    profileImageContainer: {
        height: 110,
        borderColor: colors.border,
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: 16,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        width: 100,
    },
    profileImage: {
        height: 100,
        width: 100,
    },
    cancelProfileImage: {
        width: 15,
        height: 15
    },
    cancelProfileImageBtn: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    cameraImageStyle: {
        height: 20,
        width: 18,
    },
    profileImageLabel: {
        textAlign: "center",
        marginTop: 10,
    },
    labelStyle: { marginTop: 10 },
    genderRadioBtnContainer: {
        flexDirection: 'row',
        // width: '100%',
        alignItems: 'center',
        gap: 20,
        marginTop: 10
    },
    dobContainer: {
        height: inputHeight,
        borderWidth: borderWidth,
        borderColor: colors.border,
        borderRadius: 5,
        paddingHorizontal: universalPaddingHorizontal,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        justifyContent: 'space-between'
    },
    privacyContainer: {
        marginTop: 50,
        width: "100%",
        flexDirection: "row",
    },
    privacyLink: {
        color: colors.buttonBg,
        textDecorationLine: "underline",
    },
    radioBtnContainerStyle: {
        borderWidth: 0.5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        borderColor: colors.place_holder,
    },
    radioStyle: { width: 10, height: 10 },
    checkIconStyle: {
        width: 18,
        height: 18,
        marginEnd: 10
    },
    locationListContainerStyle: {
        flexGrow: 1,
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        overflow: 'hidden',
        borderColor: colors.border,
        position: 'absolute',
        top: 90,
        // bottom:220,
        alignSelf: 'center',
        width: '99%',
        zIndex: 1,
        elevation: 2,
        paddingTop: 10
    },
    itemSperatorStyle: {
        height: 1,
        backgroundColor: colors.border
    },
    locationClose: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 2
    },
    required: {
        color: colors.red
    },
    privacyPolicyText: { color: colors.place_holder },
    submitBtnStyle: { marginVertical: 20 },
    closeIcon: { height: 20, width: 20 }
})