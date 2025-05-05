import React, { useState } from "react";
import { Image, View } from "react-native";
import { AppText, BOLD, Button, FOURTEEN, MEDIUM, THIRTEEN, TWELVE, TWENTY, WHITE } from "../../../common";
import styles from "./styles";
import { DummyMr, locationIcon } from "../../../helper/ImageAssets";
import StarRating from "../../../common/StarRating";
import { colors } from "../../../theme/colors";

interface RecentRequestCardProps {
  item?: any;
  avatar?: string;
  name?: string;
  rating?: number;
  companyName?: string;
  date?: string;
  time?: string;
  address?: string;
  index?: number;
  handleAccept?: () => void;
  handleRescheduleBtn?: () => void;
  handleReject?: () => void;
  location?: boolean;
  isReschedule?: boolean;
  isAcceptDisabled?: boolean;
  mobaileNo:string
}

const RecentRequestCard = ({ item,
  avatar,
  name,
  rating,
  companyName,
  date,
  time,
  address,
  index,
  handleAccept,
  handleRescheduleBtn,
  handleReject,
  location,
  isReschedule,
  isAcceptDisabled,
  mobaileNo
}: RecentRequestCardProps) => {
  const [showFullAddress, setShowFullAddress] = useState(false);
  return (
    <View
      key={item?.id}
      style={styles.recentRequestCardContainer}>
      <View
        style={styles.uperContainerStyle}
      >
        <View style={styles.profileImageContainer}>
          {(avatar != null &&  avatar) ? (
            <Image
              source={avatar}
              resizeMode="cover"
              style={styles.profileImageStyle}
            />
          ) : (
            <Image
              source={DummyMr}
              resizeMode="contain"
              style={styles.profileImageStyle}
            />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <AppText
            type={TWENTY}
            weight={MEDIUM}
            numberOfLines={1}
          >
            {name}
          </AppText>
          <AppText 
          type={FOURTEEN}
            weight={MEDIUM}
            >{mobaileNo}</AppText>
          <StarRating
            customContainerStyle={{ justifyContent: 'flex-start' }}
            selectedStars={rating}
            startingValue={rating}
          />
          <View style={styles.companyContainerStyle}>
            <View
              style={styles.companyNameContainer}
            >
              <AppText color={WHITE}>
                {companyName}
              </AppText>
            </View>
          </View>
          {location &&
            (
              <View style={styles.locationContainerStyle}>
              <Image
                source={locationIcon}
                resizeMode="contain"
                style={styles.locationIconStyle}
              />
              <View style={styles.addressContainer}>
                <AppText
                  weight={MEDIUM}
                  type={FOURTEEN}
                  numberOfLines={showFullAddress ? 0 : 2}
                  style={{ flex: 0.8 }}
                >
                  {address}
                </AppText>
                {address.length >= 42 && (
                  <AppText
                    weight={BOLD}
                    style={styles.showTextStyle}
                    onPress={() => setShowFullAddress(!showFullAddress)}
                  >
                    {showFullAddress ? "less" : "more"}
                  </AppText>
                )}
              </View>
            </View>
            )}
        </View>
      </View>
      <View style={styles.appointmentDateTimeContainerStyle}>
        <View>
          <AppText type={TWELVE}>Appointment </AppText>
          <AppText type={TWELVE}>Date & Time </AppText>
        </View>
        <AppText style={styles.dateTimeTextStyle} type={FOURTEEN} weight={BOLD}>
          {date} {time}
        </AppText>
      </View>
      {isAcceptDisabled && <AppText
      type={THIRTEEN}
      weight={MEDIUM}
      style={{color:colors.red,marginHorizontal:10,marginTop:10}}
      >{"Note: The scheduled meeting time has passed. Please reschedule your appointment."}</AppText>}
      <View style={styles.bottomContainer}>
        <Button
          children="Accept"
          containerStyle={styles.acceptBtn}
          onPress={handleAccept}
          disabled={isAcceptDisabled}
        />
        <Button
          children="Reject"
          containerStyle={styles.rejectBtn}
          onPress={handleReject}
        />
      </View>
      <Button
        children="Reschedule Appointment"
        containerStyle={styles.rescheduleBtn}
        onPress={handleRescheduleBtn}
      />
    </View>
  )
}

export default RecentRequestCard;