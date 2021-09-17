// { id: 1, description: "Line Item 3", units: 3, price: 6900, vat: 0.2 },

export default function LineItem() {
    return (
    <div className="border-2 rounded-md my-4">
      <div className="flex justify-between">
        <div className="col-span-1">
          <label className="label mx-4 row-span-1  w-1/2" htmlFor="line_name">
            Line Item Name
          </label>
          <input
            name="line_name"
            type="text"
            placeholder={"Enter Line item name"}
            size="20"
            className="m-4 mx-auto rounded-md w-1/2"
            defaultValue={""}
          />
          <div>
            <label className="label m-4 " htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              placeholder={"description"}
              rows="8"
              wrap="soft"
              maxLength="300"
              className="w-full ml-4 mb-4 p-2 rounded-md "
              defaultValue={""}
            />
          </div>
        </div>
        <div className="m-4">
          <label className="label " htmlFor="price">
            Price
          </label>
          <input
            name="price"
            type="number"
            placeholder={"00.00"}
            defaultValue={"0.00"}
            className="h-10 w-20 mx-2 rounded-md"
          />

          <label className="label w-16" htmlFor="quantity">
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            placeholder={1}
            defaultValue={1}
            className="h-10 w-16 mx-2 rounded-md"
          />

          <label className="label " htmlFor="VAT">
            VAT
          </label>
          <select name="vat" className="h-10 w-16 mx-2 rounded-md" defaultValue={0.2}>
            <option value={0} >
              0%
            </option>
            <option value={0.05} >
              5%
            </option>
            <option value={0.2}>
              20%
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
