export const formatPrice = (props) => {return Math.round(props).toFixed(2)};
  
const subtotalSum = (data) => {
  let result = 0;
  for(let i = 0; i < data.length; i++ )
  {
    result += data[i].price * data[i].units;
  }
  return result;
}

const vatSum = (data) => {
  let result = 0.00;
  for(let i = 0; i < data.length; i++ )
  {
    result += data[i].price * data[i].units * data.vat;
  }
  return result;
}