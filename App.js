import React, { createContext, useContext, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import MyTabs from "./navigation/Tab";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateTask from "./navigation/CreateTask";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const MyContext = createContext();

function MyStack({ params }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <MyContext.Provider value={{ tasks, setTasks }}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <MyStack />
      </View>
    </MyContext.Provider>
  );
}
export const useMyContext = () => {
  return useContext(MyContext);
};
export default App;
