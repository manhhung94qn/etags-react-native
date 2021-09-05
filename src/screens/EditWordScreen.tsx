import React from "react"
import { View, Text } from 'react-native'

type EditWordScreenProps = {
    navigation: any,
    route: any
}

const EditWordScreen = ({ route, navigation }: EditWordScreenProps) => {
    const { id } = route.params;
    return (
        <View>
            <Text>This is Edit Page { id }</Text>
        </View>
    )
}

export default EditWordScreen