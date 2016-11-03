/**
 * Created by milodong on 2016/10/24.
 */

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	PanResponder
} from 'react-native';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var Button = require('./Button');

var ContentCell = React.createClass({
	
	getDefaultProps() {
		return{
			title: '花',
			subTitle: '漂亮的花',
			iconName: 'mine_icon',
			cost: 122,
			finishStatus: true,
			
			callAddClick: null,
			callDecreaseClick: null,
			callDelectClick: null
		}
	},
	
	getInitialState() {
		return{
			SelectStatus: false,
			left: 0
		}
	},
	
	
	componentWillMount(){
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: ()=> true,
			onPanResponderGrant: ()=>{
				
			},
			
			onPanResponderMove: (evt,gestureState)=>{
				
				if (gestureState.dx< 0){
					
					if (gestureState.dx < -80){
						this.setState({
							left: -80
						})
						
					}else if (gestureState.dx >= -80){
						this.setState({
							left: gestureState.dx
						})
					}
				}else {
					
					if (gestureState.dx > 80 && this.state.left < 0){
						this.setState({
							left: 0
						})
						
					}else if (gestureState.dx < 80 && this.state.left < 0){
						this.setState({
							left: gestureState.dx - 80
						})
					}
				}
			},
			
			onPanResponderRelease: (evt,gestureState)=>{
				
				var dx = gestureState.dx < 0 ? -80 : 0
				
				this.setState({
					left: dx
				})
			}
		})
	},
	
	render() {
		return (
			<View style={{width: width + 80, height: 120, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', marginLeft: this.state.left}}
			
			      {...this._panResponder.panHandlers}
			>
				<Image source= {{uri : this.props.iconName}} style={{width: 90, height: 90, marginLeft: 15}}/>
				
				{/* 下部分 */}
				{this.bottomView()}
				
				
				<Button
					containerStyle = {{ backgroundColor: '#FD7D7F', width:80, height: 120, alignItems: 'center', justifyContent: 'center'}}
					style={{ fontSize: 16, textAlign: 'center',  color: 'white'}}
					text={'删除'}
					onPress={() => this.delectClick()}
				/>
			</View>
		);
	},
	
	bottomView() {
		var price = this.props.cost.toFixed(2);
		var priceInt = price.substring(0, price.length - 2);
		var priceFloat = price.substring(price.length - 2, price.length);
		
		if (this.props.finishStatus){
			return(
				<View style={styles.bottomViewStyle}>
					<Text numberOfLines={1} style={{color: '#767676', fontSize: 15, marginRight: 15}}>{this.props.title}</Text>
					<Text numberOfLines={1} style={{color: '#FD7E7F', fontSize: 13, marginTop: 8,marginRight: 15}}>{this.props.subTitle}</Text>
					
					<Text style={{color: '#FD696B', fontSize: 16, position: 'absolute', bottom: 20}}>¥
						<Text style={{color: '#FD696B', fontSize: 24}}>{priceInt}</Text>
						<Text style={{color: '#FD696B', fontSize: 20}}>{priceFloat}</Text>
					</Text>
				</View>
			)
		}else {
			return(
				<View style={styles.bottomViewStyle}>
					<Text numberOfLines={1} style={{color: '#767676', fontSize: 15}}>{this.props.title}</Text>
					<Text numberOfLines={1} style={{color: '#FD7E7F', fontSize: 13, marginTop: 8}}>{this.props.subTitle}</Text>
					
					<Text style={{color: '#FD696B', fontSize: 16, position: 'absolute', bottom: 20}}>¥
						<Text style={{color: '#FD696B', fontSize: 24}}>{priceInt}</Text>
						<Text style={{color: '#FD696B', fontSize: 20}}>{priceFloat}</Text>
					</Text>
					
					<View style={{width:65, height: 20, alignItems: 'center', justifyContent: 'center',borderWidth: 0.5, borderColor: 'red', borderRadius: 3, position: 'absolute', right: 20, bottom: 20}}>
						<Text style={{fontSize: 12, textAlign: 'center',  color: 'red'}}>失效</Text>
					</View>
				</View>
			)
		}
	},
	
	callSelectClick(selectStatus) {
		
		this.setState({
			SelectStatus : !selectStatus
			
		})
	},
	
	delectClick() {
		
		this.props.callDelectClick('删除');
	}
})

const styles = StyleSheet.create({
	
	bottomViewStyle: {
		width: width - 108,
		height: 105,
		marginTop: 15,
		marginLeft: 8
	}
});

module.exports = ContentCell;
