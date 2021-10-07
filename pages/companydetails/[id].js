import { useRouter } from "next/router";
import { useState } from "react";
import { ObjectId } from "bson";
import Image from "next/image";
import axios from "axios";

import { AiOutlineFileImage } from "react-icons/ai";
import { connectToDatabase } from "db/mongodb";
import Header from "components/header/Header";

// TODO Possibly change mongodb set queries, currently logo update only sets logo. But text form sets all fields.
// If the userbase expanded greatly this could increase costs with unnecessary writes
// TODO Add s3 delete function when user changes logo
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
    logo,
  } = props.properties[0].business;
  const router = useRouter();
  const { id } = router.query;

  // Logo State -- Updates when user uploads new logo to prevent refresh
  const [updatedlogo, setlogo] = useState(logo);

  // Function to update logo -- Gets signed AWS s3 URL then sends post request with image to URL
  // Then sends put request to update database with URL
  async function handleLogoChange(e) {
    const file = e.target.files[0];
    // If new logo file added fetch s3 url and upload
    if (!!file) {
      // Get signed url from s3, valid for 60s
      const res = await fetch(`/api/business/gets3url?ext=.${file.type.split("/")[1]}`);
      const { url, fields } = await res.json();
      const formData = new FormData();
      console.log(fields)
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Upload put request to s3
      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (upload.ok) {
        console.log("Uploaded successfully!");
      } else {
        console.error("Upload failed.");
      }
    

    // Format AWS url
    const imageUrl = `https://vie-invoice-app.s3.eu-west-2.amazonaws.com/${fields.key}`;

    // Update logo url state to prevent need to refresh page
    setlogo(imageUrl);
      console.log(imageUrl)
    // Values for database update query
    const values = {
      logo: imageUrl,
    };

    // // Append all values for database query
    const dbFormData = new FormData();
    for (const key in values) {
      dbFormData.append(key, values[key]);
    }
    // Axios PUT request to Mongodb on business details route
    axios({
      method: "PUT",
      url: `/api/business/${id}/logo`,
      data: dbFormData,
    }).then((res) => console.log("logo api response", res)).catch((err) => {
      console.log(err);
    });
  }
}

  // Handle submit of text form fields
  async function handleSubmit(e) {
    e.preventDefault();
    const values = {
      business_name: e.target.business_name.value,
      add_l1: e.target.add_l1.value,
      add_l2: e.target.add_l2.value,
      add_l3: e.target.add_l3.value,
      add_l4: e.target.add_l4.value,
      postcode: e.target.postcode.value,
      email: e.target.email.value,
      landline: e.target.landline.value,
      mobile: e.target.mobile.value,
      vat_no: e.target.vat_no.value,
      ltd_no: e.target.ltd_no.value,
      logo: updatedlogo,
    };

    // Append all values for database query
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    // Axios PUT request to Mongodb on business ID route
    axios({
      method: "PUT",
      url: `/api/business/${id}`,
      data: formData,
      config: {
        headers: {
          "content-type": "multipart/form-data",
        },
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header title="Settings" />
      <div className="rounded-xl bg-white p-4">
        <form
          className="rounded-xl grid grid-cols-2 gap-x-1 gap-y-2 items-center"
          onSubmit={handleSubmit}
        >
          <h3 className="col-span-2">Business Details</h3>
          <label htmlFor="business_name">
            Business Name
          </label>
          <input
            name="business_name"
            type="text"
            placeholder={business_name ? business_name : "set business name"}
            defaultValue={business_name && business_name}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="add_l1">
            Address Line 1
          </label>
          <input
            name="add_l1"
            type="text"
            placeholder={add_l1 ? add_l1 : "Set Address Line 1"}
            defaultValue={add_l1 && add_l1}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="add_l2">
            Address Line 2
          </label>
          <input
            name="add_l2"
            type="text"
            placeholder={add_l2 ? add_l2 : "Set Address Line 2"}
            defaultValue={add_l2 && add_l2}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="add_l3">
            Address Line 3
          </label>
          <input
            name="add_l3"
            type="text"
            placeholder={add_l3 ? add_l3 : "Set Address Line 3"}
            defaultValue={add_l3 && add_l3}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="add_l4">
            Address Line 4
          </label>
          <input
            name="add_l4"
            type="text"
            placeholder={add_l4 ? add_l4 : "Set Address Line 4"}
            defaultValue={add_l4 && add_l4}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="postcode">
            Postcode
          </label>
          <input
            name="postcode"
            type="text"
            placeholder={postcode ? postcode : "Set Postcode"}
            defaultValue={postcode && postcode}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="email">
            Email Address
          </label>
          <input
            name="email"
            type="text"
            placeholder={email ? email : "Set Email Address"}
            defaultValue={email && email}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="landline">
            Landline
          </label>
          <input
            name="landline"
            type="text"
            placeholder={landline ? landline : "Set Landline Phone No"}
            defaultValue={landline && landline}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="mobile">
            Mobile
          </label>
          <input
            name="mobile"
            type="text"
            placeholder={mobile ? mobile : "Set Mobile Phone no"}
            defaultValue={mobile && mobile}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="vat_no">
            VAT Number
          </label>
          <input
            name="vat_no"
            type="text"
            placeholder={vat_no ? vat_no : "Set VAT Number or N/A"}
            defaultValue={vat_no && vat_no}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />

          <label htmlFor="ltd_no">
            LTD Number
          </label>
          <input
            name="ltd_no"
            type="text"
            placeholder={ltd_no ? ltd_no : "Set LTD Number or N/A"}
            defaultValue={ltd_no && ltd_no}
            className="rounded-md bg-black/[0.12] focus:bg-white"
          />
          <div className="col-span-2 w-full flex flex-col items-start">
            <p>Logo</p>
            <div className="w-20 h-20 relative flex justfiy-center items-start">
              <Image
                src={updatedlogo}
                width={100}
                height={100}
                alt="logo"
                className="rounded-md"
              />
              <label
                htmlFor="file"
                className="cursor-pointer z-9 
                text-transparent hover:text-black/[0.8] hover:bg-white/[0.5] 
                transition ease-in-out absolute 
                w-full h-full flex justify-center items-center  "
              >
                <AiOutlineFileImage size={48} className="" />
                <input
                  type="file"
                  name="logo"
                  className="absolute top-0 z-10 w-full h-full opacity-0 cursor-pointer"
                  title="Update Logo"
                  onChange={handleLogoChange}
                  accept="image/png, image/jpeg"
                />
              </label>
            </div>
          </div>
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
