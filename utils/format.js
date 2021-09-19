export const formatPrice = (props) => {return props.toFixed(2)};
  
export const lineSum = (data) => {
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    result += data[i].price * data[i].quantity;
  }
  return result;
};

export const subtotalSum = (data) => {
  let result = 0;
  for (let i = 0; i < data.length; i++) {
    result += data[i].price * data[i].quantity;
  }
  return result;
};

export const vatSum = (data) => {
  let result = 0.0;
  for (let i = 0; i < data.length; i++) {
    result += data[i].price * data[i].quantity * data[i].vat;
  }
  return result;
};

export const formatDate = (date) => {

  return new Date(date).toDateString().slice(4);
}