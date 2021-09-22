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
export const daysDue = (due) => {
  let temp = new Date()
  let days = Math.round((new Date(due) - temp)/1000/3600/24);
  if (days<0) return `Overdue by ${Math.abs(days)} days!`;
  else return `Due in ${days} days`;
}

export function getBgColor(index, color){
  if(index % 2 != 0) return color;
  else return "bg-transparent"
}