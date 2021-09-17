import { ObjectId } from "bson";
import { useRouter } from "next/router";
import { BiPyramid } from "react-icons/bi";
import LineItem from "./LineItem";

export default function NewInvoice(props){
    const router = useRouter();

    const url = props.url;
    const inv_id = ObjectId();
    const { customers } = props;


    async function handleSubmit(e) {
    e.preventDefault();

    console.log(e.target.description.value);
    const body =
        {
            inv_id: inv_id,
            cust_id: e.target.customer.value.slice(0, 24),
            cust_name: e.target.customer.value.slice(24),
            line_items: 
            [{
              line_name: e.target.line_name.value,
              description: e.target.description.value,
              price: e.target.price.value,
              quantity: e.target.quantity.value,
              vat: e.target.vat.value,
            }],
        };

    const res = await fetch(`/api/invoices/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.back();
  }

  return (
    <>
      <form className="grid grid-cols-1" onSubmit={handleSubmit}>
      <label className="label" htmlFor="customer">Customer</label>
      <select name="customer">
         {customers.map(customer => {
           return (
             <option key={customer.cust_id} value={`${customer.cust_id}${customer.first_name} ${customer.sur_name}`}> {customer.first_name} {customer.sur_name} </option>
           )
         })}
    </select>
  
        <LineItem />
        

        <button type="submit" className="rounded-xl border-2 py-2 px-4 hover:bg-gray-200 ease-in-out">
          Save
        </button>
      </form>
    </>
  )
  }
