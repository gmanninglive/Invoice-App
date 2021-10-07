import { useRouter } from "next/router";
import { ObjectId } from "bson";
import Image from "next/image";
import axios from "axios";
import { AiOutlineFileImage } from "react-icons/ai";
import { connectToDatabase } from "db/mongodb";
import Header from "components/header/Header";

// TODO refacter form, Add comments, refacter file upload to onChange?
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
      logo: file,
    };
    console.log(file)
    // // If new logo file added fetch s3 url and upload
    // if (!!file) {
    //   // Get signed url from s3, valid for 60s
    //   const getUrl = axios({
    //     method: "GET",
    //     url: `/api/business/${id}/url`,
    //   })
    //     .then((res) => {
    //       return res.data;
    //     })
    //     .catch((err) => {
    //       throw err;
    //     });

    //   const { url } = await getUrl;

    //   // Upload put request to s3
    //   const upload = await fetch(url, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": file.type,
    //       "Content-Disposition": `attachment; filename=${file.name}`,
    //     },
    //     body: file,
    //   });
    //   // Format AWS url
    //   const imageUrl = url.split("?")[0];

    //   // Add logo url to values for database
    //   Object.defineProperty(values, "logo", {
    //     value: imageUrl,
    //     writable: true,
    //   });
    // }
    // // Append all values for database query
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    // Axios PUT request to Mongodb on business ID route
    axios({
      method: "PUT",
      url: `/api/business/${id}/logo`,
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
}