import React, { Component, Fragment } from "react";
import { gantt } from "dhtmlx-gantt";
import "../stylesheets/dhtmlxgantt_material.css";
import "../stylesheets/controls_styles.css";
import jsPDF from "jspdf";
import "../stylesheets/Gantt.css";

export default class Gantt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  genaratePDF = () => {
    var doc = new jsPDF("l", "pt", "a2");
    doc.html(document.querySelector("#ganttChart"), {
      callback: function (pdf) {
        pdf.save("Gantt_Chart.pdf");
      },
    });
  };
  componentDidMount() {
    //configure date
    gantt.config.xml_date = "%Y-%m-%d %H:%i";

    // ---------------------------------- gantt customization ----------------------------------
    //highlight weekends
    gantt.templates.scale_cell_class = function (date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
    };
    gantt.templates.timeline_cell_class = function (item, date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
    };

    // text in progress bar
    gantt.templates.progress_text = function (start, end, task) {
      return (
        "<span style='text-align:left;'>" +
        Math.round(task.progress * 100) +
        "% </span>"
      );
    };

    // Top date scale
    gantt.config.min_column_width = 50;
    gantt.config.scale_height = 90;

    var weekScaleTemplate = function (date) {
      var dateToStr = gantt.date.date_to_str("%d %M");
      var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
      return dateToStr(date) + " - " + dateToStr(endDate);
    };

    var daysStyle = function (date) {
      // you can use gantt.isWorkTime(date)
      // when gantt.config.work_time config is enabled
      // In this sample it's not so we just check week days

      if (date.getDay() === 0 || date.getDay() === 6) {
        return "weekend";
      }
      return "";
    };

    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "week", step: 1, format: weekScaleTemplate },
      { unit: "day", step: 1, format: "%D", css: daysStyle },
    ];

    //Quick info tab
    gantt.plugins({
      quick_info: true,
    });

    // ---------------------------------- gantt initialization ----------------------------------
    gantt.init(this.gantt_here);

    gantt.load("/data");

    var dp = gantt.createDataProcessor({
      url: "/data",
      mode: "REST-JSON",
    });
  }

  render() {
    return (
      <Fragment>
        <div className="gantt_control">
          <button
            className="btn btn-primary"
            onClick={this.genaratePDF}
            type="primary"
          >
            Download PDF
          </button>
        </div>
        <div
          id="ganttChart"
          ref={(input) => {
            this.gantt_here = input;
          }}
          style={{ width: "100%", height: "100%" }}
        ></div>
      </Fragment>
    );
  }
}
