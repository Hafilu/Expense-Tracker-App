
import { FlatList} from 'react-native'
import Expenseitem from './Expenseitem';

function renderExpenseItem(itemData){
return  <Expenseitem {...itemData.item}/>
}

function Expenseslist({expenses}) {
  return (
     <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item)=>item.id}/>
  );
}

export default Expenseslist
