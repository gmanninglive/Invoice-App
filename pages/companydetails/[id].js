import { useRouter } from "next/router";
import { ObjectId } from "bson";
import Image from "next/image";
import axios from "axios";
import { AiOutlineFileImage } from "react-icons/ai";
import { connectToDatabase } from "db/mongodb";
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
    logo,
  } = props.properties[0].business;
  console.log(logo);
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.currentTarget.logo.files[0];
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
      logo: logo,
    };
    // If new logo file added fetch s3 url and upload
    if (!!file) {
      const getUrl = axios({
        method: "GET",
        url: `/api/business/${id}/url`,
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });

      const { url } = await getUrl;
      console.log(file.name);

      const upload = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": `attachment; filename=${logo.name}`,
        },
        body: file,
      });
      const imageUrl = url.split("?")[0];

      // Add logo url to values for database
      Object.defineProperty(values, "logo", {
        value: imageUrl,
        writable: true,
      });
    }
    // Append all values for database query
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

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
        throw err;
      });
  }

  return (
    <>
      <Header title="Settings" />
      <div className="rounded-xl bg-white p-2">
        <form
          className="rounded-xl grid grid-cols-2 gap-x-1 gap-y-2 "
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
          <div className="col-span-2 w-full flex flex-col items-start">
          <p>Logo</p>
          <div className="w-20 h-20 relative flex justfiy-center items-start">
          
            <Image src={logo} width={100} height={100} alt="logo" className="rounded-md"/>
          <label htmlFor="file" className="cursor-pointer z-9 text-transparent hover:text-black/[0.8] hover:bg-white/[0.5] transition ease-in-out absolute w-full h-full flex justify-center items-center  ">
          <AiOutlineFileImage size={48} className=""/>
            <input type="file" name="logo" className="absolute top-0 z-10 w-full h-full opacity-0 cursor-pointer">
              
            </input>
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
