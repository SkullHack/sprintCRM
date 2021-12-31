import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

let source;

export default class Charts extends Component {
  //defining state
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "apexchart-example",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "",
          data: [],
        },
        // {
        //   name: 'Team B',
        //   data: [10, 70, 35, 55, 49, 80, 70, 55, 12]
        // },
      ],
    };
  }

  //to get project and its repective stages and update the apex charts
  async componentDidMount() {
    this.source = axios.CancelToken.source();

    //geting all the projects
    await axios
      .get("http://localhost:5000/api/projects", {
        cancelToken: this.source.token,
      })
      .then((Response) => {
        const data = ([] = Response.data.projects);
        var todo = 0;
        var inprogress = 0;
        var done = 0;
        const emp_name = [];
        const projectID = [];
        const project_name = [];
        const todoARR = [];
        const inProgressArr = [];
        const readyArr = [];

        data.forEach((element) => {
          project_name.push(element.projectName);
          projectID.push(element._id);

          //getting stages for the respective project
          axios
            .get(
              `http://localhost:5000/api/auth/stages/findproject/projectId?id=${element._id}`
            )
            .then((Response2) => {
              const data2 = Response2.data.stage;

              data2.forEach((element2) => {
                if (element2.status == "TO-DO") {
                  todo = todo + 1;
                }
                if (element2.status == "IN-PROGRESS") {
                 
                  inprogress = inprogress + 1;
                }

                if (element2.status == "READY") {
                  done = done + 1;
                }
              });

              todoARR.push(todo);
              inProgressArr.push(inprogress);
              readyArr.push(done);
              todo = 0;
              inprogress = 0;
              done = 0;
            });
        });

        this.setState({
          options: {
            chart: {
              id: "apexchart-example",
            },
            xaxis: {
              categories: project_name,
            },
          },
          series: [
            {
              name: "Todo stages",
              data: todoARR,
            },
            { name: "In progress stages", data: inProgressArr },

            { name: "Completed stages", data: readyArr },
          ],
        });
        //optional
        window.dispatchEvent(new Event("resize"));
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  componentWillUnmount() {
    this.source.cancel("Axios request canceled.");
  }

  render() {
    return (
      <center>
        <div>
          {/* We can change the type by simply typing "line" */}
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width={1000}
            height={520}
          />
        </div>
      </center>
    );
  }
}
