import React, { Component, PureComponent } from 'react';
import { View, Text, ScrollView, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, Icon, Avatar, ListItem} from 'react-native-elements';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const DATA = [
	{
		"id": 0,
		"title": "Fairprice",
		"description": "NTUC FairPrice Co-Operative (Chinese: 新加坡职工总会平价合作社, Tamil: NTUC FairPrice கூட்டுறவு, Malay: Syarikat-koperasi NTUC FairPrice) is a supermarket chain based in Singapore and the largest in the country. The company is a co-operative of the National Trades Union Congress or NTUC. The group has 100 supermarkets across the island, with over 50 outlets of Cheers convenience stores island-wide. NTUC FairPrice has partnered with ExxonMobil to run several stations with a FairPrice branding at the minimarts at their stations. The supermarket has a slogan known as Singapore's very own.",
		"uri": "https://upload.wikimedia.org/wikipedia/en/b/b2/Fairprice_Logo.gif",
		"brand_logo": "https://www.google.com.sg/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwib1LrqlI7VAhUCUZQKHVnlDFgQjRwIBw&url=http%3A%2F%2Fwww.todayonline.com%2Fsingapore%2Ffairprice-extends-support-small-local-suppliers-another-year&psig=AFQjCNFAg9MDFETYR0O8K1fMbhsc52UQNQ&ust=1500306884802459" 						
	},
	{
		"id": 1,
		"title": "ShengSiong",
		"description": "Sheng Siong Group Ltd. (Chinese: 昇菘集团) is the parent company of Sheng Siong Supermarket Pte Ltd, commonly known as Sheng Siong, the third largest chain of supermarkets in Singapore.",
		"uri": "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/ShengSiongLogo.png/440px-ShengSiongLogo.png",
		"brand_logo": "http://bq.sg/wp-content/uploads/2017/01/12107015_921260511301544_7756468654587662876_n.png"
	},
	{
		"id": 2,
		"title": "ColdStorage",
		"description":"Cold Storage is a supermarket chain in Singapore, owned by Dairy Farm International Holdings. It operates three supermarket brands in Singapore and Malaysia; Cold Storage (in Singapore, Malaysia and Indonesia), Market Place (in Singapore) and Giant Hypermarket (in Singapore, Malaysia, Brunei, Indonesia, Vietnam and UAE). Cold Storage was the first supermarket of Singapore to offer its merchandise online in 1997. The number of regular customers has since then grown from 6,000 in 1998 to more than 15,000 in 2012.",
		"uri":"https://upload.wikimedia.org/wikipedia/en/d/dd/ColdStorageSINLogo01.png",
		"brand_logo": "http://is4.mzstatic.com/image/thumb/Purple122/v4/af/0f/70/af0f7010-ea8d-5f21-c7f2-d63103752621/source/1200x630bb.jpg"

	}, 
	{
		"id": 3,
		"title": "Giant",
		"description": "GCH Retail (Malaysia) Sdn Bhd (doing business as Giant Hypermarket) is a hypermarket and retailer chain in Malaysia, Singapore, Brunei, Indonesia, and Vietnam. Giant is one of the largest players of the retail industry in Malaysia, having over 85 branches spread throughout the country. It was founded by the Teng family in 1944.",
		"uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_Giant_Hypermarket.svg/440px-Logo_of_Giant_Hypermarket.svg.png",
		"brand_logo": "https://seeklogo.com/images/G/giant_hypermarket-logo-ACA791DD1F-seeklogo.com.png"
	},	
	{
		"id": 4,
		"title": "Redmart",
		"description":"RedMart is Singapore’s leading online supermarket, offering an unparalleled selection of quality fresh food, household essentials and general merchandise with the convenience of home delivery.We are a pioneering, customer-centric e-commerce business focused on delivering exceptional customer service and user experience. We are constantly expanding our product range to ensure you have access to the best quality products available in the market. ",
		"uri":"http://www.vennjobs.com/wp-content/uploads/redmart-logo-forweb.jpg",
		"brand_logo": "https://is3-ssl.mzstatic.com/image/thumb/Purple122/v4/9f/85/54/9f855452-cede-e9ad-c154-5004ee667f77/source/1200x630bb.jpg"
	}, 
	{
		"id": 5,
		"title": "Guradian",
		"description":"Cold Storage is a supermarket chain in Singapore, owned by Dairy Farm International Holdings. It operates three supermarket brands in Singapore and Malaysia; Cold Storage (in Singapore, Malaysia and Indonesia), Market Place (in Singapore) and Giant Hypermarket (in Singapore, Malaysia, Brunei, Indonesia, Vietnam and UAE). Cold Storage was the first supermarket of Singapore to offer its merchandise online in 1997. The number of regular customers has since then grown from 6,000 in 1998 to more than 15,000 in 2012.",
		"uri":"http://www.agelessonline.net/wp-content/uploads/2011/11/GD-logo-trans.jpg",
		"brand_logo": "http://www.agelessonline.net/wp-content/uploads/2011/11/GD-logo-trans.jpg"

	},
	{
		"id": 6,
		"title": "Watsons",
		"description":"Watsons Personal Care Stores (traditional Chinese: 屈臣氏個人護理店; simplified Chinese: 屈臣氏个人护理店; pinyin: Qūchénshì Gèrén Hùlǐ Diàn; Jyutping: Wat1san4si6go3jan4wu6lei5dim3), known simply as Watsons (屈臣氏), is the largest health care and beauty care chain store in Asia. It is a member of the A.S. Watson Group, majority-owned by CK Hutchison Holdings. It operates over 700 stores in Hong Kong, Macau, Mainland China, Taiwan, Singapore, Thailand, Malaysia, the Philippines, Indonesia, Japan, South Korea, Turkey, Ukraine, Lithuania and Latvia.",
		"uri":"http://www.tiongbahruplaza.com.sg/media/4436/merchantimage_1440481354.png",
		"brand_logo": "https://pbs.twimg.com/profile_images/582393988243546112/li0_M2uu.png"

	},
	    
]

class ListScreen extends Component {
	static navigationOptions = {
		title: "Stores",
		tabBarIcon: ({ tintColor }) => {
				return <Icon name='store' size={30} color={tintColor}/>
		}
	} 

	constructor(props) {
		super(props);
		this.renderItem= this.renderItem.bind(this);
	}

	keyExtractor(item, index) {
		return item.id;
	}

	renderItem(item) {
		return (
	   <TouchableOpacity
		        delayPressIn={70}
		        activeOpacity={0.8}
		        onPress={() => this.props.navigation.navigate('shop', {title: item.title})}>
		
		<Card
		title = {item.title}
		>
		<View>
		<Image
		source={{uri:item.uri}}
		style={styles.imageStyle}
		/>
		</View>
		<Text>
		{item.description}
		</Text>
		</Card>
		</TouchableOpacity>
		);
	}

	render() {
		return(
		<FlatList
				data={DATA}
				renderItem={({item}) => this.renderItem(item)}
				keyExtractor={this.keyExtractor}
		/>
		);
	}
}

const styles = {
	imageStyle: {
		height: 150,
		width: undefined,
		resizeMode: 'contain'
	}
}


export default ListScreen;


