import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal } from 'react-native';
import CustomButton from '../shared/CustomButton';
import { Actions } from 'react-native-router-flux';
import MissionModalInput from './MissionModalInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 14,
  },
  containerMissionComplete: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  containerMission: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  containerMissionDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
  },
  textMission: {
    alignSelf: 'center',
    marginTop: 5,
    width: 200,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  innerContainerMissionCompleted: {
    flexDirection: 'row',
  },
  modalButton: {
    marginTop: 10,
  },
  icon: {
    marginTop: 7,
    marginRight: 7,
    height: 46,
    width: 46,
  },
});

const MissionsModal = React.createClass({
  getInitialState() { // this.props.task....
    return {
      title: '',
      koins: 0,
      userKoins: 0,
      mission: '',
      txtUnableToSolve: 'Unable to solve',
      unableToSolve: false,
      answer: '',
      selected: 'key',
      btnCompleteMission: '',
      view: '',
      modalVisible: false,
    };
  },

  componentWillMount() {
  },

  componentDidMount() {
  },

  /*
  * Modal for mission completion
  */
  _setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    if (!this.state.modalVisible) {
      Actions.pop();
    }
  },

  render() {
    return (
      <View style = { styles.container }>
        <Modal
          animationType = { false }
          transparent = { true }
          visible = { this.state.modalVisible }
          onRequestClose = { () => { this._setModalVisible(false); } }
        >
          <View style = { styles.containerMissionComplete }>
            <View style = { [styles.innerContainer, { backgroundColor: '#fff', padding: 20 }] }>
              <Text>Mission completed. You increased your reputation!</Text>
              <View style = { styles.innerContainerMissionCompleted }>
                <Image
                  style = { styles.icon }
                  source = { require('../../assets/img/koin_no_value.png') }
                />
                <Text style = { styles.textMission }>
                  Bravo! You have won { this.state.koins } Koins!
                  You now have a total amount of { this.state.userKoins } Koins.
                </Text>
              </View>
              <CustomButton
                onPress = { this._setModalVisible.bind(this, false) }
                style = { styles.modalButton }
              >
                Ok
              </CustomButton>
            </View>
          </View>
        </Modal>
        <Text style = { styles.textTitle }>{ this.props.title }</Text>
        <View style = { styles.containerMission }>
          <View style = { styles.containerMissionDescription }>
            <Image
              style = { styles.icon }
              source = { require('../../assets/img/koin_no_value.png') }
            />
            <Text style = { styles.textMission }>Get the { this.state.koins } Koins!</Text>
          </View>
          <View style = { styles.containerMissionDescription }>
            <Image
              style = { styles.icon }
              source = { require('../../assets/img/poi_name_mission.png') }
            />
            <Text style = { styles.textMission }>{ this.state.mission } ?</Text>
          </View>
        </View>
        <MissionModalInput
          inputType = 'input'
          unableToSolve = { this.state.unableToSolve }
        />
        <View style = { styles.containerButton }>
          <CustomButton style = { { paddingTop: 20 } } onPress = { Actions.pop }>
            Cancel
          </CustomButton>
          <CustomButton style = { { paddingTop: 20 } } onPress = { this._setModalVisible.bind(this, true) }>
            Complete Mission
          </CustomButton>
        </View>
      </View>
    );
  },
});

module.exports = MissionsModal;