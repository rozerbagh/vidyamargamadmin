import React from "react";
import useFetch from "../../hooks/useFetch";
type SchoolDetailsProps = {
  title: string,
}
const SchoolsListing: React.FC<SchoolDetailsProps> = ({ title }) => {
  const {loading} = useFetch();
  return <h1>{title}</h1>
}

export default SchoolsListing