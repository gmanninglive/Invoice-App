import Head from "next/head";
import { Fragment, useRef, useEffect } from "react";
import Image from "next/image";
import { ObjectId } from "bson";

import { formatPrice } from "../../../../../utils/format";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { GeneratePdf } from "../../../../../components/GeneratePdf";

export default function Invoice(props) {

  
  const ref = useRef();
  const router = useRouter();
  const { print } = router.query;
  const { user, isLoading } = useUser();
  const { customers } = props.properties[0];
  const { invoices, business } = props.properties[0];
  let b = business;

  useEffect(() => {
    if(user && (print == "true")){
      GeneratePdf(ref);
    }
  }, [user])

  let customer = findCustomer(customers, invoices);
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
  } = customer;

  let data = {
    currency: "£",

    invoice: {
      number: "1",
      prefix: "000",
      date: "26/08/21",
      due: "31/08/21",
    },
  };

  const { line_items } = invoices[0]
  let subtotal = formatPrice(subtotalSum(line_items));
  let vat = formatPrice(vatSum(line_items));
  let total = formatPrice(subtotalSum(line_items)+vatSum(line_items));

  if(!user) return ( <div>Loading...</div>);

  return (
    <div className="page-wrapper" ref={ref}>
      <div className="bg-white page shadow-md relative">
        <header className="relative p-6 flex justify-between mb-5 bg-blue-900 text-gray-100 shadow-md">
          <div>
            <h1 className="text-4xl">Invoice</h1>
            <div className="pt-4">
              <p>{`Date: ${data.invoice.date}`}</p>
              <p>{`Due: ${data.invoice.due}`}</p>
              <p>{`Invoice #: ${data.invoice.prefix}${data.invoice.number}`}</p>
            </div>
            <p className="font-bold pt-2">Invoice to:</p>
            <p>{`${first_name} ${sur_name}`}</p>
            <p>{add_l1}</p>
            <p>{add_l2}</p>
            <p>{add_l3}</p>
            <p>{add_l4}</p>
            <p>{postcode}</p>
          </div>

          <div>
            <Image
              src={user.picture}
              alt="Logo"
              width="50px"
              height="50px"
            />
            <p>{b.business_name}</p>
            <p>{b.add_l1}</p>
            <p>{b.add_l2}</p>
            <p>{b.add_l3}</p>
            <p>{b.add_l4}</p>
            <p>{b.postcode}</p>
            <p>{b.email}</p>
            <p>{b.landline || b.mobile}</p>
            
          </div>
        </header>

        <div className="grid grid-cols-6 p-6">
          <div className="font-bold">Line Title</div>
          <div className="font-bold">Description</div>
          <div className="font-bold">Quantity</div>
          <div className="font-bold">Unit price</div>
          <div className="font-bold">VAT</div>
          <div className="font-bold">Total</div>

          {line_items.map((lineitem) => (
            <Fragment key={lineitem.line_name}>
              <div className="">{lineitem.line_name}</div>
              <div className="">{lineitem.description}</div>
              <div className="">{lineitem.quantity}</div>
              <div className="">{formatPrice(lineitem.price)}</div>
              <div className="">{`${lineitem.vat * 100}%`}</div>
              <div className="">
                {`${data.currency}
                    ${formatPrice(lineitem.quantity * lineitem.price)}`}
              </div>
            </Fragment>
          ))}
        </div>
        <div className="grid justify-end pr-6 ">
          <div>{`Subtotal ${data.currency}${subtotal}`} </div>
          <div>{`VAT ${data.currency}${vat}`}</div>
          <div className="font-bold text-2xl w-40">{`Total Due ${data.currency}${total}`}</div>
        </div>

        <footer className="absolute bottom-5 w-full border-t-2">
          <div className="flex justify-evenly">
            <div>Company Number: {b.ltd_no}</div>
            <div>Vat Number: {b.vat_no}</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const { id, inv_id } = context.query;
  console.log(context.query);
  const data = await db
    .collection("users")
    .aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $project: {
          business: 1,
          invoices: {
            $filter: {
              input: "$invoices",
              as: "invoice",
              cond: { $eq: ["$$invoice.inv_id", inv_id] },
            },
          },
          customers: 1,
        },
      },
    ])
    .toArray();

  const properties = JSON.parse(JSON.stringify(data));
  console.log(properties);

  return {
    props: { properties },
  };
}

// Helper function to get customer asscociated with invoice
export const findCustomer = (customers, invoices) => {
  let temp;
  for (let i = 0; i < customers.length; i++) {
    temp = customers[i];
    if (temp.cust_id === invoices[0].cust_id) return temp;
  }
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

// business {
  //   business_name,
  //   add_l1,
  //   add_l2,
  //   add_l3,
  //   add_l4,
  //   postcode,
  //   email,
  //   landline,
  //   mobile,
  //   vat_no,
  //   ltd_no,
  // } 
