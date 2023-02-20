import {
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Table,
  Button,
} from "@windmill/react-ui";

const StoresTable = ({ stores }) => {
  const gotToSubdomain = (subDomain) => {
    let urlParts = window.location.host.split(".");
    urlParts = urlParts.map((p) => {
      if (p.startsWith("localhost")) {
        return `${subDomain}.${p}`;
      } else if (p !== "www") {
        return p;
      } else {
        return subDomain;
      }
    });
    const protocol = window.location.protocol;
    const url = `${protocol}//${urlParts.join(".")}/login`;
    // console.log(url);
    // window.location.href = url;
    return url;
  };
  return (
    <TableContainer className="mb-8 w-full">
      <Table className="w-full  text-start">
        <TableHeader>
          <tr className="text-start">
            <TableCell>Store NAME</TableCell>
            <TableCell>Primary Domain</TableCell>
            <TableCell className="text-center">ACTIONS</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {stores?.map((store) => {
            return (
              <TableRow key={store.domain}>
                <TableCell>{store.store_name}</TableCell>
                <TableCell>{`${store.domain}.myiksib.com`}</TableCell>
                <TableCell>
                  <a href={gotToSubdomain(store.domain)}>
                    <Button
                      onClick={() => gotToSubdomain(store)}
                      className="w-full"
                    >
                      Manage
                    </Button>
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StoresTable;
