import { ObjectId } from "bson";
import { useRouter } from "next/router";

export default function NewCustomer(props){
    const router = useRouter();

    const url = props.url;
    const cust_id = ObjectId();

    async function handleSubmit(e) {
    e.preventDefault();
    const body =
        {
            cust_id: cust_id,
            first_name: e.currentTarget.first_name.value,
            sur_name: e.currentTarget.sur_name.value,
            add_l1: e.currentTarget.add_l1.value,
            add_l2: e.currentTarget.add_l2.value,
            add_l3: e.currentTarget.add_l3.value,
            add_l4: e.currentTarget.add_l4.value,
            postcode: e.currentTarget.postcode.value,
            email: e.currentTarget.email.value,
            landline: e.currentTarget.landline.value,
            mobile: e.currentTarget.mobile.value
        }
        
        ;

    const res = await fetch(`/api/customers/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.back();
  }

  return (
    <>
      <form className="grid grid-cols-2 gap-y-1 my-6 p-2 bg-white rounded-xl" onSubmit={handleSubmit}>
        <label className="label" htmlFor="first_name">
          First Name</label>
        <input
          name="first_name"
          type="text"
          placeholder={"Firstname"}
          required
    
        />
        <label className="label" htmlFor="sur_name">
          Surname</label>
        <input
          name="sur_name"
          type="text"
          placeholder={"Surname"}
          required

        />

        <label className="label" htmlFor="add_l1">Address Line 1</label>
        <input
          name="add_l1"
          type="text"
          placeholder={"Set Address Line 1"}

        />

        <label className="label" htmlFor="add_l2">Address Line 2</label>
        <input
          name="add_l2"
          type="text"
          placeholder={"Set Address Line 2"}

        />

        <label className="label" htmlFor="add_l3">Address Line 3</label>
        <input
          name="add_l3"
          type="text"
          placeholder={"Set Address Line 3"}

        />

        <label className="label" htmlFor="add_l4">Address Line 4</label>
        <input
          name="add_l4"
          type="text"
          placeholder={"Set Address Line 4"}
 
        />

        <label className="label" htmlFor="postcode">Postcode</label>
        <input
          name="postcode"
          type="text"
          placeholder={"Set Postcode"}
   
        />

        <label className="label" htmlFor="email">Email Address</label>
        <input
          name="email"
          type="text"
          placeholder={"Set Email Address"}
     
        />

        <label className="label" htmlFor="landline">Landline</label>
        <input
          name="landline"
          type="text"
          placeholder={"Set Landline Phone No"}
  
        />

        <label className="label" htmlFor="mobile">Mobile</label>
        <input
          name="mobile"
          type="text"
          placeholder={"Set Mobile Phone no"}
        
        />

        <button type="submit" className="rounded-xl border-2 py-2 px-4 bg-green-500 hover:bg-green-300 ease-in-out">
          Save
        </button>
      </form>
    </>
  )
  }
