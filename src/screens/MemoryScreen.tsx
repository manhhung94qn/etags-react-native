import React from "react"
import { NativeSyntheticEvent, StyleSheet, _Image } from "react-native";
import { View, Text, FlatList } from 'react-native'
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { event } from "react-native-reanimated";
import { MemoryItem, MemoryLoadingItem } from "../components/MemoryItem";
import GS from '../global/styles'
import { MemoryItemProps } from "../types/MemoryItemProps";
import { MemoryScreenProps } from "../types/MemoryScreenProps";
import SkeletonPlaceholder from "../components/SkeletonPlaceholder";
import { AntDesign } from "@expo/vector-icons";
import { getWordsByKeyword } from '../database'

let stopFecthMore = true;

const Item = (item: MemoryItemProps) => (
    <MemoryItem {...item} />
);

const getMore = (l: number): Promise<ItemType[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = Array<number>(10).fill(1).map((v, _i) => {
                return { id: (l + _i + 1).toString() }
            });
            resolve(response);
        }, 1000);
    })
}
type ItemType = {
    id: string
}

const MemoryLoadingItems = () => (
    <ScrollView>
        {Array(10).fill(1).map((_v, _i) => <MemoryLoadingItem key={_i} />)}
    </ScrollView>
)

const MemoryScreen = ({ navigation }: MemoryScreenProps) => {
    const [keyword, setKeyword] = React.useState('');
    const [styleKeyword, setStyleKeyword] = React.useState([GS.textInputUI.default]);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [items, setItems] = React.useState<ItemType[]>([]);
    const [loading, setLoading] = React.useState(true);
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
    const flatListEl = React.useRef<FlatList<ItemType>>(null);

    const featchData = async () => {
        await getWordsByKeyword(null);
        const response = await getMore(items.length);
        setItems([...response]);
        setLoading(false);
    }

    React.useEffect(() => {
        featchData();
    }, [])

    const onEndReached = async ({ distanceFromEnd }: any) => {
        console.log('onEndReached')
        // flatListEl.current?.scrollToIndex({ index: items.length })
        setLoadingMore(true);
        if (!stopFecthMore) {
            const response = await getMore(items.length);
            setItems([...items, ...response]);
            stopFecthMore = true;
        }
        setLoadingMore(false);
    }
    return (
        <View style={[GS.uinitUI.container, { marginBottom: 1 }]}>
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
                style={{ paddingTop: 15, justifyContent: "center", position: "relative" }}
            >
                <FlatList
                    ref={() => flatListEl}
                    data={items}
                    renderItem={({ item }) => <Item {...mapToItem(+item.id)} />}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => loadingMore ? <MemoryLoadingItems /> : null}
                    onEndReached={_event => onEndReached(_event)}
                    onEndReachedThreshold={0.5}
                    onScrollBeginDrag={() => {
                        stopFecthMore = false;
                    }}
                >
                </FlatList>
                {loading && <MemoryLoadingItems />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    memoryLoadingItemStyles: {
        marginBottom: 15
    }
})
export default MemoryScreen