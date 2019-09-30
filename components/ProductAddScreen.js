import React, { Component } from 'react'
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native'

export default class ProductAddScreen extends Component {
    static navigationOptions = {
        title: 'Add Product',
      };
    render() {
        return (
            <View style = {{flex : 1, alignItems : 'center', justifyContent : 'center',backgroundColor : '#ff0'}}>
            <View >
                 <Text style = {styles.titleStyle}> Add Product </Text>
                 <TouchableOpacity style = {styles.buttonStyle}
                      onPress = {() => this.props.navigation.navigation.push('AddProduct')}
                 >
                 <Text style = {styles.buttonTextStyle}>Go to Add Product... again</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style = {styles.buttonStyle}
                      onPress = {() => this.props.navigation.navigate('Product')}>
                 <Text style = {styles.buttonTextStyle}>Go to Home</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style = {styles.buttonStyle}
                      onPress = {() => this.props.navigation.goBack()}>
                 <Text style = {styles.buttonTextStyle}>Go Back</Text>
                 </TouchableOpacity>
             </View>
         </View>
        )
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