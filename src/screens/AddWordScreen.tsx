import React from "react"
import { View, Text, StyleSheet, Alert,ToastAndroid } from 'react-native'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import GS from '../global/styles'
import Toast from 'react-native-root-toast';

// import DropDownPicker from 'react-native-dropdown-picker';
import { WordType } from "../types/enums/WordType";
import { Input } from 'react-native-elements';
import { UserGuid } from "../types/models/UserGuid";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Divider from "../components/Divider";
import { Button } from 'react-native-elements';
import { Word } from "../types/models/Word";
import { addNewWord } from "../database";
import { Picker } from "@react-native-picker/picker";

type Props = {
    navigation: any
}

const AddWordScreen = ({ navigation }: Props) => {
    const [isOpenDropdownSelectTypeWord, setIsOpenDropdownSelectTypeWord] = React.useState(false);
    const [selectTypeWord, setSelectTypeWord] = React.useState<WordType | null>(WordType.noun);
    const wordTypes = [
        {
            label: 'Danh từ',
            value: WordType.noun
        },
        {
            label: 'Động từ',
            value: WordType.verd
        },
        {
            label: 'Tính từ',
            value: WordType.adjective
        }
    ]
    const [userGuids, setUserGuids] = React.useState<UserGuid[]>([
        {
            englishText: '',
            vietNameText: ''
        }
    ]);
    const onChangeTextUseGuid = (text: string, index: number, prop: string) => {
        const currentUseGuid = userGuids[index];
        if (prop == 'englishText')
            currentUseGuid.englishText = text;
        if (prop == 'vietNameText')
            currentUseGuid.vietNameText = text;
        const pre = userGuids.slice(0, index);
        const last = userGuids.slice(index + 1, userGuids.length)
        setUserGuids([...pre, ...[currentUseGuid], ...last]);
    }
    const removeUseGuidItem = (index: number) => {
        const pre = userGuids.slice(0, index);
        const last = userGuids.slice(index + 1, userGuids.length)
        setUserGuids([...pre, ...last]);
    }
    const word: Word = {
        english: '',
        vietNam: '',
        type: null,
        pronuncation: '',
        imageUrl: ''
    }
    const addWord = async () => {
        word.type = selectTypeWord;
        if(!word.english){
            Alert.alert('Chưa nhập từ tiếng Anh.');
            return;
        }
        if(!word.vietNam){
            alert('Chưa nhập từ tiếng Việt.');
            return;
        }
        if(!word.type){
            alert('Chưa chọn loại từ.');
            return;
        }
        await addNewWord({
            word,
            userGuids
        });
        Toast.show('Thêm từ mới thành công!');
        navigation.goBack()
    }
    return (
        <ScrollView>
            <View style={[GS.uinitUI.container, { justifyContent: "flex-start" }]}>
                <View style={[styles.row]}>
                    <Input
                        label="English"
                        placeholder='Nhập từ tiếng anh ...'
                        onChangeText={text => word.english = text}
                    />
                </View>
                <View style={[styles.row]}>
                    <Input
                        label="Việt Nam"
                        placeholder='Nhập từ tiếng Việt ...'
                        onChangeText={text => word.vietNam = text}
                    />
                </View>
                <View style={[styles.row, { paddingLeft: 2, marginBottom: 10 }]}>
                    <Picker
                        style={{ height: 50, width: '100%' }}
                        mode="dialog"
                        selectedValue={selectTypeWord}
                        onValueChange={(itemValue, itemIndex) => setSelectTypeWord(itemValue)}
                    >
                        {wordTypes.map(x => <Picker.Item label={x.label} key={x.value} value={x.value} />)}
                    </Picker>
                </View>
                <View style={[styles.row]}>
                    <Input
                        label="Phát âm"
                        placeholder='Nhập cách phát âm ...'
                        onChangeText={text => word.pronuncation = text}
                    />
                </View>
                <View style={[styles.row]}>
                    <Input
                        label="Ảnh minh họa"
                        placeholder='Nhập đường dẫn ảnh ...'
                        onChangeText={text => word.imageUrl = text}
                    />
                </View>
                <View style={[styles.row, { paddingHorizontal: 9, marginBottom: 10 }]}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Ví dụ sử dụng</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#2697ed",
                            width: 30, height: 30,
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => setUserGuids([...[{
                            englishText: '',
                            vietNameText: ''
                        }], ...userGuids])}
                    >
                        <Ionicons name="add" style={{ fontWeight: "bold" }} size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
                {
                    userGuids.map((item, index) => (
                        <React.Fragment key={index}>
                            <View style={[styles.row]}>
                                <Input
                                    value={item.englishText}
                                    onChangeText={text => onChangeTextUseGuid(text, index, 'englishText')}
                                    label={() => (
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Text style={{ fontWeight: "bold", color: "#8c98a2", fontSize: 16 }}>Câu tiếng Anh</Text>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: "#F00",
                                                    width: 24, height: 24,
                                                    borderRadius: 12,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onPress={() => removeUseGuidItem(index)}
                                            >
                                                <AntDesign name="minus" size={20} color="#FFF" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    placeholder='Nhập câu tiếng Anh ...'
                                />
                            </View>
                            <View style={[styles.row]}>
                                <Input
                                    value={item.vietNameText}
                                    style={{ marginBottom: 0, paddingBottom: 0 }}
                                    onChangeText={text => onChangeTextUseGuid(text, index, 'vietNameText')}
                                    inputStyle={{ marginBottom: 0, paddingBottom: 0 }}
                                    label="Câu tiếng Việt"
                                    placeholder='Nhập câu tiếng Việt ...'
                                />
                            </View>
                            <View style={{ width: "100%", paddingHorizontal: 10, marginTop: 0 }}>
                                {(index !== userGuids.length - 1) && <Divider />}
                            </View>
                        </React.Fragment>
                    ))
                }
                <View style={[styles.row, { justifyContent: "center" }]}>
                    <Button
                        title="Thêm từ"
                        onPress={addWord}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        position: "relative"
    }
})

export default AddWordScreen