async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultElement = document.getElementById('result');

  if (amount === '' || isNaN(amount)) {
      resultElement.innerText = "Por favor ingrese una cantidad válida";
      return;
  }

  //  API de ExchangeRatesAPI
  const apiKey = 'a27b1898fd48b4fba2beb66ed0851f3b';
  const apiUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&base=${fromCurrency}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.error) {
          resultElement.innerText = "Error al obtener las tasas de cambio";
          return;
      }

      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = (amount * exchangeRate).toFixed(2);

      resultElement.innerText = `${amount} ${fromCurrency} es equivalente a ${convertedAmount} ${toCurrency}`;
  } catch (error) {
      resultElement.innerText = "Error al realizar la conversión. Por favor intente de nuevo.";
  }
}

