import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";
import { universalPaddingHorizontal } from "../../../../theme/dimens";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginHorizontal: 16,
  },
  camera: {
    // height: 20,
    // width: 20,
    // alignSelf: "center",
    marginTop: 25,
    borderRadius: 80,
    position: "absolute",
    right: 0,
    top: -10,
    backgroundColor:colors.white,
    padding:5,
    borderWidth:0.8,
    borderColor:colors.bg_one_dark
  },
  profileImage: {
    height: 120,
    width: 120,
    alignSelf: "center",
    // marginTop: 25,
    borderRadius: 100,
    borderWidth:2,
    borderColor:colors.bg_one_dark
  },
  documentContainer: {
    flexDirection: "row",
    marginTop: 20,
    // backgroundColor:"yellow",
    // justifyContent:"space-around",
    justifyContent: "space-between",
    // flex:1
    width: "110%",
    // marginRight:130
  },
  document: {
    height: 70,
    width: 70,
    alignItems: "center",
    flex: 1,
    alignSelf: "center",
  },
  documentBox: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
    marginTop: 16,
    height: 90,
    width: 90,
    // backgroundColor: "red",
  },
  buttonContainer: {
    // marginBottom: 300,
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    marginTop: 30,
  },
  documentTitle: {
    alignSelf: "center",
  },
  aadharCardContainer: {
    marginStart: 32,
  },
  btnStyle: {
    width: "33%",
    marginTop: 15,
  },
  pdf: {
    // flex: 1,
    width: 90,
    height: 90,
    borderRadius:16
  },
  selfieCamera: {
    height: 20,
    width: 18,
  },
  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
  selfieContainer: {
    height: 100,
    borderColor: colors.border,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    // marginHorizontal:40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  subContainer1: {
    alignSelf: "center",
    // marginHorizontal: 6,
    // marginVertical:20
    // marginTop: 30,
    // marginRight: 5,
  },
  subContainer2: {
    alignSelf: "center",
    // marginHorizontal: 6,
    // marginVertical:20
    marginTop: 30,
    marginRight: 40,
  },
  cancelBtnStyle:{ 
    alignSelf: "flex-end" ,
    position:'absolute',
    zIndex:1,
    top:0,
    right:2
  }
});

export default styles;
