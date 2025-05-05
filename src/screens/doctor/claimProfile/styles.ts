import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {borderWidth, inputHeight, universalPaddingHorizontal, universalPaddingVertical} from '../../../theme/dimens';

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.mainBg,
    paddingHorizontal: universalPaddingHorizontal,
    marginTop: 50,
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    marginEnd: 5,
  },
  filterContainer: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 5,
  },
  bellIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',

    marginTop: 15,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
  },
  addContainer: {
    // height: 32,
    // width: 32,
    borderRadius: 50,
    backgroundColor: colors.loader,
    position: 'absolute',
    bottom: 82,
    right: 10,
    paddingHorizontal: 10,
    
  },
  add: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
  },
  topContainer: {
    width: '100%',
    height: '100%',
  },
  middleContainer: {
    alignSelf: 'center',
    marginTop: 80,
  },
  requestContainer: {
    marginTop: 20,
  },
  claim: {
    alignSelf: 'center',
  },
  noDoctorsFound: {
    alignSelf: 'center',
    marginTop: 50,
  },
  listContainerStyle:{
    flexGrow:1,
    paddingHorizontal:universalPaddingHorizontal,
    gap:10,
    marginTop:10
  },
  mainCardContainer:{ paddingVertical:16,
    paddingHorizontal:10,
      borderWidth: borderWidth,
      borderColor: colors.border,
      borderRadius: 6,
      gap: 10
      },
      containerStyle:{
        flex:1,
        flexDirection:'row',
          gap:10
        },
        profileImageStyle:{
          height: 115,
          width: 115,
          borderRadius: 8,
        },
        specRegContainer:{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingRight: 20,
          alignItems: 'center',
          gap:5
        },
        specialityContainer :{
          backgroundColor: colors.buttonBg,
          borderRadius: 20,
          paddingHorizontal: universalPaddingVertical,
          paddingVertical: 5,
          marginTop: 10,
        },
        regContainerStyle:{
          backgroundColor: colors.loader,
          borderRadius: 20,
          paddingHorizontal: universalPaddingVertical,
          paddingVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
         
        },
        locationContainer:{
          flexDirection:'row',marginTop:10,gap:5
        },
        locationIconStyle :{
          height: 18,
          width: 18,
        }
});
export default styles;
