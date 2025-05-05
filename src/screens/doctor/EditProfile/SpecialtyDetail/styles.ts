import { StyleSheet } from "react-native";
import { colors } from "../../../../theme/colors";
const styles = StyleSheet.create({
  specialityBox: {
    borderWidth: 2,
    borderColor: colors.border,
    height: 100,
    width: "42%",
    marginHorizontal: 16,
    marginTop: 30,
    alignItems: "center",
    justifyContent:'center',
    borderRadius: 6,
    paddingHorizontal:10
    // marginBottom:500
  },
  feature: {
    // flex: 1,
    // alignItems: "center",
    // flexDirection: "row",
    // flexWrap: "wrap",
    // left: 8,
    // textAlign: "center",
    // alignSelf: "center",
    // textAlign: "center",
    // justifyContent: "center",
    // width: "100%",
    // marginTop: 15,
  },
  deleteBtn:{
    position:"absolute",
    top:0,
    right:0
  },
  deleteIcon: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    top: 4,
    right: 2,
  },
  requestButtonContainer: {
    // padding: universalPaddingHorizontal,
    // elevation: 10,
    backgroundColor: colors.mainBg,
    marginTop: 15,
    marginBottom: 10,
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
  uploadImage: {
    height: 200,
    width: 200,
    alignSelf: "center",
    // marginVertical: 20,
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
});

export default styles;
