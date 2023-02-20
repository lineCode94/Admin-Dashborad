export const locations = {
  data: [
    {
      id: 1,
      country: "Judy Abernathy",
      governorate: [
        {
          id: 1,
          title: "Chandler Hagenes",
          city: [
            {
              id: 1,
              title: "Gracie Koepp",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      country: "Nicolette Glover Jr.",
      governorate: [
        {
          id: 2,
          title: "Shyann Thompson",
          city: [
            {
              id: 2,
              title: "Fausto Williamson IV",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      country: "Dexter Mertz",
      governorate: [
        {
          id: 3,
          title: "Tomasa Kshlerin",
          city: [
            {
              id: 3,
              title: "Deonte Stoltenberg",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      country: "Dr. Sophie Kuhn",
      governorate: [
        {
          id: 4,
          title: "Mrs. Rosetta Toy",
          city: [
            {
              id: 4,
              title: "Prof. Vanessa Welch",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      country: "Alena Pollich III",
      governorate: [
        {
          id: 5,
          title: "Salvador Emard",
          city: [
            {
              id: 5,
              title: "Miss Janae Borer",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      country: "Kenny Skiles",
      governorate: [
        {
          id: 6,
          title: "Gudrun Klein",
          city: [
            {
              id: 6,
              title: "Vito Carter",
            },
          ],
        },
      ],
    },
    {
      id: 7,
      country: "Prof. Junior Jacobi",
      governorate: [
        {
          id: 7,
          title: "Yasmin Bradtke",
          city: [
            {
              id: 7,
              title: "Evelyn Rowe",
            },
          ],
        },
      ],
    },
    {
      id: 8,
      country: "Prof. Armando Bode I",
      governorate: [
        {
          id: 8,
          title: "Augustine Wiza",
          city: [
            {
              id: 8,
              title: "Antonietta Aufderhar IV",
            },
          ],
        },
      ],
    },
  ],
  msg: "All Locations",
  status: true,
  code: 200,
};
export const Branch = {
  data: {
    id: 1,
    title: "Cali Rath DDS",
    address:
      "Voluptas sint facilis officiis suscipit quia. Repudiandae hic eos dolores ea deleniti maxime.",
    phone: "01061851679",
    dine_in: 1,
    number_of_tables: "35",
    pickable: 0,
    shipping: 0,
    country_id: 1,
    city_id: 1,
    stock_quantity: 17058,
  },
  msg: "Branch",
  status: true,
  code: 200,
};
export const createBranchFormData = {
  dineTablesNumber: 5,
  shippingCities: [
    {
      value: 1,
      label: "Gracie Koepp",
      opt: {
        id: 1,
        title: "Gracie Koepp",
      },
    },
  ],
  shippingGovernorate: [
    {
      value: 1,
      label: "Chandler Hagenes",
      opt: {
        id: 1,
        title: "Chandler Hagenes",
        city: [
          {
            id: 1,
            title: "Gracie Koepp",
          },
        ],
      },
    },
  ],
  shippingCountries: [
    {
      value: 1,
      label: "Judy Abernathy",
      opt: {
        id: 1,
        country: "Judy Abernathy",
        governorate: [
          {
            id: 1,
            title: "Chandler Hagenes",
            city: [
              {
                id: 1,
                title: "Gracie Koepp",
              },
            ],
          },
        ],
      },
    },
  ],
  shipping: 1,
  pickable: 0,
  dine_in: 1,
  phone: 1228584440,
  address: "address",
  city_id: 1,
  country_id: 1,
  title: "name",
  governorate_id: "1",
};
