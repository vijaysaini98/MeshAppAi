import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  profileImage: {
    height: 140,
    width: 140,
    marginTop:15,
    alignSelf:"center",
    borderRadius:100,
    borderWidth:2,
    borderColor:colors.bg_one_dark
  },
  departmentStyle: {
    height: 22,
    width: 130,
    borderRadius: 100,
    backgroundColor: colors.tabItem,
    marginVertical: 5,
  },
  departmentText: {
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  divisionText: {
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
  divisionStyle: {
    height: 22,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: colors.bg_one,
    marginLeft: 0,
  },
  anatomyStyle: {
    height: 22,
    paddingHorizontal: 15,
    borderRadius: 100,
    backgroundColor: colors.bg_one,
    marginLeft: 5,
  },
  subContainer: {
    // flexDirection: 'row',
    // marginLeft: 10,
    // marginTop: 30,
    // alignSelf:"center"
  },
  nameView: {
    // marginLeft: 10,
   
  },
  divisiontextStyle: {marginVertical: 5},
  departmentView: {flexDirection: 'row'},
  paymentStyle:{
    marginTop:40
  },
  settingStyle:{
    marginTop:15
  },
  mikeStyle:{
   
    textAlign:"center",
    marginVertical:10
  },
  emailStyle:{
    textAlign:"center"
  },
  settingStyle1:{
    marginTop:15,
    marginBottom:100

  }
});
export default styles;
