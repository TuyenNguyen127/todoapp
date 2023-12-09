// In App.js in a new project

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react"; 
import { 
	Text, 
	TextInput, 
	TouchableOpacity, 
	StyleSheet, 
    SafeAreaView,
} from "react-native"; 

const Home = ({navigation}) => { 
	const [text, setText] = useState('');
	
	const loadText = async () => {
		try {
		  const value = await AsyncStorage.getItem('@text');
		  if (value !== null) {
			setText(value);
		  }
		} catch (error) {
		  console.error(error);
		}
	};
	
	const saveText = async (text) => {
		try {
			setText(text);
			await AsyncStorage.setItem('@text', text);
		} catch (error) {
			console.error(error);
		}
	};
	
	const deleteText = async () => {
		try {
			await AsyncStorage.removeItem('@text');
			setText('');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		loadText();
	}, []);

	return ( 
        <SafeAreaView style={styles.container}> 
			<Text style={styles.heading}>Note</Text> 
			<TextInput 
				style={styles.input} 
				placeholder="Write somethings and note"
				onChangeText={(text) => saveText(text)}
				value={text}
				multiline 
			/> 
			<TouchableOpacity 
				style={styles.deleteButton} 
				onPress={deleteText}> 
				<Text style={styles.deleteButtonText}> 
					{"Clear All"} 
				</Text> 
			</TouchableOpacity> 
		</SafeAreaView> 
	); 
}; 

const styles = StyleSheet.create({ 
	container: { 
		padding: 40, 
		marginTop: 40, 
        height: 500
	}, 
	heading: { 
		fontSize: 30, 
		fontWeight: "bold", 
		marginBottom: 7, 
		color: "green",
		marginBottom: 20 
	}, 
	input: { 
		borderWidth: 3, 
		borderColor: "#ccc", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 10, 
		fontSize: 18,
		height:400 
	}, 
	deleteButton: { 
		backgroundColor: "green", 
		padding: 10, 
		borderRadius: 5, 
		marginBottom: 10, 
	}, 
	deleteButtonText: { 
		color: "white", 
		fontWeight: "bold", 
		textAlign: "center", 
		fontSize: 18, 
	}, 
}); 

export default Home;
