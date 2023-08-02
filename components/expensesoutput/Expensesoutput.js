import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constant/styles';
import Expenseslist from './Expenseslist';
import Expensessummary from './Expensessummary';



function Expensesoutput({expenses, expensesperiod, fallbacktext}) {
    let content = <Text style={styles.infotext}>{fallbacktext}</Text>;
    if(expenses.length >0){
        content = <Expenseslist expenses={expenses}/>;
    }
  return (
     <View style={styles.container}> 
       <Expensessummary expenses={expenses} periodname = {expensesperiod}/>
       {content}
     </View>
  )
}

export default Expensesoutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingBottom:0,
        paddingTop:24,
        backgroundColor:GlobalStyles.colors.primary700
    },
    infotext:{
        color:"white",
        fontSize:16,
        fontWeight:"bold",
        marginTop:32
    }
})
