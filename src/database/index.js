import Database from '../database/Database'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Migration from '../database/Migration'
import Migrator from '../database/Migrator'



export default class index extends Component {
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
