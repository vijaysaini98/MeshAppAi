import React from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native';
import TouchableOpacityView from '../../../common/TouchableOpacityView';
;
import { Cross_icon, addMore, attach } from '../../../helper/ImageAssets';
import Pdf from 'react-native-pdf';
import { AppText, FOURTEEN } from '../../../common';
import { IMAGE_PATH1 } from '../../../helper/Constants';
import { colors } from '../../../theme/colors';

export const getUri = (path) => {
  const data = {
    uri: IMAGE_PATH1 + path
  };

  return data;
};

interface DocUploadContainerProps {
  data: object;
  handleDelete: () => void;
  handleModal: () => void;
  title: string;
  required: boolean;
  type: string
}

export const DocUploadContainer: React.FC<DocUploadContainerProps> = ({ data, handleDelete, handleModal, title, required, type }) => {

  if (type !== "more") {
    return (
      <View style={styles.subContainer1}>
        <View
          style={styles.selfieContainer}
        >
          
          {(data?.path) ? (
            <>
              <TouchableOpacityView
                onPress={handleDelete}
                style={styles.closeBtnStyle}
              >
                <Image
                  source={Cross_icon}
                  resizeMode="contain"
                  style={styles.closeIcon}
                />
              </TouchableOpacityView>
              {(data?.path.includes(".pdf")) ? (
                <Pdf
                  source={data?.path ? getUri(data?.path) : getUri(data)}
                  trustAllCerts={Platform.OS === "ios"}
                  style={styles.pdf}
                  trustAllCerts={false}
                />
              ) : (
                <Image
                source={data?.path ? getUri(data?.path) : getUri(data)}
                  resizeMode="contain"
                  style={styles.pdf}
                />
              )}
            </>
          ) : (
            <TouchableOpacityView
              onPress={handleModal}
              style={{ alignItems: "center" }}
            >
              <Image
                source={attach}
                resizeMode="contain"
                style={styles.selfieCamera}
              />
              <AppText type={FOURTEEN} style={styles.textStyle}>
                {title}
                {required &&
                  <AppText style={styles.requiredStyle}>*</AppText>
                }
              </AppText>
            </TouchableOpacityView>
          )}
        </View>
      </View>
    )
  } else {
    return (
      <>
        <View
          style={styles.addMoreContainer}
        >
          {data?.map((item, index) => {
            if (true) {
              // if (index > 1) {
              return (
                <View
                  key={index}
                  style={[
                    styles.selfieContainer,
                    { marginLeft: 5, marginTop: 5 },
                  ]}
                >
                  <TouchableOpacityView
                    onPress={() => handleDelete(index)}
                    style={styles.closeBtnStyle}
                  >
                    <Image
                      source={Cross_icon}
                      resizeMode="contain"
                      style={styles.closeIcon}
                    />
                  </TouchableOpacityView>
                {/*                   
                  <Pdf
                    source={getUri(data[index])}
                    trustAllCerts={Platform.OS === "ios"}
                    onLoadComplete={(numberOfPages, filePath) => { }}
                    style={styles.pdf}
                    trustAllCerts={false}
                  /> */}
                   {(data[index]?.includes(".pdf")) ? (
                <Pdf
                source={getUri(data[index])}
                  trustAllCerts={Platform.OS === "ios"}
                  style={styles.pdf}
                  trustAllCerts={false}
                />
              ) : (
                <Image
                source={data[index]?.path ? getUri(data[index]?.path) : getUri(data[index])}
                  resizeMode="contain"
                  style={styles.pdf}
                />
              )}
                </View>
              );
            }
          })}
        </View>
        <View style={styles.subContainer1}>
          <TouchableOpacityView
            onPress={handleModal}
            style={[styles.selfieContainer, { width: 100 }]}
          >
            <Image
              source={addMore}
              resizeMode="contain"
              style={styles.selfieCamera}
            />
            <AppText type={FOURTEEN} style={[styles.textStyle, { width: "50%" }]}>
              {title}
            </AppText>
          </TouchableOpacityView>
        </View>
      </>
    )
  }
}


const styles = StyleSheet.create({
  subContainer1: {
    alignSelf: "center",
    marginHorizontal: 6
  },
  selfieContainer: {
    height: 110,
    borderColor: colors.border,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    width: 100,
  },
  selfieCamera: {
    height: 20,
    width: 18,
  },
  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
  requiredStyle: {
    color: "red"
  },
  pdf: {
    width: 90,
    height: 90,
    borderRadius: 16
  },
  closeBtnStyle: {
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 2,
  },
  closeIcon: {
    height: 16,
    width: 16,
  },
  addMoreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
})