import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { universalPaddingHorizontal } from "../../../theme/dimens";

const styles = StyleSheet.create({
  mainPadding: {
    flex: 1,
    backgroundColor: colors.mainBg,
    // justifyContent: "center",
    paddingTop:50
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 43,
    marginVertical:10
  },

  cardContainer: {
    backgroundColor: colors.loader,
    height: 37,
    alignSelf: "center",
    borderRadius: 6,
    // alignItems:'center',
    justifyContent:'center',
    right: 40,
  },
  card: {
    // flex: 1,
    alignSelf: "center",
    textAlignVertical: "center",
    paddingHorizontal: 30,
  },
  leftContainer: {
    flex: 1,
    // lineHeight: 70,
    marginVertical:10,
  },
  rightContainer: {
    flex: 1,
    // lineHeight: 70,
    marginVertical:10
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
});

export default styles;
