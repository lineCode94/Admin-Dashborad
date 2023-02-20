import {
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import React from "react";
import { Table } from "react-bootstrap";

const ShippingLocationsTable = ({ delivery, locations }) => {
  //   debugger;
  // Country:name , fee:00,cities:name1.name2,name3
  const data = delivery.map((d) => {
    const country = locations.find((c) => c.id === d.country_id);
    let cities = [];
    country.governorate.forEach((gov) => {
      gov.city.forEach((c) => {
        if (d.cities.includes(c.id)) {
          cities.push(c.title);
        }
      });
    });
    return {
      country: country.country,
      cities: cities.join(","),
      fee: d.shipping_cost,
    };
  });

  return (
    <TableContainer className="mb-8 w-full">
      <Table className="w-full  text-start">
        <TableHeader>
          <tr className="text-start">
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell className="text-center">Delivery fees</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {data?.map((loc) => {
            return (
              <TableRow key={loc.country}>
                <TableCell>{loc.country}</TableCell>
                <TableCell className="overflow-hidden whitespace-no-wrap">
                  {loc.cities}
                </TableCell>
                <TableCell>{loc.fee}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShippingLocationsTable;
