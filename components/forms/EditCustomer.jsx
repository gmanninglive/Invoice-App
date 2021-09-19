import { useRouter } from "next/router";

// TODO Add security popup on delete button to stop accidental deletion.
export default function EditCustomer(props) {
  const router = useRouter();
  const {
    cust_id,
    first_name,
    sur_name,
    add_l1,
    add_l2,
    add_l3,
    add_l4,
    postcode,
    email,
    landline,
    mobile,
  } = props.customers[0];

  const url = props.url;

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
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
      mobile: e.currentTarget.mobile.value,
    };

    const res = await fetch(`/api/customers/${url}`, {
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
      cust_id: cust_id,
      first_name: first_name,
      sur_name: sur_name,
      add_l1: add_l1,
      add_l2: add_l2,
      add_l3: add_l3,
      add_l4: add_l4,
      postcode: postcode,
      email: email,
      landline: landline,
      mobile: mobile,
    };

    const res = await fetch(`/api/customers/${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      router.back();
    }
  }

  return (
    <>
      <form className="grid grid-cols-2 gap-y-1 my-6" onSubmit={handleSubmit}>
        <label className="label" htmlFor="first_name">
          Business Name
        </label>
        <input
          name="first_name"
          type="text"
          placeholder={first_name ? first_name : "Firstname"}
          defaultValue={first_name && first_name}
        />
        <label className="label" htmlFor="sur_name">
          Business Name
        </label>
        <input
          name="sur_name"
          type="text"
          placeholder={sur_name ? sur_name : "Surname"}
          defaultValue={sur_name && sur_name}
        />

        <label className="label" htmlFor="add_l1">
          Address Line 1
        </label>
        <input
          name="add_l1"
          type="text"
          placeholder={add_l1 ? add_l1 : "Set Address Line 1"}
          defaultValue={add_l1 && add_l1}
        />

        <label className="label" htmlFor="add_l2">
          Address Line 2
        </label>
        <input
          name="add_l2"
          type="text"
          placeholder={add_l2 ? add_l2 : "Set Address Line 2"}
          defaultValue={add_l2 && add_l2}
        />

        <label className="label" htmlFor="add_l3">
          Address Line 3
        </label>
        <input
          name="add_l3"
          type="text"
          placeholder={add_l3 ? add_l3 : "Set Address Line 3"}
          defaultValue={add_l3 && add_l3}
        />

        <label className="label" htmlFor="add_l4">
          Address Line 4
        </label>
        <input
          name="add_l4"
          type="text"
          placeholder={add_l4 ? add_l4 : "Set Address Line 4"}
          defaultValue={add_l4 && add_l4}
        />

        <label className="label" htmlFor="postcode">
          Postcode
        </label>
        <input
          name="postcode"
          type="text"
          placeholder={postcode ? postcode : "Set Postcode"}
          defaultValue={postcode && postcode}
        />

        <label className="label" htmlFor="email">
          Email Address
        </label>
        <input
          name="email"
          type="text"
          placeholder={email ? email : "Set Email Address"}
          defaultValue={email && email}
        />

        <label className="label" htmlFor="landline">
          Landline
        </label>
        <input
          name="landline"
          type="text"
          placeholder={landline ? landline : "Set Landline Phone No"}
          defaultValue={landline && landline}
        />

        <label className="label" htmlFor="mobile">
          Mobile
        </label>
        <input
          name="mobile"
          type="text"
          placeholder={mobile ? mobile : "Set Mobile Phone no"}
          defaultValue={mobile && mobile}
        />

        <button
          type="submit"
          value="Submit"
          className="rounded-xl border-2 py-2 px-4 bg-green-500 hover:bg-green-300 ease-in-out"
        >
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
