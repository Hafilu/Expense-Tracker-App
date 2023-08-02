import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constant/styles";
 

function Erroroverlay({message }) {
  return (
     <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An Error Occurred!..</Text>
        <Text style={styles.text}>{message}</Text>    
     </View>
  )
}

export default Erroroverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    },
    text:{
        textAlign:"center",
        marginBottom:8,
        color:"white"
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    }
})
