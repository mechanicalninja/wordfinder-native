import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import search from './util/WordSearch';

import SearchBar from './components/SearchBar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '' }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar onSearch={(search) => this.setState({ search })}/>
                <Text>Your search: {this.state.search}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: getStatusBarHeight(),
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
