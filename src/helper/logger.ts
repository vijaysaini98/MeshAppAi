import Toast from 'react-native-simple-toast';

export const showError = (err: any) => {
  let temp = err?.toString();
  Toast.showWithGravity(temp, Toast.LONG, Toast.BOTTOM);
};

export const logger = e => {
  console.log(e);
};
