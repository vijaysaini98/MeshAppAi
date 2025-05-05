import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
;
import {useSelector, useDispatch} from 'react-redux';
import {downArrow_Icon} from '../../../helper/ImageAssets';
import {colors} from '../../../theme/colors';
import styles from './styles';
import {getSpeciality} from '../../../slices/drSlice/drAction';
import { AppText, MEDIUM, THIRTEEN, TWELVE } from '../../../common';

const DropdownComponent = ({
  xyz,
  isFocus,
  onFocus,
  onBlur,
  onChange,
  placeholder,
  data,
  customPlaceholderStyle,
  dropdownPosition,
  title,
  required,
  mainContainer
}) => {
  return (
    <View style={[styles.container,mainContainer]}>
      {title && <AppText type={THIRTEEN} weight={MEDIUM}>{title}
      {
        required && <AppText type = {TWELVE} weight={MEDIUM} style={{color:'red'}} >{"*"}</AppText>
      }
      </AppText>}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: colors.buttonBg}]}
        placeholderStyle={[styles.placeholderStyle,customPlaceholderStyle]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        dropdownPosition={dropdownPosition}
        searchPlaceholder="Search..."
        itemTextStyle={{color: colors.black}}
        value={xyz}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        renderRightIcon={() => (
          <Image
            source={downArrow_Icon}
            resizeMode="contain"
            style={styles.icon}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;
