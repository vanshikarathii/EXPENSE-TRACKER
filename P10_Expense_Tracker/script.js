const balance=document.getElementById("balance");
const money_plus=document.getElementById("money-plus");
const money_minus=document.getElementById("money-minus");
const list=document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount=document.getElementById("number");



const localStrorageTransactions=JSON.parse(localStorage.getItem('transaction'));

let transactions= localStorage.getItem('transaction')!== null ? localStrorageTransactions : [];

//add transaction
function AddTransaction(e){
    e.preventDefault()

    if(text.value.trim()==='' || amount.value.trim()===''){
        alert("Please enter the value");
    }
    else{
        const transaction={
            id:generateID(),
            text:text.value,
            amount:+amount.value
        };
        transactions.push(transaction);

        AddTransactionDOM(transaction);

        UpdateValues();

        updateLocalStorage();

        text.value='';
        amount.value='';

    }
    
}

function generateID(){
    return Math.floor(Math.random()*1000000);
}

//function to add all transaction history to the dom
function AddTransactionDOM(transaction){
    const sign=transaction.amount < 0 ? '-':'+';

    const li=document.createElement('li');

    li.classList.add(transaction.amount <0 ? 'minus' : 'plus');

    li.innerHTML=`${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span><button class= "delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(li);

}

//update balance , expense , income
function UpdateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts);
    
    const total = amounts.reduce((acc, item) => (acc += item), 0);
    console.log(total);
    
    const income = amounts.filter(item => item > 0).reduce((acc, num) => (acc += num), 0).toFixed(2);
    console.log(income);
    
    const expense = (amounts.filter(item => item < 0).reduce((acc, num) => (acc += num), 0) * -1).toFixed(2);
    console.log(expense);
    
    balance.innerHTML = `$${total}`;
    money_minus.innerText = `$${expense}`;
    money_plus.innerText = `$${income}`;
    
    
                            
}

function removeTransaction(id){
    transactions=transactions.filter(transaction=>transaction.id!==id);
    updateLocalStorage();

    init();
}

//update local storage transaction
function updateLocalStorage(){
    localStorage.setItem('transaction' , JSON.stringify(transactions));
}

function init(){
    list.innerHTML='';

    transactions.forEach(AddTransactionDOM);
    UpdateValues();
}

init();


//event listener
form.addEventListener('submit' , AddTransaction);
