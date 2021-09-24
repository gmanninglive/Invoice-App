// Function to sort Customers Array
export function sortCustomers(sortBy, customers){

    // Sort Alphabetically by Firstname
    if (sortBy === "first_nameASC") {
        customers.sort((a, b) => {
        let fa = a.first_name.toLowerCase(),
            fb = b.first_name.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
        });
        return customers;
    } 
    else if (sortBy === "first_nameDESC") {
      customers.sort((a, b) => {
      let fa = a.first_name.toLowerCase(),
          fb = b.first_name.toLowerCase();

      if (fa > fb) {
          return -1;
      }
      if (fa < fb) {
          return 1;
      }
      return 0;
      });
      return customers;
  } 
  if (sortBy === "sur_nameASC")
   {
    // Sort Alphabetically by Surname
    customers.sort((a, b) => {
      let fa = a.sur_name.toLowerCase(),
        fb = b.sur_name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    return customers;
  }
  else if (sortBy === "sur_nameDESC")
   {
    // Sort Alphabetically by Surname
    customers.sort((a, b) => {
      let fa = a.sur_name.toLowerCase(),
        fb = b.sur_name.toLowerCase();

      if (fa > fb) {
        return -1;
      }
      if (fa < fb) {
        return 1;
      }
      return 0;
    });
    return customers;
  }
}