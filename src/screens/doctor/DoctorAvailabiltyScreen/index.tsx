import { Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppSafeAreaView,
  AppText,
  FOURTEEN,
  SIXTEEN,
  Toolbar,
} from "../../../common";
import KeyBoardAware from "../../../common/KeyboardAware";
import styles from "./styles";
import TouchableOpacityView from "../../../common/TouchableOpacityView";
import moment from "moment";
import { BOLD, BUTTON_BG, LIGHT } from "../../../common/AppText";
;
import { Cross_logo, add_logo, locationIcon } from "../../../helper/ImageAssets";
import AddAvailabilty from "../../common/AddAvailabilty";
import { getNext7Days } from "../../../helper/utility";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteDoctorSlots } from "../../../slices/drAvailabilitySlice/drAvailabilityAction";
import { AnimationSpinner } from "../../../animation";
import { drProfileTimeSlot } from "../../../slices/mrSlice/mrAction";
import { getDoctorLocation } from "../../../slices/drSlice/drAction";
import { colors } from "../../../theme/colors";

const DoctorAvailabilityScreen = () => {
  const dispatch = useAppDispatch();

  const { isLoading, drEditProfile } = useAppSelector((state) => {
    return state.doctor;
  });

  const { profileTimeSlot } = useAppSelector((state) => {
    return state.mr;
  });

  let dateFormat = {};

  const [appointment, setAppointment] = useState(0);
  const [availabilityData, setAvailabilityData] = useState([dateFormat]);
  const [openRbSheet, setOpenRbSheet] = useState(false);
  const [newDateData, setNewDateData] = useState("");
  const [changeDataId, setChangeDataId] = useState("");
  const [selectDay, setSelectDay] = useState("");

  useEffect(() => {
    dispatch(drProfileTimeSlot(drEditProfile?.spec_detail[0]?.user_id));
    dispatch(getDoctorLocation(drEditProfile?.spec_detail[0]?.user_id));
  }, []);


  useEffect(() => {
    if (newDateData) {
      let newData = [...availabilityData];
      newData[changeDataId].dates.push(newDateData);
      setAvailabilityData(newData);
    }
  }, [newDateData]);

  useEffect(() => {
    const createNewData = (nextDaysArray, period) => {
      return nextDaysArray?.map((day, index) => {
        const originalDate = moment(day, "dddd, D MMM YYYY");
        const newDate = originalDate.format("YYYY-MM-DD");
        let temp = [];

        Object.keys(profileTimeSlot).forEach(dateKey => {
          const locations = profileTimeSlot[dateKey];

          Object.values(locations).forEach(locationData => {
            locationData.slots.forEach(slot => {
              if (slot?.slot_day === newDate && slot?.period_availability === period) {
                const locationInfo = slot?.timeSlotLocation?.doctorAddress;
                let data = {
                  slot_start_time: slot?.slot_start_time,
                  slot_end_time: slot?.slot_end_time,
                  ids: slot?.id,
                  location: locationInfo ? `${locationInfo.name}, ${locationInfo.address}, ${locationInfo.state}, ${locationInfo.pincode}` : null,
                  locationId: locationInfo?.id,
                  fee_type: slot?.fee_type
                };

                let locationExists = false;
                for (let i = 0; i < temp.length; i++) {
                  if (temp[i].locationId === data.locationId) {
                    temp[i].time.push(data);
                    locationExists = true;
                    break;
                  }
                }
                if (!locationExists) {
                  temp.push({
                    location: data.location,
                    locationId: data.locationId,
                    time: [data]
                  });
                }
              }
            });
          });
        });
        temp.forEach(location => {
          location.time.sort((a, b) => {
            return moment(a.slot_start_time, "HH:mm:ss").diff(moment(b.slot_start_time, "HH:mm:ss"));
          });
        });

        return {
          time: day,
          dates: temp,
          id: index,
        };
      });
    };

    if (appointment === 0) {
      const next7DaysArray = getNext7Days(7);
      const newData = createNewData(next7DaysArray, "Weekly");
      setAvailabilityData(newData);
    } else {
      const next30DaysArray = getNext7Days(30);
      const newData = createNewData(next30DaysArray, "Monthly");
      setAvailabilityData(newData);
    }
  }, [profileTimeSlot, appointment]);

  const onPressAppointmentTypeButton = (id) => {
    dispatch(drProfileTimeSlot(drEditProfile?.spec_detail[0]?.user_id));
    if (appointment !== id) {
      setAppointment(id);
    } else {
      setAppointment("");
    }
  };

  const handleAddMore = (id, day) => {
    setSelectDay(day);
    setChangeDataId(id);
    setOpenRbSheet(true);
  };

  const handleDeleteTime = (index, insideIndex, idFound) => {
    let data = {
      id: idFound,
    };
    if (idFound) {
      dispatch(deleteDoctorSlots(data, onSucess))
    } else {
      let newData = [...availabilityData];
      let newArr = newData[index].dates;
      newArr.splice(insideIndex, 1);
      newData[index].dates = newArr;
      setAvailabilityData(newData);
    }
  };

  const onSucess = () => {
    dispatch(drProfileTimeSlot(drEditProfile?.spec_detail[0]?.user_id));
  };

  const TimeSloatComponent = ({ data, index, dateIndex }) => {
    return (
      <View
      key={data?.locationId}
        style={{
          width: '100%',
          paddingVertical: 10,
          paddingHorizontal: 10
        }}
      >
        {data?.location &&
          <View
            style={styles.locationContainerStyle}>
            <Image
              source={locationIcon}
              style={{ height: 18, width: 18 }}
              resizeMode="contain"
              tintColor={colors.buttonBg}
            />
            <AppText type={FOURTEEN}>
              {data?.location}
            </AppText>
          </View>
        }
        <View
          key={index}
          style={[styles.timeContainer]}>
          {data?.time?.map((items, insideIndex) => {
            const formattedStartTime = moment(items?.slot_start_time, "HH:mm:ss").format("HH:mm");
            const formattedEndTime = moment(items?.slot_end_time, "HH:mm:ss").format("HH:mm");

            return (
              <View
                key={insideIndex}
                style={[styles.timeSlotContainer]}>
                <AppText type={SIXTEEN} weight={LIGHT} style={styles.time} >
                  {`${formattedStartTime} - ${formattedEndTime}`}
                </AppText>
                <TouchableOpacityView
                  onPress={() =>
                    handleDeleteTime(index, dateIndex, insideIndex, items?.ids)
                  }
                >
                  <Image
                    style={styles.crossStyle}
                    resizeMode="contain"
                    source={Cross_logo}
                  />
                </TouchableOpacityView>
              </View>
            );
          })}
        </View>
      </View>
    )
  }

  return (
    <>
      {isLoading && <AnimationSpinner />}
      <AppSafeAreaView style={styles.container}>
        <Toolbar title="My Availability" />
        <KeyBoardAware>
          
          <AppText style={styles.typeText} type={SIXTEEN} weight={BOLD}>
            Time Slots Repeat Next 7 day's
          </AppText>
          <View>
            {availabilityData?.map((e, index) => {
              return (
                <View
                  key={e?.id}
                  style={{
                    marginBottom:
                      availabilityData?.length === index + 1 ? 70 : 4,
                  }}
                >
                  <View style={styles.slot}>
                    <AppText color={BUTTON_BG} type={FOURTEEN}>
                      {e?.time}
                    </AppText>
                    <TouchableOpacityView
                      onPress={() => handleAddMore(index, e?.time)}
                      style={{
                        marginLeft: "auto",
                      }}
                    >
                      <Image
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                        source={add_logo}
                      />
                    </TouchableOpacityView>
                  </View>
                  <View>
                    <View style={[styles.timeContainer, { marginTop: 10 }]}>
                      {e?.dates?.map((items, insideIndex) =>
                        <TimeSloatComponent data={items} index={index} dateIndex={insideIndex} />
                      )
                      }
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </KeyBoardAware>
        {openRbSheet && (
          <AddAvailabilty
            opneRbSheet={openRbSheet}
            setOpenRbSheet={setOpenRbSheet}
            setData={setNewDateData}
            setDay={selectDay}
            appointment={appointment}
            location
            userId={drEditProfile?.spec_detail[0]?.user_id}
            type={'doctor'}
          />
        )}
      </AppSafeAreaView>
    </>
  );
};

export default DoctorAvailabilityScreen;
