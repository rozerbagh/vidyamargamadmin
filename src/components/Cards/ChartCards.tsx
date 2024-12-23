import React from "react";
import { HOCProps } from "../../Interfaces/PagesInterfaces";
const ChartCards: React.FC<HOCProps> = (props) => {
  return <div className="card">{props.children}</div>;
};

export default ChartCards;
