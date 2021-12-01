import React, {useEffect, useState} from "react"
import { View, Text,Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import FloatingBottom from "../components/FloatingBottom";
import GlobalStyle from '../global/styles'
import { getRandomWord } from '../database'
import { Word } from "../types/models/Word";
import { AddNewWordType } from "../types/AddNewWordType";
type StackScreenProp = {
    navigation: any
};
const HomeScreen = ({ navigation }: StackScreenProp) => {
    const image = { uri: "https://dictionary.cambridge.org/vi/images/thumb/lion_noun_002_21358.jpg?version=5.0.185" };
    const [wordInfo, setWordInfo] = useState<AddNewWordType | undefined | null>();
    const getNewWord = async () => {
        const word = await getRandomWord();
        setWordInfo(word);
    }
    useEffect(()=>{
        getNewWord();
    },[])
    return (
        <View style={GlobalStyle.uinitUI.container}>
            <View style={[GlobalStyle.flexUI.default, GlobalStyle.flexUI.alignCenter, GlobalStyle.flexUI.justifyCenter]}>
                <Image source={image} resizeMode="contain" style={[styles.image]} />
                <Text style={styles.title}>{wordInfo?.word?.english}</Text>
                <View style={[GlobalStyle.flexUI.default, GlobalStyle.flexUI.alignCenter, GlobalStyle.flexUI.justifyCenter]}>
                    <Text style={styles.my2}>({wordInfo?.word?.type})</Text>
                    <Text style={styles.my2}>{wordInfo?.word?.pronuncation}</Text>
                    <Text style={styles.my2}>{wordInfo?.word?.vietNam}</Text>
                </View>
                <View style={[GlobalStyle.flexUI.default, GlobalStyle.flexUI.justifyCenter]}>
                    <View style={styles.separator} />
                    <View style={styles.moreInfo}>
                        <Text style={[styles.title, { marginBottom: 15 }]} >Example</Text>
                        <View style={{ marginBottom: 10 }}>
                            <Text>His work is improving slowly</Text>
                            <Text>Công việc của anh ấy đang dần dần tốt hơn lên</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text>His work is improving slowly</Text>
                            <Text>Công việc của nó đang dần dần tốt hơn lên</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[GlobalStyle.flexUI.default, GlobalStyle.flexUI.alignCenter, GlobalStyle.flexUI.justifyCenter]}>
                <TouchableOpacity
                    onPress={() => { getNewWord() }}
                >
                    <View style={[GlobalStyle.flexUI.default, styles.rememberedBtn]}>
                        <Text style={{ margin: 0, marginRight: 5 }}>Remembered
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.floatingBottom}>
                <FloatingBottom navigation={navigation}></FloatingBottom>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    my2: {
        marginBottom: 2,
        marginTop: 2
    },
    separator: {
        borderBottomColor: '#2697ed80',
        borderBottomWidth: 1,
        marginBottom: 15,
        marginTop: 15
    },
    moreInfo: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    floatingBottom: {
        position: 'absolute',
        bottom: 25,
        right: 25
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: 250,
        maxHeight: 150,
    },
    rememberedBtn: {
        backgroundColor: '#2697ed',
        height: 50,
        padding: 15,
        color: '#FFF',
        borderRadius: 80 / 2,
    }

});


export default HomeScreen