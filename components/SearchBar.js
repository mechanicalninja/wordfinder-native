import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Button } from 'react-native';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { text: '' };
    }

    static get propTypes() {
        return {
            onSearch: PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => this.setState({ text })}
                        value={this.state.text}
                        autoCorrect={false}
                        autoFocus
                        onSubmitEditing={() => this.props.onSearch(this.state.text)}
                        autoCapitalize="none"
                        returnKeyType="search"
                    />
                </View>
                <View style={{ flex: 0 }}>
                    <Button title="Search" onPress={() => this.props.onSearch(this.state.text)}/>
                </View>
            </View>
        )

    }
}