import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: colors.mainBg,
      flex: 1,
    },
    emptyContainerStyle: {
      height: 250,
      width: 250,
      alignSelf: "center",
    },
    emptyTextStyle: {
      alignSelf: "center",
      marginBottom: 30,
      color: colors.bg_one_dark,
    },
    card:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.white,
      padding: 16,
      borderRadius: 6,
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
      // elevation: 2,
      // marginHorizontal: 16,
      marginTop: 8,
      borderWidth: 2,
      borderColor: colors.border,
    },
    infoContainer:{
      flex: 1,
      marginRight: 16,
    },
    addressContainer:{
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      gap: 10,
    },
    iconStyle:{ width: 20, height: 20 },
    deleteButton:{
      alingSelf: "flex-end",
      padding: 8,
    },
    address: {
      flexWrap: 'wrap',
      width:"90%"
    },
    headerContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:20,
      marginTop:10
    },
    seeAllText:{
      color:colors.buttonBg,
      textDecorationLine:'underline'
    },
    reqCountText:{
      color:colors.buttonBg, 
      marginRight:10
    }
  });

export default styles;