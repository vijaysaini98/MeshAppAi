import { StyleSheet } from "react-native";
import {
  borderWidth,
  inputHeight,
  universalPaddingHorizontal,
} from "../../../../theme/dimens";
import { colors } from "../../../../theme/colors";
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 15,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.border,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  buttonContainer: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
  subContainer: {
    // justifyContent: 'center',
    // flex: 1,
    alignSelf: "center",
    marginHorizontal: 40,
    marginVertical: 20,
    width: "100%",
  },
  selfieCamera: {
    height: 40,
    width: 40,
  },
  selfieContainer: {
    height: 175,
    borderColor: colors.border,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    // marginHorizontal:40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginLeft: 15,
  },
  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
  uploadImage: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginVertical: 20,
  },
  pdf: {
    // flex: 1,
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});

export default styles;
