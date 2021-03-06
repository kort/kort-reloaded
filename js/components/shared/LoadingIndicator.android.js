import React from 'react';
import { ProgressBarAndroid, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0)',
  },
  spinner: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
});


const LoadingIndicator = () => (
  <View style={styles.overlayContainer}>
    <ProgressBarAndroid style={styles.spinner} />
  </View>
);

module.exports = LoadingIndicator;
