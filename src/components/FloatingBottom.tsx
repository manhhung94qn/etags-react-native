import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FloatingBottomProps } from '../types/FloatingBottomProps';

export default function FloatingBottom({ floatingStyles, navigation }: FloatingBottomProps) {
    const animation = React.useRef(new Animated.Value(0)).current;
    const [open, setOpen] = React.useState(false);

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;
        Animated.timing(animation, {
            toValue: toValue,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        setOpen(!open);
    }
    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg']
                })
            }
        ]
    }
    const createSytle = {
        transform: [
            {
                scale: animation
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -90]
                })
            }
        ]
    }

    const editStyle = {
        transform: [
            {
                scale: animation
            },
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -90 * Math.cos(Math.PI / 4)]
                })
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -90 * Math.cos(Math.PI / 4)]
                })
            }
        ]
    }
    const delelteSytle = {
        transform: [
            {
                scale: animation
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -90]
                })
            }
        ]
    }

    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.wrapButton, delelteSytle]}>
                <TouchableOpacity style={[styles.button, styles.secondary,]} onPress={toggleMenu}>
                    <AntDesign name="delete" size={20} color="#FFF" />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.wrapButton, editStyle]}>
                <TouchableOpacity style={[styles.button, styles.secondary,]} onPress={()=>{navigation.push('EditWord')}}>
                    <AntDesign name="edit" size={20} color="#FFF" />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.wrapButton, createSytle]}>
                <TouchableOpacity style={[styles.button, styles.secondary,]} onPress={()=>{navigation.push('CreateWord')}}>
                    <AntDesign name="plus" size={20} color="#FFF" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[rotation]}>
                <TouchableOpacity style={[styles.menu, styles.button]} onPress={toggleMenu}>
                    <AntDesign name="plus" size={24} color="#FFF" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative'
    },
    wrapButton: {
        position: 'absolute'
    },
    button: {
        elevation: 5,
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: '#506AD4',
        shadowOpacity: 0.3,
        shadowOffset: { width: 10, height: 10 }
    },
    menu: {
        backgroundColor: '#2697ed'
    },
    secondary: {
        backgroundColor: '#2697ed',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        top: 6,
        bottom: 6
    }
})