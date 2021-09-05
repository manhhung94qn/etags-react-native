import React from "react"
import { NativeSyntheticEvent } from "react-native";
import { View, Text, FlatList } from 'react-native'
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { event } from "react-native-reanimated";
import MemoryItem from "../components/MemoryItem";
import GS from '../global/styles'
import { MemoryItemProps } from "../types/MemoryItemProps";
import { MemoryScreenProps } from "../types/MemoryScreenProps";

const DATA: MemoryItemProps[] = [];

const getItem = (data: any, index: number) => {
    return {
        id: Math.round(Math.random() * 10).toString(),
        title: `Item ${index + 1}`
    }
};

let stopFecthMore = true;

const Item = (item: MemoryItemProps) => (
    <MemoryItem {...item} />
);

const getMore = (l: number) : Promise<number[]> => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            const response = Array(10).map(_i => l + _i);
            resolve(response);
        }, 1000);
    })
}

const MemoryScreen = ({ navigation }: MemoryScreenProps) => {
    const [keyword, setKeyword] = React.useState('');
    const [styleKeyword, setStyleKeyword] = React.useState([GS.textInputUI.default]);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [items, setItems] = React.useState<number[]>([]);

    const mapToItem: (id: number) => MemoryItemProps = (id) => (
        {
            id,
            englishWord: 'English',
            vietnamWord: 'Viet name',
            type: 'v',
            pronunciation: '\'iηgli∫',
            navigation
        }
    );

    React.useEffect(() => {
        setLoadingMore(true);
        getMore(0).then(rs => {
            setItems(rs);
            setLoadingMore(false);
        })
    }, [])

    const onEndReached = async ({ distanceFromEnd }: any) => {
        setLoadingMore(true);
        if (!stopFecthMore) {
            const response = await getMore(items.length);
            setItems([...items, ...response]);
            stopFecthMore = true;
        }
        setLoadingMore(false);
    }
    return (
        <View style={[GS.uinitUI.container, { marginBottom: 25 }]}>
            <View style={GS.uinitUI.w100}>
                <TextInput
                    style={styleKeyword}
                    placeholder="Nhập từ cần tìm..."
                    onChangeText={text => setKeyword(text)}
                    onFocus={() => setStyleKeyword([GS.textInputUI.focus])}
                    onBlur={() => setStyleKeyword([GS.textInputUI.default])}
                    value={keyword}
                />
            </View>
            <View
                style={{ paddingTop: 15 }}
            >
                <FlatList
                    data={items}
                    renderItem={({ item }) => <Item {...mapToItem(item)} />}
                    keyExtractor={(item, index)=>index.toString()}
                    onEndReached={_event => onEndReached(_event)}
                    onEndReachedThreshold={0.5}
                    onScrollBeginDrag={() => {
                        stopFecthMore = false;
                    }}
                    ListFooterComponent={()=> loadingMore ? <Text style={{marginBottom: 25, textAlign: "center"}}>Loading...</Text> : null}
                >

                </FlatList>
            </View>
        </View>
    )
}

export default MemoryScreen