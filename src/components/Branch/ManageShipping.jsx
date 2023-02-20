import { Input, Label } from "@windmill/react-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoAdd } from "react-icons/io5";
import RequestButton from "../Btns/RequestButton";
import CardWrapper from "../shared/CardWrapper";
import ErrorSpan from "../shared/ErrorSpan";
import { MultipleControlledSelect } from "../shared/SelectComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliveryItemSchema } from "../../Validation/CreateLocation";
import { Card } from "react-bootstrap";
import ShippingLocationsTable from "./ShippingLocationsTable";
//  NOTE ARGS : shippingCountryId  shippingGovernorateId []  shippingCityId[] cost

//what this component is doing?   all the  select is filtered before provided as options so the user can select from only the selected countries and governorate and so on...
// COMPLEX READ BEFORE EDIT
// Gets the gov array from the selected countries
const getGov = (country) => {
  const result = country?.opt?.governorate || [];
  return result;
};
// COMPLEX READ BEFORE EDIT
// Gets the cities array of options from selected Governorate s
const getCities = (gov, country) => {
  const citiesResult = [];
  // ig gov selected take cities options from them
  if (gov?.length) {
    gov?.forEach((v) => {
      v?.opt.city?.forEach((c) => {
        citiesResult.push(c);
      });
    });
    // else take it from the selected country
  } else if (country) {
    country?.opt?.governorate.forEach((gov) => {
      citiesResult.push(...gov.city);
    });
  }
  return citiesResult;
};
// Edge case handled when selecting a city can't clear countries before clearing governorate's and so on
// TODO
// EDGE CASE :can select country and then deselect it with the governorate's that in it select still
// Example select egypt , select cairo,deselect egypt , cairo still selected even though egypt is not selected
const ManageShipping = ({
  locations,
  loading,
  setValue,
  MainWatch,
  submitting,
}) => {
  const {
    formState: { errors },
    control,
    watch,
    handleSubmit,
    register,
    resetField,
    reset,
  } = useForm({
    resolver: yupResolver(deliveryItemSchema),
  });
  const [duplicatedCityError, setDuplicatedCityError] = useState(null);
  const shippingCountry = watch("shippingCountryId");
  const shippingGovernorate = watch("shippingGovernorateId");
  const delivery = MainWatch("delivery");
  // const shippingCities = watch("shippingCities");

  const handleAddShipping = (data) => {
    const newDelivery = {
      country_id: data.shippingCountryId.value,
      cities: data.shippingCityId.map((c) => ({
        id: c.value,
      })),
      shipping_cost: data.shipping_cost,
    };

    let isCityAlreadyDefined = false;
    delivery.forEach((dl) => {
      dl.cities.forEach((c) => {
        const val = newDelivery.cities.includes(c);
        if (val) {
          const city = data.shippingCityId.find((city) => city.value === c);
          isCityAlreadyDefined = true;
          setDuplicatedCityError({
            message: `${city.label}'s cost already defined`,
          });
          const track = setTimeout(() => {
            setDuplicatedCityError(null);
            clearTimeout(track);
          }, 3000);
        }
        return val;
      });
    });

    if (isCityAlreadyDefined) return;
    else setDuplicatedCityError(null);
    setValue(`delivery.${delivery.length}`, newDelivery, {
      shouldValidate: true,
    });
    resetField("shippingCountryId", { defaultValue: [], keepTouched: false });
    // console.log("data , delivery", data, delivery);
    reset();
  };
  const [gov, setGov] = useState([]);
  const [cities, setCities] = useState([]);
  // on country changes reset fields city & gov and regenerate the new options for each
  useEffect(() => {
    if (shippingCountry) {
      setCities(getCities(shippingGovernorate, shippingCountry));
      setGov(getGov(shippingCountry));
      resetField("shippingCityId", { defaultValue: [], keepTouched: false });
      resetField("shippingGovernorateId", {
        defaultValue: [],
        keepTouched: false,
      });
      resetField("shipping_cost", { keepTouched: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingCountry, resetField]);
  // on gov change regenerate the ne cities options
  useEffect(() => {
    if (shippingGovernorate)
      setCities(getCities(shippingGovernorate, shippingCountry));
    // setGov(getGov(shippingCountry));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingGovernorate]);

  return (
    <>
      <form onSubmit={handleSubmit(handleAddShipping)} className="w-full ">
        <CardWrapper>
          <div className="w-full flex flex-row flex-wrap justify-start p-2 ">
            <p className="text-gray-700 dark:text-gray-400 text-lg mb-4">
              Manage Shipping
            </p>
          </div>
          <div className="flex space-x-8 w-full">
            {/* FIXME can't Deselect country while it's cities and gov 's  are still selected  */}
            {/* Select country */}
            <MultipleControlledSelect
              multi={false}
              options={locations}
              getTitle={(opt) => opt?.country}
              getValue={(opt) => opt?.id}
              label="Countries you serve"
              registerName={"shippingCountryId"}
              error={errors.shippingCountryId}
              loading={loading}
              control={control}
              isClearable={
                !watch("shippingGovernorate")?.length &&
                !watch("shippingCityId")?.length
              }
            />
            {/* Select Governorate */}
            <MultipleControlledSelect
              options={gov}
              getTitle={(opt) => opt.title}
              getValue={(opt) => opt.id}
              control={control}
              label="Governorates you serve"
              registerName={"shippingGovernorateId"}
              error={errors.shippingGovernorateId}
              loading={loading}
              disabled={!watch("shippingCountryId")}
              // isClearable={!watch("shippingCities")}
            />
          </div>
          <div className="flex space-x-8 w-full">
            {/*Select City */}
            <MultipleControlledSelect
              options={cities}
              getTitle={(opt) => opt.title}
              getValue={(opt) => opt.id}
              control={control}
              label="Cities you serve"
              registerName={"shippingCityId"}
              error={errors.shippingCityId}
              loading={loading}
              disabled={!watch("shippingCountryId")}
              isClearable={true}
            />

            <div className="flex h-full flex-col space-y-4  w-full ">
              <Label htmlFor={"shippingFee"}>
                <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                  Fee
                </span>
                <Input
                  placeholder={"Fee amount"}
                  disabled={!watch("shippingCountryId")}
                  type="text"
                  id={"shippingFee"}
                  {...register(`${"shipping_cost"}`, { required: true })}
                  className="h-10 mt-2 text-base rounded-md p-2 dark:bg-gray-700 focus:outline-none block  border focus:ring-blue-500 w-full bg-gray-100  focus:bg-white dark:focus:border-blue-500"
                />
                <ErrorSpan error={errors.shipping_cost} />
              </Label>
            </div>
          </div>
          <div className="w-full">
            <ErrorSpan error={duplicatedCityError} />
          </div>
          <div className="flex max-w-screen-md w-full flex-row-reverse mx-auto py-4 ">
            <RequestButton
              loading={submitting}
              type="submit"
              // className="h-12 px-6"
              // className="h-12 px-4 w-1/2 mx-auto"
              className="w-full -mt-4  px-6 h-12 "
            >
              <IoAdd className="text-base" />
              Add Shipping
            </RequestButton>
          </div>
        </CardWrapper>
      </form>
      {delivery.length !== 0 && (
        <div className="w-full">
          <CardWrapper>
            <div className="w-full mb-2 text-lg dark:text-gray-300 text-gray-700">
              Shipping Fees
            </div>
            <ShippingLocationsTable delivery={delivery} locations={locations} />
          </CardWrapper>
        </div>
      )}
    </>
  );
};
export default ManageShipping;
