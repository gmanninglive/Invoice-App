import Head from "next/head";
import { Fragment, useRef, useEffect } from "react";
import Image from "next/image";
import { ObjectId } from "bson";

import { formatDate, formatPrice, getBgColor, formatLineItem } from "../../../../../utils/format";
import { connectToDatabase } from "../../../../../db/mongodb";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { GeneratePdf } from "../../../../../components/GeneratePdf";

export default function Invoice(props) {

  const ref = useRef();
  const router = useRouter();
  const { print } = router.query;
  const { user, isLoading } = useUser();
  
  const { invoices, business } = props.properties[0];
  let b = business;
  const { line_items, sub_total, vat_total, total_due, inv_date, due_date, inv_no} = invoices[0]

  useEffect(() => {
    if(user && (print == "true")){
      GeneratePdf(ref);
    }
  }, [user])
  
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
  } = invoices[0].customer;

  let data = {
    currency: "£",

    invoice: {
      prefix: "000",
    },
  };
  
  if(!user) return ( <div>Loading...</div>);

  return (
    <div className="page-wrapper" ref={ref}>
      <div className="bg-white page shadow-md relative ">
        <header className="relative p-6 flex justify-between mb-5 bg-blue-900 text-gray-100 shadow-md">
          <div>
            <h1 className="text-4xl">Invoice</h1>
            <div className="pt-4">
              <p>{`Invoice Date: ${formatDate(inv_date)}`}</p>
              <p>{`Due: ${formatDate(due_date)}`}</p>
              <p>{`Invoice #: ${data.invoice.prefix}${inv_no}`}</p>
            </div>
            <p className="font-bold pt-2">Invoice to:</p>
            <p>{`${first_name} ${sur_name}`}</p>
            <p>{add_l1}</p>
            <p>{add_l2}</p>
            <p>{add_l3}</p>
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

        <div className="grid p-6 invoice_items" >
          <div className="font-bold">Line Title</div>
          <div className="font-bold">Description</div>
          <div className="font-bold">Quantity</div>
          <div className="font-bold">Unit price</div>
          <div className="font-bold">VAT</div>
          <div className="font-bold">Total</div>
        </div>

          {line_items.map((lineitem, index) => (
            <div className={`${getBgColor(index, "bg-gray-100")} grid invoice_items p-6`} key={lineitem.line_name}>
              <div>{lineitem.line_name}</div>
              <div>{lineitem.description}</div>
              <div>{lineitem.quantity}</div>
              <div>{formatLineItem(lineitem.price)}</div>
              <div>{`${lineitem.vat * 100}%`}</div>
              <div>
                {`${data.currency}
                    ${formatLineItem(lineitem.quantity * lineitem.price)}`}
              </div>
              
            </ div>
            
          ))}
        
        <div className="grid justify-end pr-6 ">
          <div>{`Subtotal ${data.currency}${formatPrice(sub_total)}`} </div>
          <div>{`VAT ${data.currency}${formatPrice(vat_total)}`}</div>
          <div className="font-bold text-2xl w-40">{`Total Due ${data.currency}${formatPrice(total_due)}`}</div>
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