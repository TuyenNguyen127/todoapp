// In App.js in a new project

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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

const CreateTask = ({ navigation }) => {
	const [task, setTask] = useState("");
	const [editIndex, setEditIndex] = useState(-1);
	const { tasks, setTasks } = useMyContext();

	const handleAddTask = () => {
		if (task) {
			if (editIndex !== -1) {
				// Edit existing task
				const updatedTasks = [...tasks];
				updatedTasks[editIndex] = task;
				setTasks(updatedTasks);
				setEditIndex(-1);
			} else {
				// Add new task
				setTasks([...tasks, task]);
			}
			setTask("");
		}
	};

	const handleEditTask = (index) => {
		const taskToEdit = tasks[index];
		setTask(taskToEdit);
		setEditIndex(index);
	};

	const handleDeleteTask = (index) => {
		const updatedTasks = [...tasks];
		updatedTasks.splice(index, 1);
		setTasks(updatedTasks);
	};

	const renderItem = ({ item, index }) => (
		<View style={styles.task}>
			<Text style={styles.itemList}>{item}</Text>
			<View style={styles.taskButtons}>
				<TouchableOpacity onPress={() => handleEditTask(index)}>
					<Text style={styles.editButton}>Edit</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleDeleteTask(index)}>
					<Text style={styles.deleteButton}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
		<TextInput
			style={styles.input}
			placeholder="Enter task"
			value={task}
			onChangeText={(text) => setTask(text)}
		/>
		<TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
			<Text style={styles.addButtonText}>
			{editIndex !== -1 ? "Update Task" : "Add Task"}
			</Text>
		</TouchableOpacity>
		<FlatList
			style={styles.list}
			data={tasks}
			renderItem={renderItem}
			keyExtractor={(item, index) => index.toString()}
		/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	list: {
		marginBottom: 20,
	},
	container: {
		padding: 40,
		height: 700,
	},
	heading: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 7,
		color: "green",
	},
	input: {
		borderWidth: 3,
		borderColor: "#ccc",
		padding: 10,
		marginBottom: 10,
		borderRadius: 10,
		fontSize: 18,
	},
	addButton: {
		backgroundColor: "green",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
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
		width: 180,
	},
	taskButtons: {
		flexDirection: "row",
	},
	editButton: {
		marginRight: 10,
		color: "green",
		fontWeight: "bold",
		fontSize: 18,
	},
	deleteButton: {
		color: "red",
		fontWeight: "bold",
		fontSize: 18,
	},
});

export default CreateTask;
