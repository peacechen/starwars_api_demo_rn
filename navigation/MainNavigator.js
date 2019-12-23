import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import ResultsScreen from '../screens/ResultsScreen';
import PersonDetailsScreen from '../screens/PersonDetailsScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'SWStarter',
      headerTintColor: 'green',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
});

const StackNav = createStackNavigator(
  {
    Search: SearchScreen,
    Results: ResultsScreen,
    PersonDetails: PersonDetailsScreen,
    MovieDetails: MovieDetailsScreen,
  },
  config
);

export default createAppContainer(StackNav);
