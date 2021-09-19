import { useRouter } from "next/router";

import { Formik, Form, Field, FieldArray } from "formik";
import { HiPlus, HiMinus } from "react-icons/hi";

import { DatePicker } from "../common/DatePicker";

import { formatPrice, subtotalSum, vatSum } from "../../utils/format";

// TODO Add subtotal / vat / total calculator with onchange from form

export default function EditInvoice(props) {
  const router = useRouter();
  const { inv_id, cust_id, customer, description, price, line_items } = props.invoices[0];
  const  customers  = props.customers;

  let previewUrl = `/invoices/${router.query.id}/${router.query.inv_id}/preview`;
  const url = props.url;
 
  async function handleSubmit(values) {
    let subtotal = formatPrice(subtotalSum(values.line_items));
    let vat = formatPrice(vatSum(values.line_items));
    let total = formatPrice(subtotalSum(values.line_items)+vatSum(values.line_items));
    const body = {
      inv_id: inv_id,
      inv_no: values.inv_no,
      inv_date: values.inv_date,
      due_date: values.due_date,
      cust_id: JSON.parse(values.customer).cust_id,
      customer: JSON.parse(values.customer),
      line_items: values.line_items,
      sub_total: subtotal,
      vat_total: vat,
      total_due: total
    };

    const res = await fetch(`/api/invoices/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.back();
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
  let dateToday = new Date();
  let dateDue = new Date().setDate(dateToday.getDate() + 7);

  return (
    <div>
      <Formik
        initialValues={{
          customer: JSON.stringify(customer),
          inv_date: dateToday,
          due_date: dateDue,
          inv_no: 0,
          line_items: line_items,
          }
        }
        onSubmit={(values) => {handleSubmit(values)}
        }>
        {({ values }) => (
          <Form className="grid grid-cols-1">       {/* Customer Select */}
            <label className="label" htmlFor="customer"> 
              Customer
            </label>
            <Field component="select" name="customer">
              <option value='' />
              {customers.map((customer) => {
                return (
                  <option
                    key={customer.cust_id}
                    value={JSON.stringify(customer)}
                  >
                    {" "}
                    {customer.first_name} {customer.sur_name}{" "}
                  </option>
                );
              })}
            </Field>
            <div className="flex my-2">
            <DatePicker name="inv_date" label="Select the Invoice Date" />
            <DatePicker name="due_date" label="Select the Date Due" />
            <div className="grid">
            <label className="" htmlFor="inv_no" >Set Invoice Number</label>
            <Field name="inv_no" type="number" />
            </div>
            </div>
            <FieldArray                               // Line Items Array
              name="line_items"
              render={(arrayHelpers) => (
                <div>
                  {values.line_items && values.line_items.length > 0 ? (
                    values.line_items.map((line_item, index) => (
                      <div
                        className="border-2 rounded-md my-4 relative "
                        key={index}
                      >
                        <div className="flex justify-between flex-grow">
                          <div className="col-span-1 w-1/2">
                            <label
                              className="label m-4 w-1/2"
                              htmlFor={`line_items.${index}.line_name`}
                            >
                              Line Item Name
                            </label>
                            <Field
                              name={`line_items.${index}.line_name`}
                              type="text"
                              className="m-4 rounded-md"
                            />
                            <br />
                            <label
                              className="label m-4"
                              htmlFor={`line_items.${index}.description`}
                            >
                              Description
                            </label>
                            <Field
                              name={`line_items.${index}.description`}
                              component="textarea"
                              className="w-full ml-4 my-4 p-2 rounded-md"
                            />
                          </div>

                          <div className="m-4 flex justify-around flex-wrap w-1/2">
                            <span>
                              <label
                                className="label "
                                htmlFor={`line_items.${index}.price`}
                              >
                                Price
                              </label>

                              <Field
                                name={`line_items.${index}.price`}
                                type="number"
                                className="h-10 w-20 mx-2 rounded-md"
                              />
                            </span>
                            <span>
                              <label
                                className="label w-16"
                                htmlFor={`line_items.${index}.quantity`}
                              >
                                Quantity
                              </label>
                              <Field
                                name={`line_items.${index}.quantity`}
                                type="number"
                                className="h-10 w-16 mx-2 rounded-md"
                              />
                            </span>
                            <span>
                              <label
                                className="label "
                                htmlFor={`line_items.${index}.vat`}
                              >
                                VAT
                              </label>
                              <Field
                                name={`line_items.${index}.vat`}
                                component="select"
                                className="h-10 w-16 mx-2 rounded-md"
                              >
                                <option value={0}>0%</option>
                                <option value={0.05}>5%</option>
                                <option value={0.2}>20%</option>
                              </Field>
                            </span>
                            <div className="absolute bottom-2 right-2">
                              <button
                                type="button"
                                className="text-gray-600 "
                                onClick={() => arrayHelpers.remove(index)} // Remove a line item from the list
                              >
                                <HiMinus size={32} />
                              </button>
                              <button
                                type="button"
                                className="text-blue-600"
                                onClick={() => arrayHelpers.insert(index, "")} // Insert an empty line_item object at a position
                              >
                                <HiPlus size={32} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <button
                      type="button"
                      className=" inline-flex items-center text-white bg-green-500 rounded-xl border-2 my-4 px-4 hover:bg-green-800 ease-in-out"
                      onClick={() => arrayHelpers.push("")}
                    >
                      {/* Show this when user has removed all line items from the list */}
                      <p className="py-2">Add a Line Item </p><HiPlus size={36} />
                    </button>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="rounded-xl border-2 py-2 px-4 text-white bg-blue-600 hover:bg-blue-900 ease-in-out"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
