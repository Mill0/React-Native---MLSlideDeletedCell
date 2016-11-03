/**
 * Created by milodong on 2016/10/20.
 */

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ListView
} from 'react-native';

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var ContentCell = require('./MLContentCell');

var Data  = [
	{
		title : "花🌹",
		subTitle : "漂亮的花🌹",
		iconName : "mine_icon",
		cost : 5.98
	},
	{
		title : "鱼🐟",
		subTitle : "漂亮的鱼?",
		iconName : "mine_icon",
		cost : 16.98
	},
	{
		title : "虾",
		subTitle : "漂亮的虾",
		iconName : "mine_icon",
		cost : 28.98
	},
	{
		title : "狗 🐩",
		subTitle : "漂亮的狗 🐩",
		iconName : "mine_icon",
		cost : 6666.98
	}
];

var ContentView = React.createClass({
	
	getInitialState() {
		// 1.1 设置数据源
		var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
		
		// 1.2 设置返回数据
		return{
			dataSource: ds.cloneWithRows(Data)
		}
	},
	
	
	render() {
		return(
			<ListView
				dataSource = {this.state.dataSource}
				renderRow = {this.renderRow}
				style={styles.container}
			/>
		);
	},
	
	// 返回具体的cell
	renderRow(rowData,sectionID,rowID,highlightRow) {
		console.log(rowData,sectionID, rowID);
		return(
			<View style={{marginTop: 5}}>
				<ContentCell
					title = {rowData.title}
					subTitle = {rowData.subTitle}
					iconName = {rowData.iconName}
					cost = {rowData.cost}
					callDelectClick = {(data)=> alert('删除')}
				/>
			</View>
		);
	}
	
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: width,
		backgroundColor: '#F9F9F9',
	}
});

module.exports = ContentView;
