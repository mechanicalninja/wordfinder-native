import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import wordSearch from './util/WordSearch';

import SearchBar from './components/SearchBar';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: '', results: [], searching: false, }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.search !== this.state.search) {
            this.doSearch(nextState.search);
        }
    }

    doSearch(scramble) {
        let search = wordSearch(scramble);
        this.setState({ searching: true });
        search.then((results) => {
            this.setState({
                searching: false,
                results
            });
        });
    }

    render() {
        let body;
        if (this.state.searching) {
            body = <ActivityIndicator/>
        } else {
            const resultList = this.state.results.map((result) => (
                <View style={styles.item} key={result}>
                    <Text>{result}</Text>
                </View>
            ));
            body = <ScrollView>{resultList}</ScrollView>;
        }

        return (
            <View style={styles.container}>
                <SearchBar onSearch={(search) => this.setState({ search })}/>
                {body}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: getStatusBarHeight() + 5,
        paddingLeft: 5,
        paddingRight: 5,
    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,
    }
});
