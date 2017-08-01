import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, Image, Linking, ScrollView, TouchableHighlight } from 'react-native';
import { Avatar, Card, Button, ListItem, List, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as actions from '../actions';

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2
 });

class ShopScreen extends Component {
	state = {};

	componentDidMount() {
		return this.props.itemsFetch(this.props.navigation.state.params.title);
	}

	filterSearch(text) {
		this.setState({
			searchTerm: text
		});
	}


	renderRow = (item) => {
		return (
			<Card
				title={item.title}
				featuredSubtitle={item.category}
			>
			<View>
			<Image
				source={{uri:item.uri}}
				style={styles.imageStyle}
			/>
			</View>
			<View style={styles.footer}>
			<Avatar
				medium
				rounded
				source = {{uri: item.brand_logo }}
				avatarStyle={{resizeMode:'contain'}}
				containerStyle={{marginBottom: 10}}
			/>
			<Text style={styles.textStyle}>
				{item.price}
			</Text>
			</View>
			<Button
				title="Like Item!"
				iconLeft
				icon={{name: 'heart', type: 'font-awesome'}}
				backgroundColor="#D50000"
				onPress={() => this.props.likeItem(item)}
			/>
			<Button
				title="View Website"
				backgroundColor="#03A9F4"
				onPress={() => Linking.openURL(item.link)}
			/>
			</Card>
		);
	}


  	render() {
  		const filteredItems = this.state.searchTerm
  		? this.props.items.filter(item => {
  			return item.title.indexOf(this.state.searchTerm) > -1;
  		})
  		: this.props.items;
  		const dataSource = ds.cloneWithRows(filteredItems);
    	return (
    	<ScrollView>
			<SearchBar
				 returnKeyType='search'
		         lightTheme
		         placeholder='Search...'
		         onChangeText={(text) => this.filterSearch(text)}
	      	/>
      	<ListView
       		enableEmptySections
       		dataSource={dataSource}
        	renderRow={this.renderRow}
      	/>
      	</ScrollView>
    );
  }
}

const styles = {
	imageStyle: {
		height: 150,
		width: undefined,
		resizeMode: 'contain'
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textStyle: {
		fontWeight: '500',
		fontSize: 24,
		textAlign: 'center',
		justifyContent: 'center'
	}
}

const mapStateToProps = (state, props) => {
	const items = _.map(state.items, (val, uid) => {
		return { ...val, uid };
	});
	return { items }
}

export default connect(mapStateToProps, actions)(ShopScreen);

























