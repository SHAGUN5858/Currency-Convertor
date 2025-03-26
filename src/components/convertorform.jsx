import { useEffect, useState } from "react";
import CurrencySelect from "./currencyselect"
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const ConvertorForm = () => {
    const [fromCurrency,setFromCurrency]=useState("USD");
    const [toCurrency,setToCurrency]=useState("INR");
    const [amount,setAmount]=useState(100);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [result,setResult]=useState(null);
    const getExchangeRate = async () => {
        const currencyCode = fromCurrency.toLowerCase(); // Ensure it's lowercase
        const url = `${BASE_URL}/${currencyCode}.json`;
        try{
            const response=await fetch(url);
            if (!response.ok) throw Error("Something went wrong");
            const data=await response.json();
            console.log(data);
            const rate=data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
            if(!rate) throw Error("Invalid currency");
            const finAmount=rate * amount;
            setResult(`${amount} ${fromCurrency} = ${finAmount} ${toCurrency}`);
        }catch(error){
            console.log(error);
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        getExchangeRate();
    }
    useEffect(()=>getExchangeRate,[]);
    return (
        <form className="convertor-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label">Enter Amount</label>
          <input 
          type="number" 
          className="form-input" 
          value={amount} 
          onChange={e=>setAmount(e.target.value)}
          required/>
        </div>
        <div className="form-group form-currency-group">
          <div className="form-section">
            <label className="form-label">From</label>
            <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={e => setFromCurrency(e.target.value)}
            />
          </div>
          <div className="form-section">
            <label className="form-label">To</label>
            <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={e => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="submit-button">Get Exchange Rate</button>
          <p className="exchange-rate-result">{result}</p>
      </form>
    )
}
export default ConvertorForm