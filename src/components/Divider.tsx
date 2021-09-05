import React from "react"
import { View } from 'react-native'
import { StyleSheet } from 'react-native';

type Props = {
    dividerStyles?: any
}

const Divider = ({ dividerStyles }: Props) => {
    return (
        <View style={[styles.divider, dividerStyles]} />
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

export default Divider