import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './src/screens/MainTabScreen';
import { initDatabase } from './src/database'
import { RootSiblingParent } from 'react-native-root-siblings';

const Drawer = createDrawerNavigator();

export default function App() {
  initDatabase();
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: '#fcfcfd',
      text: '#33444d'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <RootSiblingParent>
      <SafeAreaView style={styles.container}>
        <NavigationContainer theme={theme}>
          <Drawer.Navigator screenOptions={{
            headerTitleAlign: 'center',
            drawerPosition: 'right',
            headerShown: false
          }}>
            <Drawer.Screen
              name="ETags" component={MainTabScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
