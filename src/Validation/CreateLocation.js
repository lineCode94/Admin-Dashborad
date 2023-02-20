import * as yup from "yup";
const req = (name) => `${name} is required!`;
const type = (name, type) => `Invalid ${type}`;

export const deliveryItemSchema = yup.object({
  shippingCountryId: yup
    .object()
    .typeError(type("country", "country"))
    .required(req("Shipping country")),
  shippingGovernorateId: yup
    .array()
    .of(yup.object({ value: yup.number() }))
    .typeError(type("Governorate", "Governorate"))
    .notRequired(),
  shippingCityId: yup
    .array()
    .of(yup.object({ value: yup.number() }))
    .typeError(type("city", "city"))
    .notRequired(),
  shipping_cost: yup
    .number()
    .typeError(type("Fee", "number"))
    .required(req("Fee")),
});
export const createLocationSchema = yup.object().shape({
  // title address city_id country_id dine in pickable shipping phone
  title: yup.string().typeError(type("Name", "string")).required(req("Name")),
  country_id: yup.number().required(req("country")),
  city_id: yup.number().required(req("city")),
  address: yup
    .string()
    .typeError(type("Address", "string"))
    .required(req("address")),
  phone: yup.number().typeError(type("phone", "number")).required(),
  // Validating that business type is have at least one value
  dine_in: yup
    .number()
    .test(
      "oneOfRequired",
      "At least one of the three fields need to be marked.",
      function (item) {
        return (
          this.parent.dine_in ||
          [
            this.parent.dine_in,
            this.parent.pickable,
            this.parent.shipping,
          ].filter((e) => e === undefined).length <= 1
        );
      }
    )
    .default(0)
    .notRequired(),
  pickable: yup
    .number()
    .typeError(type("pick up", "business type"))
    .test(
      "oneOfRequired",
      "At least one of the three fields need to be marked.",
      function (item) {
        return (
          this.parent.pickable ||
          [
            this.parent.dine_in,
            this.parent.pickable,
            this.parent.shipping,
          ].filter((e) => e === undefined).length <= 1
        );
      }
    )
    .default(0)
    .notRequired(),
  shipping: yup
    .number()
    .typeError(type("shipping", "business type"))
    .test(
      "oneOfRequired",
      "At least one of the three fields need to be marked.",
      function (item) {
        return (
          this.parent.shipping ||
          [
            this.parent.dine_in,
            this.parent.pickable,
            this.parent.shipping,
          ].filter((e) => e === undefined).length <= 1
        );
      }
    )
    .default(0)
    .notRequired(),
  //new
  delivery: yup
    .array()
    .typeError(type("delivery", "business type"))
    .of(
      yup.object({
        country_id: yup.number().required(),
        cities: yup
          .array()
          .of(yup.object({ id: yup.number() }))
          .required(),
        shipping_cost: yup.number().required(),
      })
    )
    .required("Please add delivery locations & cost..."),
  number_of_tables: yup
    .number()
    .typeError(type("dine in tables", "number"))
    .notRequired(),
});
