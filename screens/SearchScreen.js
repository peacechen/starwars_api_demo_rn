import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

export default function SearchScreen(props) {
  const [searchType, setSearchType] = React.useState('people');
  const [inputValue, onChangeText] = React.useState('');

  const selections = [
    {
      label: 'People',
      value: 'people',
      color: 'blue'
    },
    {
      label: 'Movies',
      value: 'films',
      color: 'blue'
    },
  ];

  onSelect = data => {
    let selectedButton = data.find(e => e.selected == true);
    setSearchType(selectedButton.value);
  }

  onSearch = () => {
    props.navigation.navigate('Results', {
      searchValue: inputValue,
      searchType
    });
  }


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={'padding'}
      keyboardVerticalOffset={100}
    >
      <Text style={styles.searchingForText}>What are you searching for?</Text>
      <View style={styles.selectionContainer}>
        <RadioGroup
          radioButtons={selections}
          flexDirection='row'
          onPress={onSelect}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={text => onChangeText(text)}
          value={inputValue}
          placeholder='e.g. Chewbacca, Yoda'
        />
      </View>
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity
          style={[styles.searchButtonStyle, !inputValue && styles.searchButtonDisabledStyle]}
          disabled={!inputValue}
          onPress={onSearch}
        >
          <Text style={styles.searchButtonTextStyle}>SEARCH</Text>
  		  </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

SearchScreen.navigationOptions = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  searchingForText: {
    fontSize: 12,
    color: Colors.searchingForText,
    textAlign: 'left',
    margin: 10,
  },
  selectionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.lightBorder,
    alignSelf: 'stretch',
    padding: 4,
    margin: 10
  },
  searchButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchButtonStyle: {
    borderRadius: 14,
    backgroundColor: Colors.searchButton,
    padding: 6
  },
  searchButtonDisabledStyle: {
    backgroundColor: Colors.disabled,
  },
  searchButtonTextStyle: {
    color: Colors.searchButtonText,
    textAlign: 'center'
  },
});
