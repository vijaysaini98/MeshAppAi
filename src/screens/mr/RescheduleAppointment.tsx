import React from 'react';
import {AppSafeAreaView, Toolbar} from '../../common';
import {FlatList, View} from 'react-native';
import {styles} from '../../styles/styles';
import {doctorListReschedule} from '../../helper/dummydata';
import {DoctorBox} from './Home/Home';
import {ListEmptyComponent} from './Appointment';
import {commonStyles} from '../../theme/commonStyles';

const RescheduleAppointment = () => {
  return (
    <AppSafeAreaView>
      <Toolbar title="Reschedule Appointments" />
      <View style={styles.mainPadding}>
        <FlatList
          data={doctorListReschedule}
          renderItem={({item}) => <DoctorBox item={item} />}
          keyExtractor={item => item?.id}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={commonStyles.flexGrow}
          style={{marginTop: 20}}
        />
      </View>
    </AppSafeAreaView>
  );
};

export default RescheduleAppointment;
