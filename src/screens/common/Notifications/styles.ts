import {StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  mainView: {
    // height: 132,
    borderWidth: 2,
    borderColor: colors.border,
    flex: 1,
    borderRadius: 6,
    // marginTop: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    marginVertical: 15,
  },
  imageStyles: {
    height: 44,
    width: 44,
  },
  imgView: {
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  textView: {
    marginVertical: 20,
    flex: 1,
    flexGrow: 1,
    width: 0,
  },
  dateStyle: {
    marginVertical: 6,
  },
  contentStyle: {
    marginTop: 5,
  },
});
export default styles;
