import React, { useEffect, useRef, useState } from 'react';
import { AppSafeAreaView, AppText, Input, MEDIUM, SIXTEEN, THIRTY_FOUR, Toolbar, WHITE } from '../../../common';
import { FlatList, Image, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { placeHolderText, titleText } from '../../../helper/Constants';
import { useDispatch } from 'react-redux';
import NavigationService from '../../../navigation/NavigationService';
import { delete_icon, location_Icon, searchIconBlue } from '../../../helper/ImageAssets';
import TouchableOpacityView from '../../../common/TouchableOpacityView';
import { ADD_LOCATION } from '../../../navigation/routes';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deleteDoctorLocation, getDoctorLocation } from '../../../slices/drSlice/drAction';
;
import { AnimationSpinner } from '../../../animation';
import { styles } from './styles';
import { ListEmptyComponent } from '../Appointment';
import DeleteConfirmationModal from '../../common/deleteConfirmationModal';

const MylocationSearchBar = () => {
  const [value, setValue] = useState<string>("");

  const onPressback = () => {
    NavigationService.goBack();
  };
  const timeout: any = useRef(null);
  const dispatch: any = useDispatch();

  const onChangeHandler = (value: string) => {
    setValue(value);
    // handler(value)
    clearTimeout(timeout.current);
    if (value?.trim()) {
      timeout.current = setTimeout(() => {
          // dispatch(serachDoctorAPI(value));
      }, 500);
    } else {
      // dispatch(setSearchDataInitial(""));
    }
  };


  return (
    <View style={{ backgroundColor: colors.mainBg }}>
      <View style={styles.searchContainer}>
        <Input
          // containerStyle={{ marginLeft: 20 }}
          placeholder={placeHolderText.search}
          value={value}
          onChangeText={(text) => onChangeHandler(text)}
          autoCapitalize="none"
          returnKeyType="done"
          mainContainer={styles.searchInput}
          icon2={searchIconBlue}
        />
      </View>
    </View>
  );
};

const MyLocation = () => {
  const dispatch = useAppDispatch()

  const { isLoading, doctorLocations, drEditProfile } = useAppSelector((state) => {
    return state.doctor;
  })

  const [showModal, setShowModal] = useState(false);
  const [locationId, setLocationId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    dispatch(getDoctorLocation(drEditProfile?.spec_detail[0].user_id,isLoading))
  }, [])

  const handleDeleteLocation = (item: any) => {
    setLocationId(item?.id)
    setUserId(item?.user_id)
    setShowModal(true);
  }

  const onDelete = () => {
    dispatch(deleteDoctorLocation(locationId, userId))
    setShowModal(false);
  };

  const renderItem = ({ item }) => {
    let tempAdress = item.doctorLocations[0]

    return (
      <View style={[styles.itemContainer]}>
        <View style={styles.itemContainer2}>
          <Image
            source={location_Icon}
            style={styles.locationIconStyle}
            resizeMode='contain'
            tintColor={colors.buttonBg}
          />
          <AppText type={SIXTEEN} weight={MEDIUM} style={{ flex: 1 }}>
            {`${tempAdress?.name}, ${tempAdress?.address}, ${tempAdress?.state}, ${tempAdress?.pincode}`}
          </AppText>
        </View>
        <TouchableOpacityView
          onPress={() => handleDeleteLocation(item)}
        >
          <Image
            source={delete_icon}
            resizeMode='contain'
            style={styles.deleteIconStyle}
            tintColor={colors.buttonBg}
          />
        </TouchableOpacityView>
      </View>
    )
  }

  return (
    <AppSafeAreaView>
      <Toolbar title={titleText.myLocation} />
      <View style={styles.containerStyle}>
        {isLoading && (
          <AnimationSpinner />)}
        <FlatList
          data={doctorLocations}
          contentContainerStyle={styles.listContainerStyle}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSepratorStyle} />
          )}
          ListEmptyComponent={() => (
            <ListEmptyComponent title={"Location"} />
          )}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacityView
          onPress={() => NavigationService.navigate(ADD_LOCATION)}
          style={styles.addContainer}
        >
          <AppText color={WHITE} type={THIRTY_FOUR}>
            +
          </AppText>
        </TouchableOpacityView>
      </View>
      <DeleteConfirmationModal
        visible={showModal}
        onDelete={() => onDelete()}
        confirmationText={"Are you sure?\nyou want to Delete this location?"}
        onCancel={() => setShowModal(false)}
        buttonTitle={"Delete"}
      />
    </AppSafeAreaView>
  )
}

export default MyLocation;