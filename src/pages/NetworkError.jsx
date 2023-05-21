import React, { useEffect } from "react";
import { toast } from "react-toastify";

const NetworkError = () => {
  useEffect(() => {
    toast.warn("You are offline at the moment");
  }, []);

  return <div>NetworkError</div>;
};

export default NetworkError;
