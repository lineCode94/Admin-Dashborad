import { useState, useEffect, useContext, useLayoutEffect } from "react";
import AdminServices from "../services/AdminServices";
import { AdminActions, AdminContext } from "../context/AdminContext";
// import { useHistory } from "react-router-dom";
export const useSubdomain = () => {
  const [isSub, setIsSub] = useState(false);
  const { dispatch } = useContext(AdminContext);
  // const history = useHistory();
  useLayoutEffect(() => {
    const location = window.location;
    let subDomain;
    // localhost |sub . localhost | www . iksib .com | www . sub . iksib .com
    const urlParts = location.host.split(".");

    let numberOfDomainParts;

    if (process.env.NODE_ENV === "development") numberOfDomainParts = 1;
    else if (urlParts[0] === "www") numberOfDomainParts = 3;
    else numberOfDomainParts = 2;
    // true if there's subDomain
    if (urlParts.length > numberOfDomainParts) {
      if (urlParts[0] === "www") {
        // www -> sub . iksib . com
        // urlParts.shift();
        subDomain = urlParts[1];
      } else {
        subDomain = urlParts[0];
      }

      //   if (
      //     urlParts[urlParts.length - 1] === "live" // 'com'
      //   ) {
      //     //my iksib
      //     // urlParts.pop();
      //   }
      //   urlParts.pop();
      //   sub
      //   const subDomain = urlParts.join(".");
      AdminServices.checkSubDomain(subDomain).then((res) => {
        if (res.status) {
          console.log(1);
          setIsSub(true);
          dispatch({ type: AdminActions.email, payload: res.data });
          localStorage.setItem("subDomain", subDomain);
        } else {
          // reconstruct the url
          // parts again
          urlParts.forEach((part) => part !== subDomain);
          window.location.href = `${location.protocol}//${urlParts.join(".")}`;
        }
      });
    } else {
      console.log("subdomain", subDomain);

      setIsSub(false);
    }
  }, []);

  return {
    isSub,
  };
};
