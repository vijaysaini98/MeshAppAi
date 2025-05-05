import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { colors } from '../../../theme/colors';
import { AppText, Button, RadioButton, SEMI_BOLD, TWENTY_FOUR } from '../../../common';
import { universalPaddingHorizontal } from '../../../theme/dimens';

interface EndMeetingSheetProps {
  data?: Array<{ id?: number; message?: string }>;
  handleSelectMessage?: (index?: number, item?: { id?: number; message?: string }) => void;
  handleEndMeeting?: () => void;
  statusId?: number;
  title?: string;
}

const EndMeetingSheet = forwardRef<RBSheet, EndMeetingSheetProps>((props, ref) => {
  const { data, title, handleSelectMessage, statusId, handleEndMeeting,...restProps } = props;

  return (
    <RBSheet
      ref={ref}
      // height={400}
      height={300}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: colors.rbSheetBackgroung,
        },
        draggableIcon: {
          backgroundColor: 'silver',
          width: 100,
        },
      }}
      {...restProps}
    >
      <View style={[styles.rejectionBox, { flex: 1, marginHorizontal: 16 }]}>
        <AppText type={TWENTY_FOUR} weight={SEMI_BOLD} style={styles.sendMessageBottomSheet}>
            {/* {title} */}
          {"End Meeting"}
        </AppText>
        {data?.map((e, index) => (
          <View key={index}>
            <RadioButton
              radioContainerStyle={styles.appointmentContainer}
              value={statusId === e.id}
              onPress={() => handleSelectMessage(index, e)}
              message={e.message}
            />
          </View>
        ))}
      </View>
      <View style={styles.sendMessageSubmitButton}>
        <Button
          containerStyle={styles.submit}
          children="Submit"
          onPress={handleEndMeeting}
          disabled={statusId === 0}
        />
      </View>
    </RBSheet>
  );
});

export default EndMeetingSheet;

const styles = StyleSheet.create({
  rejectionBox: {
    marginTop: 10,
    flex: 1,
  },
  sendMessageBottomSheet: {
    alignSelf: 'center',
  },
  appointmentContainer: {
    borderWidth: 0.5,
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    height: 60,
  },
  sendMessageSubmitButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
  },
  submit: {
    marginHorizontal: 16,
  },
});