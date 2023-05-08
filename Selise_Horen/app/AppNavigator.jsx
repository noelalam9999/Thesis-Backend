import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./screen/HomeScreen";
import ProfileScreen from "./screen/profilescreen";
import NotificationScreen from "./screen/NotificationScreen";
import LoginScreen from "./screen/LoginScreen";
import SignupScreen from "./screen/SignupScree";
import LeaderboardScreen from "./screen/leaderboardScreen";
import { MaterialIcons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StatusBar, StyleSheet } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "black" }}
      tabBarOptions={{
        activeTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Icon name="home" size={24} color="#F7CF47" />,
          tabBarLabelStyle: {
            color: "white",
          },
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="leaderboard" size={24} color="#F7CF47" />
          ),
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer style={{ backgroundColor: "black" }}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "black",
          },
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerIcon: () => <Icon name="home" size={24} color="#F7CF47" />,
          }}
          component={TabNavigator}
        />
        <Drawer.Screen
          name="notification"
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="bell" size={24} color="#F7CF47" />
            ),
          }}
          component={TabNavigator}
        />
        <Drawer.Screen
          name="SignUp"
          options={{
            drawerIcon: () => <Icon name="sign-in" size={24} color="#F7CF47" />,
          }}
          component={SignupScreen}
        />
        <Drawer.Screen
          name="Login"
          options={{
            drawerIcon: () => (
              <Icon name="user-plus" size={24} color="#F7CF47" />
            ),
          }}
          component={LoginScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
