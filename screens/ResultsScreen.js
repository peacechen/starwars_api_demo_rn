import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import api from '../api';
import Colors from '../constants/Colors';

export default function ResultsScreen(props) {
  let params = props.navigation.state.params;
  const [loading, setLoading] = React.useState(true);
  const [results, setResults] = React.useState([]);
  const [searchType, setSearchType] = React.useState(params.searchType);

  React.useEffect(() => {
    let url = '/' + searchType + '?search=' + params.searchValue;
    api.get(url ).then(response => {
      setResults(response.data.results);
      setLoading(false);
    });
  }, []);

  onBack = () => {
    props.navigation.goBack();
  };

  onPersonDetails = (person) => {
    props.navigation.navigate('PersonDetails', {
      person
    });
  }

  onMovieDetails = (person) => {
    props.navigation.navigate('MovieDetails', {
      person
    });
  }

  renderLoading = () => {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.lightText}>There are zero matches.</Text>
      </View>
    );
  }

  renderNoItems = () => {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.lightText}>
          <Text>There are zero matches.</Text>
          <Text>Use the form to search for People or Movies.</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={onBack}
          >
            <Text style={styles.buttonTextStyle}>BACK TO SEARCH</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPerson = item => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemNameText}>{item.item.name}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => onPersonDetails(item.item)}
        >
          <Text style={styles.buttonTextStyle}>SEE DETAILS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderFilm = item => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemNameText}>{item.item.title}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => onMovieDetails(item.item)}
        >
        <Text style={styles.buttonTextStyle}>SEE DETAILS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderItem = (item) => {
    if (searchType === 'people') {
      return renderPerson(item);
    }
    if (searchType === 'films') {
      return renderFilm(item);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Results</Text>
      </View>
      { loading ?
        renderLoading()
        :
        <FlatList
          data={results}
          renderItem={renderItem}
          ListEmptyComponent={renderNoItems}
          keyExtractor={item => item.id}
        />
      }
    </View>
  );
}

ResultsScreen.navigationOptions = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultsContainer: {
    borderBottomWidth: 1,
    borderColor: Colors.lightBorder,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightBorder,
  },
  itemNameText: {
    fontWeight: 'bold',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightText: {
    color: Colors.lightGrey,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    borderRadius: 14,
    backgroundColor: Colors.searchButton,
    padding: 6,
    marginVertical: 10,
  },
  buttonTextStyle: {
    color: Colors.searchButtonText,
    textAlign: 'center'
  },
});
