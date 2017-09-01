import React from 'react';
import {
  StyleSheet, Text, View,
  DeviceEventEmitter,
  Button,
} from 'react-native'
import Beacons from 'react-native-beacons-manager'

// Print a log of the detected iBeacons (1 per second)
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      beacons: {},
      yolo: false,
    }
  }

  componentDidMount() {
    this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
        console.log('lol3', data)
        this.setState({
          // grot (tablica - 1200)
          // flash (drzwi - 2222)
          // HASELHOFF (drukarka - '1337)
          // lori - 0010

          beacons: data.beacons.reduce((prevVal, currVal) => {
            if (currVal.uuid === '00000000-0000-0000-0000-000000000000') return prevVal

            return {
              ...prevVal,
              [currVal.uuid]: currVal,
            }
          }, this.state.beacons)
        });
      }
    );
  }

  getName(uuid) {
    const BNAME = {
      '00000000-0000-0000-1200-000000000000': 'GROT',
      '00000000-0000-0010-0000-000000000000': 'LORI',
      '00000000-0000-0000-2222-000000000000': 'FLASH',
      '00000000-0000-0000-1337-000000000000': 'HASELHOFF',
    }

    try {
      return BNAME[uuid]
    } catch(err) {
      return uuid
    }
  }

  handleClick() {
    if (!this.state.yolo) {
      this.setState({ yolo: true })
      Beacons.startRangingBeaconsInRegion('REGION1')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Jakdojde</Text>
        <Text>1337</Text>
        <Text>design by kiwanska</Text>
        <View>
          {Object.values(this.state.beacons).map(x => (
            <View style={styles.beacon} key={this.getName(x.uuid)}>
              <Text>name: {this.getName(x.uuid)}</Text>
              <Text>distance: {x.distance}</Text>
              <Text>proximity: {x.proximity}</Text>
            </View>
          ))}
        </View>
        <Button
          onPress={() => this.handleClick()}
          title="yolo"
          disabled={this.state.yolo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beacon: {
    borderWidth: 1,
    borderColor: '#ffcd32',
  }
});
