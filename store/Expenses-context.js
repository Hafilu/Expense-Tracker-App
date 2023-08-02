import { createContext, useReducer } from "react";

 

export const Expensescontext = createContext({
    expenses:[],
    addExpense:({description, amount, date})=>{},
    setExpenses:( expenses)=>{},
    deleteExpense:(id)=>{},
    updateExpense:(id, {description, amount, date})=>{}
});

function expenseReducer(state, action){
    switch(action.type){
        case "ADD":
            return [action.payload, ...state]
        case "SET":
            const inverted = action.payload.reverse();
            return inverted;  
        case "UPDATE":
            const updatableexpenseindex = state.findIndex((expense)=>{
                return expense.id === action.payload.id
            });
            const updatableexpense = state[updatableexpenseindex];
            const updateditem = {...updatableexpense, ...action.payload.data};
            const updatedexpenses = [...state];
            updatedexpenses[updatableexpenseindex] = updateditem;
            return updatedexpenses;
        case "DELETE":
            return state.filter((expense)=>expense.id !== action.payload)
        default:
           return state;
        
    }
}

function ExpensesContextProvider({children}){
    const [expensesstate, dispatch] = useReducer(expenseReducer,[]);
    function addExpense(expenseData){
        dispatch({type:"ADD", payload: expenseData});
    }
    function setExpenses(expenses){
        dispatch({type:"SET", payload: expenses});
    }
    function deleteExpense(id){
        dispatch({type:"DELETE", payload : id});
    }
    function updateExpense(id, expenseData){
        dispatch({type:"UPDATE", payload:{ id:id, data:expenseData}})
    }

    const value ={
        expenses: expensesstate,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense : deleteExpense,
        updateExpense : updateExpense,
    };
    return <Expensescontext.Provider value={value}>{children}</Expensescontext.Provider>
}

export default ExpensesContextProvider;