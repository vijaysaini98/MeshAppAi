import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { universalPaddingHorizontal } from "../../../theme/dimens";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  selfieContainer: {
    height: 250,
    borderColor: colors.border,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    // marginHorizontal:40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 40,
  },
  selfieCamera: {
    height: 35,
    width: 39,
  },
  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
  btnView: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    // marginTop:75,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  imageFound: {
    height: 240,
    width: 240,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    margin:10,
    // padding: 10,
    alignItems: "center",
    width: "90%",
    // aspectRatio: 1,
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 5,
    padding: 10,
    backgroundColor:'white',
    borderRadius:24,
    zIndex:1
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",borderRadius:10
  },
  crossBtn:{
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  crossIcon:{ height: 16, width: 16 }
});
export default styles;
