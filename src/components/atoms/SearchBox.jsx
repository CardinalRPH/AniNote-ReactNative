import { SearchBar } from "@rneui/base";

const SearchBox = ({ navigation, placeholder, handleSubmit, valueSearch, handleClear, loading=false }) => {
    const { searchVal, setSearchVal } = valueSearch
    const goToHome = () => {
        navigation.navigate('Home');
    }
    return (
        <SearchBar
            platform="default"
            inputContainerStyle={{}}
            inputStyle={{}}
            leftIconContainerStyle={{}}
            rightIconContainerStyle={{}}
            loadingProps={{}}
            onChangeText={setSearchVal}
            onClear={handleClear}
            onSubmitEditing={handleSubmit}
            placeholder={placeholder}
            placeholderTextColor="#888"
            round
            cancelButtonTitle="Cancel"
            cancelButtonProps={{}}
            onCancel={goToHome}
            value={searchVal}
            clearButtonMode="always"
            showLoading={loading}
            
        />
    );
}
export default SearchBox