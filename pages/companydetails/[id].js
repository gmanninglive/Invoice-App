import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

import { ObjectId } from "bson";

import { connectToDatabase } from "../../db/mongodb";
import Header from "components/header/Header";

const CompanyDetails = (props) => {
  const {
    business_name,
    add_l1,
    add_l2,
    add_l3,
    add_l4,
    postcode,
    email,
    landline,
    mobile,
    vat_no,
    ltd_no,
  } = props.properties[0].business;

  const router = useRouter();
  const { id } = router.query;
  const { user, isLoading } = useUser();

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center" }}>
        Please sign in to post
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      business: {
        business_name: e.currentTarget.business_name.value,
        add_l1: e.currentTarget.add_l1.value,
        add_l2: e.currentTarget.add_l2.value,
        add_l3: e.currentTarget.add_l3.value,
        add_l4: e.currentTarget.add_l4.value,
        postcode: e.currentTarget.postcode.value,
        email: e.currentTarget.email.value,
        landline: e.currentTarget.landline.value,
        mobile: e.currentTarget.mobile.value,
        vat_no: e.currentTarget.vat_no.value,
        ltd_no: e.currentTarget.ltd_no.value,
      },
    };

    const res = await fetch(`/api/business/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) console.log("OK");
  }

  return (
    <>
      <Header title="Settings" />
      <div className="rounded-xl bg-white/[0.5] p-2">
        <form
          className="rounded-xl grid grid-cols-2 gap-x-1 gap-y-1 "
          onSubmit={handleSubmit}
        >
          <h3 className="col-span-2">Business Details</h3>
          <label className="label" htmlFor="business_name">
            Business Name
          </label>
          <input
            name="business_name"
            type="text"
            placeholder={business_name ? business_name : "set business name"}
            defaultValue={business_name && business_name}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="add_l1">
            Address Line 1
          </label>
          <input
            name="add_l1"
            type="text"
            placeholder={add_l1 ? add_l1 : "Set Address Line 1"}
            defaultValue={add_l1 && add_l1}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="add_l2">
            Address Line 2
          </label>
          <input
            name="add_l2"
            type="text"
            placeholder={add_l2 ? add_l2 : "Set Address Line 2"}
            defaultValue={add_l2 && add_l2}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="add_l3">
            Address Line 3
          </label>
          <input
            name="add_l3"
            type="text"
            placeholder={add_l3 ? add_l3 : "Set Address Line 3"}
            defaultValue={add_l3 && add_l3}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="add_l4">
            Address Line 4
          </label>
          <input
            name="add_l4"
            type="text"
            placeholder={add_l4 ? add_l4 : "Set Address Line 4"}
            defaultValue={add_l4 && add_l4}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="postcode">
            Postcode
          </label>
          <input
            name="postcode"
            type="text"
            placeholder={postcode ? postcode : "Set Postcode"}
            defaultValue={postcode && postcode}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="email">
            Email Address
          </label>
          <input
            name="email"
            type="text"
            placeholder={email ? email : "Set Email Address"}
            defaultValue={email && email}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="landline">
            Landline
          </label>
          <input
            name="landline"
            type="text"
            placeholder={landline ? landline : "Set Landline Phone No"}
            defaultValue={landline && landline}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="mobile">
            Mobile
          </label>
          <input
            name="mobile"
            type="text"
            placeholder={mobile ? mobile : "Set Mobile Phone no"}
            defaultValue={mobile && mobile}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="vat_no">
            VAT Number
          </label>
          <input
            name="vat_no"
            type="text"
            placeholder={vat_no ? vat_no : "Set VAT Number or N/A"}
            defaultValue={vat_no && vat_no}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label className="label" htmlFor="ltd_no">
            LTD Number
          </label>
          <input
            name="ltd_no"
            type="text"
            placeholder={ltd_no ? ltd_no : "Set LTD Number or N/A"}
            defaultValue={ltd_no && ltd_no}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <button
            type="submit"
            className="col-span-2 rounded-xl border-2 py-2 px-4 hover:bg-gray-200 ease-in-out"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default CompanyDetails;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const { id } = context.query;

  const data = await db
    .collection("users")
    .find({ _id: ObjectId(id) })
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));
  properties.push({ type: "page" });

  return {
    props: { properties },
  };
}
