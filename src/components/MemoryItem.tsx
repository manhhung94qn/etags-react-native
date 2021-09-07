import React from "react"
import { View, Text } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler"
import { MemoryItemProps } from "../types/MemoryItemProps"
import GS from '../global/styles'
import { StyleSheet } from 'react-native';
import Divider from "./Divider"
import { AntDesign } from "@expo/vector-icons"
import SkeletonPlaceholder from "./SkeletonPlaceholder"

const MemoryItem = ({ id, englishWord, vietnamWord, type, pronunciation, navigation }: MemoryItemProps) => {

    return (
        <View style={[GS.uinitUI.w100]}>
            <View style={[GS.uinitUI.w100]}>
                <View style={[GS.uinitUI.w100, styles.wrapText]}>
                    <View>
                        <Text>{englishWord} ({type}):</Text>
                        <Text>/{pronunciation}/</Text>
                    </View>
                    <View>
                        <Text>{vietnamWord}</Text>
                    </View>
                    <View>
                        <View style={{ flex: 2, flexDirection: "row" }}>
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <AntDesign name="edit" size={20} color="green" onPress={() => navigation.push("EditWord", { id })} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="delete" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <Divider />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapText: {
        flex: 3,
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
    }
})

const MemoryLoadingItem = () => (
    <View>
        <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <View>
                    <View style={{ width: 120, height: 16, borderRadius: 4 }} />
                    <View style={{ marginTop: 4, width: 80, height: 16, borderRadius: 4 }} />
                </View>
                <View style={{ width: 100, height: 16, borderRadius: 4 }} />
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: 20, height: 20, borderRadius: 20 / 2, marginRight: 15 }} />
                    <View style={{ width: 20, height: 20, borderRadius: 20 / 2 }} />
                </View>
            </View>
        </SkeletonPlaceholder>
        <Divider />
    </View>
)


export {
    MemoryItem,
    MemoryLoadingItem
}