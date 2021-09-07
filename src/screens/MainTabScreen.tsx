import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator, StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';

//Screen
import HomeScreen from './HomeScreen';
import TagScreen from './TagScreen';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import EditWordScreen from './EditWordScreen';
import MemoryScreen from './MemoryScreen';
import AddWordScreen from './AddWordScreen';

const Tab = createMaterialTopTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        tabBarPosition="bottom"
        screenOptions={{
            tabBarShowLabel: true
        }}
    >
        <Tab.Screen
            name="Main"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <FontAwesome name="home" size={24} color={color} />
                ),
            }}
        />
        <Tab.Screen
            name="Tag"
            component={TagsStackScreen}
            options={{
                tabBarLabel: 'Tag',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="tags" color={color} size={24} />
                ),
            }}
        />
        <Tab.Screen
            name="Memory"
            component={MemorieStackScreen}
            options={{
                tabBarLabel: 'Memory',
                tabBarIcon: ({ color }) => (
                    <FontAwesome5 name="mastodon" size={24} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
)

export default MainTabScreen;

const HomeStack = createStackNavigator();

type StackScreenProp = {
    navigation: any
};

const stackNavigationOptions: StackNavigationOptions = {
    headerShown: true,
    gestureDirection: 'horizontal',
    headerTitleAlign: 'center'
}
const HomeStackScreen = ({ navigation }: StackScreenProp) => (
    <HomeStack.Navigator
        screenOptions={stackNavigationOptions}
    >
        <HomeStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: 'Trang chính',
                headerRight: () => <Ionicons name="menu-outline" size={24} color="black" onPress={() => navigation.openDrawer()} />
            }}
        />
        <HomeStack.Screen
            name="EditWord"
            component={EditWordScreen}
            options={{
                title: 'Chỉnh sửa từ vựng',
                headerRight: () => <Ionicons name="menu-outline" size={24} color="black" onPress={() => navigation.openDrawer()} />
            }}
        />
        <HomeStack.Screen
            name="CreateWord"
            component={AddWordScreen}
            options={{
                title: 'Thêm mới từ vựng',
                headerRight: () => <Ionicons name="menu-outline" size={24} color="black" onPress={() => navigation.openDrawer()} />
            }}
        />
    </HomeStack.Navigator>
)


const TagsStack = createStackNavigator();
const TagsStackScreen = ({ navigation }: StackScreenProp) => (
    <TagsStack.Navigator
        screenOptions={stackNavigationOptions}
    >
        <TagsStack.Screen
            name="Tags"
            component={TagScreen}
            options={{
                title: "Đây là từ gì?",
                headerRight: () => (
                    <Ionicons name="menu-outline" size={24} color="black" onPress={() => navigation.openDrawer()} />
                )
            }}
        />
    </TagsStack.Navigator>
);


const MemorieStack = createStackNavigator();
const MemorieStackScreen = ({ navigation }: StackScreenProp) => (
    <MemorieStack.Navigator
        screenOptions={stackNavigationOptions}
    >
        <MemorieStack.Screen
            name="WordList"
            component={MemoryScreen}
            options={{
                title: "Từ Đã Lưu",
                headerRight: () => (
                    <Ionicons name="menu-outline" size={24} color="black" onPress={() => navigation.openDrawer()} />
                )
            }} />
            <MemorieStack.Screen
                name="EditWord"
                component={EditWordScreen}
                options={{
                    title: "Chỉnh sửa",
                    headerRight: () => (
                        <Ionicons name="menu-outline" size={24} color="black" onPress={() => navigation.openDrawer()} />
                    )
                }} />
    </MemorieStack.Navigator>
)
