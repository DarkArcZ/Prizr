import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, ListItem, List, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class LikedScreen extends Component {
	static navigationOptions = ({navigation}) => ({
		title: "Liked Items",
		headerRight: (
			<Button 
			title="Settings" 
			onPress={ ()=>{ navigation.navigate('settings') }}
			backgroundColor = "rgba(0, 0, 0, 0)"
			color = "rgba(0, 121, 255, 1)"
			 />		
			),
		headerStyle: {
			marginTop: Platform.OS === 'android' ? 24 : 0
		},
		tabBarIcon: ({ tintColor }) => {
				return <Icon name='tag-heart' size={30} color={tintColor}/>
		}
	});

	renderLikedItems = () => {
		return this.props.likedItems.map(item => {
			return (
			<Card
				title={item.title}
				key={item.uid}
			>
			<View>
				<Image
				source={{uri:item.uri}}
				style={styles.imageStyle}
				/>
			</View>
			<View>
				<Text style={styles.detailWrapper}>
					{item.price}
				</Text>
			<Button
				title="View Website"
				backgroundColor="#03A9F4"
				onPress={() => Linking.openURL(item.link)}
			/>
			</View>
			</Card>
			);
		});
	}


	render() {
		return (
			<ScrollView>
				{this.renderLikedItems()}
			</ScrollView>
		);
	}
}


const styles = {
	detailWrapper: {
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	imageStyle: {
		height: 150,
		width: undefined,
		resizeMode: 'contain'
	}
}

function mapStateToProps(state) {
	return { likedItems: state.likedItems };
}

export default connect(mapStateToProps)(LikedScreen);