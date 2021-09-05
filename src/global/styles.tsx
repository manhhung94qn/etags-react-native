import { StyleSheet } from 'react-native';

const uinitUI = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        position: 'relative'
    },
    w100: {
        width: '100%'
    },
    w50: {
        width: '50%'
    }
})

const flexUI = StyleSheet.create({
    default: {
        display: 'flex'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    my2: {
        marginTop: 2,
        marginBottom: 2,
    },
})


const textInputUI = StyleSheet.create({
    default: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 13,
        borderRadius: 4,
        borderColor: '#ccc',
    },
    focus: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 13,
        borderRadius: 4,
        borderColor: '#66afe9',
    }
})

const GlobalStyle = {
    uinitUI,
    flexUI,
    textInputUI
}

export default  GlobalStyle