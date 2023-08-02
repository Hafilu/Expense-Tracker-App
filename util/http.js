import axios from "axios";

const BACKEND_URL =
  "https://expense-tracker-6e90f-default-rtdb.firebaseio.com";

export async function storeExpense(expensedata) {
  const response = await axios.post(BACKEND_URL + "/expenses.json", expensedata);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json",);

  const expenses = [];
  console.log(response.data)

  for(const key in response.data){
    const expenseobj = {
        id: key,
        amount: response.data[key].amount,
        date:new Date(response.data[key].date),
        description:response.data[key].description,
    };
    expenses.push(expenseobj)
  }
  return expenses;
}

export function updateExpense(id, expenseData){
    return axios.put(BACKEND_URL + `/expenses/${id}.json`,expenseData)
}

export function deleteExpense(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
