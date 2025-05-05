import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { universalPaddingHorizontal } from "../../../theme/dimens";

export const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    listContainerStyle: {
        gap: 10,
        marginTop: 20,
        paddingBottom:20
    },
    itemSepratorStyle: {
        height: 1,
        backgroundColor:
            colors.buttonBg,
        width: '100%',
        marginVertical: 10
    },
    itemContainer: {
       width:'100%',
        flexDirection: 'row',
        gap: 5,
        alignItems:'center'
    },
    itemContainer2:{
        flexDirection:'row',
        width:'90%',
        gap:5
    },
    locationIconStyle: {
        width: 20,
        height: 20
    },
    deleteIconStyle:{
        width:20,
        height:20
    },
    addContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.loader,
        position: 'absolute',
        bottom: 50,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    add: {
        // alignSelf: 'center',
        // flex: 1,
        // justifyContent: 'center',
        // textAlignVertical: 'center',
        // alignItems: 'center',
        fontSize: 35
    },
    addLocationContainerStyle: {
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        flex: 1,
        paddingTop: 50
    },
    locationList: {
        flexGrow: 1,
        backgroundColor: colors.white,
        borderWidth: 0.5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        overflow: 'hidden',
        borderColor: colors.border,
        position: 'absolute',
        top: 140,
        alignSelf: 'center',
        width: '99%',
        zIndex: 1,
        elevation: 2,
        paddingTop: 10
    },
    locationListContainer: {
        padding: 10,
    },
    itemSepratorContainer: {
        height: 1,
        backgroundColor: colors.border
    },
    buttonContainer: {
        padding: universalPaddingHorizontal,
        elevation: 10,
        backgroundColor: colors.mainBg,
        marginTop: 30,
    },
    cancelBtnStyle:{ 
        height: 20, 
        width: 20, 
        position: 'absolute', 
        right: 2 
    },
    crossIconStyle:{ 
        height: 20, 
        width: 20 
    }
})