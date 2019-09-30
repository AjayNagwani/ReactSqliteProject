import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native';

export default class ProductScreen extends Component {
    static navigationOptions = {
        title: 'Products List',
    };
    render() {
        return (
            <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center',backgroundColor : '#ff0'}}>
               <View >
                    <Text style = {styles.titleStyle}> Product List </Text>
                    <TouchableOpacity style = {styles.buttonStyle}
                         onPress = {() => this.props.navigation.navigate('ProductDetails')}
                    >
                    <Text style = {styles.buttonTextStyle}>Go to Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonStyle}
                         onPress = {() => this.props.navigation.navigate('AddProduct')}>
                    <Text style = {styles.buttonTextStyle}>Go To Add Product</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.buttonStyle}
                         onPress = {() => this.props.navigation.navigate('EditProduct')}>
                    <Text style = {styles.buttonTextStyle}>Go To Edit Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
     alignItems : 'center',
    },
    buttonStyle : {
      marginTop : 15,
      marginBottom : 10,
      backgroundColor : '#800000',
      padding : 10,
      alignItems : 'center',
      marginLeft : 35,
      marginRight : 35,
      
      
    },
    titleStyle : {
        color : '#000',
        fontSize : 40,
    },
    buttonTextStyle : {
        color : '#fff',
    }
  })
