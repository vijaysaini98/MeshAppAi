import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import { config } from '../../config/config';

const codePushOptions = {
  deploymentKey: Platform.select({
    ios: config.IOS_CODEPUSH_DEPLOYMENT,
    android: config.ANDROID_CODEPUSH_DEPLOYMENT,
  }),
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  //   updateDialog: true,
};

export default function CodePushUpdater() {
  const [syncMessage, setSyncMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const codePushStatusDidChange = syncStatus => {
      let tempSyncMessage;
      switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          tempSyncMessage = 'Checking for update';
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          tempSyncMessage = 'Downloading package';
          setModalVisible(true);
          break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
          tempSyncMessage = 'Awaiting user action';
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          tempSyncMessage = 'Installing update';
          setModalVisible(true);
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          tempSyncMessage = 'App up to date.';
          setModalVisible(false);
          break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
          tempSyncMessage = 'Update cancelled by user';
          setModalVisible(false);
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          tempSyncMessage = 'Update installed.';
          setTimeout(() => {
            setModalVisible(false);
          }, 1000);

          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          tempSyncMessage = 'An unknown error occurred';
          setModalVisible(false);
          break;
      }
      setSyncMessage(tempSyncMessage);
    };
    const codePushDownloadDidProgress = Progress => {
      let currProgress = Math.round(
        (Progress.receivedBytes / Progress.totalBytes) * 100,
      );
      setProgress(currProgress);
    };
    CodePush.sync(
      codePushOptions,
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  }, []);

  // console.log('syncMessage::::::::', syncMessage);
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.boxx}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={'#9D008B'} />
          <Text style={styles.createAccountLabel}>{progress} %</Text>
        </View>

        <Text style={styles.CreateAccountPara}>{syncMessage}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxx: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#00000070',
    height: 20,
    width: '50%',
    left: '25%',
    right: '25%',
    marginTop: '70%',
    borderRadius: 15,
  },
  createAccountLabel: {
    marginLeft: 25,
    fontSize: 18,
    lineHeight: 30,
    color: '#ffffff',
    marginRight: 25,
  },
  CreateAccountPara: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});
