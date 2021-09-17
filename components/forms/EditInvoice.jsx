import { ObjectId } from "bson";
import { useRouter } from "next/router";
import EditLineItem from "./EditLineItem";

export default function EditCustomer(props) {
  const router = useRouter();
  const { inv_id, cust_id, cust_name, description, price, line_items } = props.invoices[0];
  const  customers  = props.customers;

  let previewUrl = `/invoices/${router.query.id}/${router.query.inv_id}/preview`;
  
  const url = props.url;

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      inv_id: inv_id,
      cust_id: e.target.customer.value.slice(0, 24),
      cust_name: e.target.customer.value.slice(24),
      description: e.target.description.value,
      price: e.target.price.value,
    };

    const res = await fetch(`/api/invoices/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      router.back();
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    const body = {
      inv_id: inv_id,
      cust_id: cust_id,
      cust_name: cust_name,
      description: description,
      price: price,
    };

    const res = await fetch(`/api/invoices/${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      router.back();
    }
  }

  return (
    <><button
    type="button"
    onClick={()=>router.push(previewUrl)}
    className="rounded-xl border-2 py-2 px-4 bg-blue-600 hover:bg-blue-300 ease-in-out"
  >
    Preview
  </button>
      <form className="grid grid-cols-1" onSubmit={handleSubmit}>
      <label className="label" htmlFor="customer">Customer</label>
      <select name="customer" defaultValue={`${cust_id}${cust_name}`} >
         {customers.map(customer => {
           return (
             <option key={customer.cust_id} value={`${customer.cust_id}${customer.first_name} ${customer.sur_name}`}> {customer.first_name} {customer.sur_name} </option>
           )
         })}
    </select>
         <EditLineItem line_items={line_items} />
        
        

        <button type="submit" className="rounded-xl border-2 py-2 px-4 hover:bg-gray-200 ease-in-out">
          Save
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-xl border-2 py-2 px-4 bg-red-600 hover:bg-red-300 ease-in-out"
        >
          Delete
        </button>
      </form>
    </>
  );
}
