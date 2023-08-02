import { ActivityIndicator, StyleSheet, View } from "react-native"
import { GlobalStyles } from "../../constant/styles";

function Loadingoverlay() {
  return (
     <View style={styles.container}>
        <ActivityIndicator size="large" color="white"/>
     </View>
  )
}

export default Loadingoverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    }
})
