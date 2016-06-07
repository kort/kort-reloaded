import React from 'react';
import { StyleSheet, View } from 'react-native';

import Map from './Map';
import LocationButton from '../shared/LocationButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
  },
});

const MissionsTab = () => (
  <View style={styles.container}>
    <View style={styles.mapContainer}>
      <Map />
    </View>
    <LocationButton onPress={console.log()} />
  </View>
);

MissionsTab.contextTypes = {
  drawer: React.PropTypes.object,
};

module.exports = MissionsTab;
