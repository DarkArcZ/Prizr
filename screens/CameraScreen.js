import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo'; 
import Icon from 'react-native-vector-icons/Ionicons';

class CameraScreen extends Component {
	static navigationOptions = {
		title: "Scan",
		tabBarIcon: ({ tintColor }) => {
				return <Icon name='md-barcode' size={30} color={tintColor}/>
		}
	}

	state = {
	    hasCameraPermission: null,
	  }

	  async componentWillMount() {
	    const { status } = await Permissions.askAsync(Permissions.CAMERA);
	    this.setState({hasCameraPermission: status === 'granted'});
	  }

	  render() {
	    const { hasCameraPermission } = this.state;
	    if (hasCameraPermission === null) {
	      return <View />;
	    } else if (hasCameraPermission === false) {
	      return <Text>No access to camera</Text>;
	    } else {
	      return (
	        <View style={{flex: 1}}>
	          <BarCodeScanner
	            onBarCodeRead={this._handleBarCodeRead}
	            style={StyleSheet.absoluteFill}
	          />
	        </View>
	      );
	    }
	  }

	  _handleBarCodeRead = (data) => {
	    alert(JSON.stringify(data));
	  }
}

export default CameraScreen;