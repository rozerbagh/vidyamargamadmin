import React from "react";
import ChartCards from "../components/Cards/ChartCards";
import UsersCharts from "../components/Charts/UsersCharts";
type HomeProps = {
  title: string,
}
const Home: React.FC<HomeProps> = ({ title }) => {
  return (
    <div className="charts">
      <ChartCards>
        <UsersCharts />
      </ChartCards>
      <ChartCards>
        <UsersCharts />
      </ChartCards>
      <ChartCards>
        <UsersCharts />
      </ChartCards>
      <ChartCards>
        <UsersCharts />
      </ChartCards>
    </div>
  )
}

export default Home