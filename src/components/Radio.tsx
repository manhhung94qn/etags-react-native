import React from "react"
import { View } from 'react-native'
import { StyleSheet } from 'react-native';
import CheckBox from "react-native-elements/dist/checkbox/CheckBox";

type Props<TValue> = {
    items?: RadioItem<TValue>
}

const Radio = ({ items }: Props<number | string>) => {
    return (
        <View>
            <CheckBox
            />
        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: '#2697ed80',
        borderBottomWidth: 1,
        marginBottom: 15,
        marginTop: 15
    }
})

export default Radio