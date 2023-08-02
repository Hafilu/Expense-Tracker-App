import { Pressable, StyleSheet, View } from "react-native";
import {Ionicons} from "@expo/vector-icons"

function Iconbutton({icon, size, color, onPress}) {
  return (
    <Pressable onPress={onPress} style={({pressed})=>pressed && styles.pressed}>
        <View style={styles.buttoncontainer}>
            <Ionicons name={icon} color={color} size={size}/>
        </View>
    </Pressable>
   
  )
}

export default Iconbutton;

const styles = StyleSheet.create({
    buttoncontainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    }
})
