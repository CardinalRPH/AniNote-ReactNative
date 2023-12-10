import Toast from "react-native-toast-message";

const showToast = (type, text1, text2=null) => {
    Toast.show({
        type: type,
        position: 'bottom',
        text1: text1,
        text2:text2

    });
}

export default showToast