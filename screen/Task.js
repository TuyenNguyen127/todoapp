// In App.js in a new project

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useMyContext } from "../App";

const Task = ({ navigation }) => {
	const { tasks, setTasks } = useMyContext();

	const renderItem = ({ item, index }) => (
		<View style={styles.task}>
		<View style={styles.taskButtons}>
			<MaterialCommunityIcons name="alpha-t-box" size={30} color="#900" />
		</View>
		<Text style={styles.itemList}>{item}</Text>
		</View>
	);

	const createRequest = () => {
		navigation.push("CreateTask", {});
	};

	return (
		<SafeAreaView style={styles.container}>
		<Text style={styles.heading}>List Task ToDo</Text>
		{tasks.length > 0 ? (
			<></>
		) : (
			<Text style={styles.title}>
			There are no saved tasks, please create a new one</Text>
		)}
		<FlatList
			style={(height = 500)}
			data={tasks}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
		/>
		<TouchableOpacity style={styles.addButton} onPress={createRequest}>
			<Text style={styles.addButtonText}>{"Create Or Edit Task"}</Text>
		</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 40,
		height: 700,
	},
	heading: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 20,
		color: "green",
		textAlign: 'center'
	},
	title: {
		fontSize: 25,
		marginBottom: 20,
		color: "black",
		marginTop: 50,
		textAlign: 'center'
	},
	addButton: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 5,
		marginTop: 10,
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
	},
	task: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
		fontSize: 18,
	},
	itemList: {
		fontSize: 19,
		width: 280,
		marginLeft: 10
	},
	taskButtons: {
		flexDirection: "row",
	},
});

export default Task;
