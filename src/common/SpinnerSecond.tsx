import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {colors} from '../theme/colors';
import {useAppSelector} from '../store/hooks';

interface SpinnerSecondProps {
  loading?: boolean;
}

const SpinnerSecond = ({loading}: SpinnerSecondProps) => {
  const isLoading = useAppSelector(state => state.auth.isLoading);

  return (
    <>
      {isLoading || loading ? (
        // {true ? (
        <View style={[styles.spinnerStyle]}>
          <ActivityIndicator size={'large'} color={colors.loader} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.loader} />
    </View>
  );
};


const styles = StyleSheet.create({
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.transparent,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1111,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    height: 200,
    width: 200,
  },
});

export {SpinnerSecond,Loader};
