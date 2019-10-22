/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';

import ProductScreen from './components/ProductScreen';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import ProductAddScreen from './components/ProductAddScreen';
import ProductEditScreen from './components/ProductEditScreen';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import MigrationScreen from './components/MigrationScreen';

const RootStack = createStackNavigator(
  {
    Product : MigrationScreen,
    ProductDetails : ProductDetailsScreen,
    AddProduct : ProductAddScreen,
    EditProduct : ProductEditScreen
  },
  {
    initialRouteName: 'Product',
    navigationOptions : {
      headerStyle: {
        backgroundColor : '#777777'
      },
      headerTintColor: '#fff',
      headerTitleStyle : {
        fontWeight : 'bold'
      },
    },
  },
);
const MigrationStack = createStackNavigator({ Migration : MigrationScreen });

const RootContainer = createAppContainer(createSwitchNavigator(
  {
    Migration : MigrationScreen,
    App : RootStack, 
  },
  {
    initialRouteName: 'Migration',
  }
  ));
export default class App extends React.Component {

  render(){
    return <RootContainer/>
  };
}


