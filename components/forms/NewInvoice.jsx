import { ObjectId } from "bson";
import { useRouter } from "next/router";

import { Formik, Form, Field, FieldArray } from "formik";
import { HiPlus, HiMinus } from "react-icons/hi";

import { formatPrice, subtotalSum, vatSum } from "../../utils/format";
import { DatePicker } from "../common/DatePicker";

// TODO Add subtotal / vat / total calculator with onchange from form
export default function NewInvoice({ url, customers, inv_no, invoices }) {
  const router = useRouter();
  const inv_id = ObjectId();

  async function handleSubmit(values) {
    let subtotal = subtotalSum(values.line_items);
    let vat = vatSum(values.line_items);
    let total = subtotalSum(values.line_items) + vatSum(values.line_items);
    console.log(subtotal, vat, total);
    const body = {
      inv_id: inv_id,
      inv_no: values.inv_no,
      inv_date: values.inv_date,
      due_date: values.due_date,
      cust_id: JSON.parse(values.customer).cust_id,
      customer: JSON.parse(values.customer),
      line_items: values.line_items,
      notes: values.notes,
      sub_total: parseInt(subtotal),
      vat_total: parseInt(vat),
      total_due: parseInt(total),
    };

    const res = await fetch(`/api/invoices/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.back();
  }

  let dateToday = new Date();
  let dateDue = new Date().setDate(dateToday.getDate() + 7);

  return (
    <div className="max-w-full">
      <Formik
        initialValues={{
          customer: {
            cust_id: "",
            first_name: "",
            sur_name: "",
            add_l1: "",
            add_l2: "",
            add_l3: "",
            add_l4: "",
            postcode: "",
            email: "",
            landline: "",
            mobile: "",
          },
          inv_date: dateToday,
          due_date: dateDue,
          inv_no: inv_no,
          line_items: [
            {
              line_name: "",
              description: "",
              price: 0.0,
              quantity: 1,
              vat: 0.2,
            },
          ],

          nots: "",
          sub_total: 0,
          vat_total: 0,
          total_due: 0,
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values }) => (
          <Form className="grid grid-cols-1 ">
            <div className="border-2 rounded-md  p-2">
              <div className="grid">
                {/* Customer Select */}
                <label className="label" htmlFor="customer">
                  Customer
                </label>
                <Field component="select" name="customer" className="p-2 rounded-md bg-white">
                  <option value="" />
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
              </div>
              <div className="flex justify-start flex-wrap gap-x-2 my-2">
                <DatePicker name="inv_date" label="Select the Invoice Date" />
                <DatePicker name="due_date" label="Select the Date Due" />
                <div className="grid">
                  <label className="" htmlFor="inv_no">
                    Set Invoice Number
                  </label>
                  <Field name="inv_no" type="number" className="rounded-md" />
                </div>
              </div>
            </div>
            <FieldArray // Line Items Array
              name="line_items"
              render={(arrayHelpers) => (
                <div>
                  {values.line_items && values.line_items.length > 0 ? (
                    values.line_items.map((line_item, index) => (
                      <div
                        className="border-2 rounded-md my-4 relative  "
                        key={index}
                      >
                        <div className="flex justify-between flex-grow p-2">
                          <div className="w-1/2">
                            <label
                              className="label"
                              htmlFor={`line_items.${index}.line_name`}
                            >
                              Line Item Name
                            </label>
                            <Field
                              name={`line_items.${index}.line_name`}
                              type="text"
                              className=" rounded-md w-full"
                            />
                            <br />
                            <label
                              className="label "
                              htmlFor={`line_items.${index}.description`}
                            >
                              Description
                            </label>
                            <Field
                              name={`line_items.${index}.description`}
                              component="textarea"
                              className="w-full  p-2 rounded-md"
                            />
                          </div>

                          <div className="flex justify-start ml-2 gap-x-2 flex-wrap w-1/2">
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
                                className="h-10 w-20 rounded-md"
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
                                className="h-10 w-16 rounded-md"
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
                                className="h-10 w-16 rounded-md bg-white"
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
                                onClick={() =>
                                  arrayHelpers.insert(index, line_item)
                                } // Insert an empty line_item object at a position
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
                      <p className="py-2">Add a Line Item </p>
                      <HiPlus size={36} />
                    </button>
                  )}
                  <div className="border-2 rounded-md p-2 my-4 grid">
                    <label className="" htmlFor="notes">
                      Notes
                    </label>
                    <Field
                      className="w-full p-2 rounded-md"
                      name="notes"
                      component="textarea"
                      placeholder="Enter any notes to be displayed in the footer"
                    />
                  </div>

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
