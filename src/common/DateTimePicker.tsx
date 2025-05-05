import React from 'react';
import {View, StyleSheet, Platform,Image} from 'react-native';
// import Image from 'react-native-fast-image';

import {TouchableOpacity} from 'react-native-gesture-handler';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import {calendarIcon, clockIcon} from '../helper/ImageAssets';

interface DateTimeProps {
  onPress: () => {};
  handleConfirm: () => {};
  onCancel: () => {};
  minimumDate: any;
  isVisible: boolean;
  date: boolean;
  mode: any;
  is24Hour:boolean;
  isIcon:boolean,
  maximumDate:any
}

const DateModal = ({
  handleConfirm,
  isVisible,
  onPress,
  onCancel,
  mode,
  date,
  minimumDate,
  is24Hour,
  isIcon,
  maximumDate
}: DateTimeProps) => {
  return (
    <View>
      {(!isIcon) && 
       ( <TouchableOpacity onPress={onPress}>
        {date ? (
          <Image
            style={styles.imagestyle}
            source={calendarIcon}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.imagestyle}
            source={clockIcon}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>)
      }

      <DatePicker
      modal={true}
        open={isVisible}
        mode={mode}
        date={new Date()}
        // is24Hour={is24Hour}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        // display={Platform.OS == 'ios' ?  'calendar' : 'default'}
        // pickerComponentStyleIOS={{height:300,zIndex:99}}
        // style={{width:Platform.OS == 'ios' && "100%" , height:Platform.OS == 'ios' && "auto"}}
      />
    </View>
  );
};

export default DateModal;

const styles = StyleSheet.create({
  imagestyle: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
  },
});
