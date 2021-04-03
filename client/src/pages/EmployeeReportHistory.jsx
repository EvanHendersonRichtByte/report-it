import axios from "axios";
import { useEffect, useState } from "react";
import NoImg from "../assets/img/ImgUnavailable.jpg";
import pageAuth from "../handler/pageAuth";
export default function ReportHistory() {
  const [state, setState] = useState([]);
  useEffect(() => {
    pageAuth("Employee");
    const url = "/complaint/";
    const employeeUrl = "/user/";
    axios
      .get(url)
      .then(({ data }) => {
        const initialData = data.filter((data) => {
          return data.finished !== false;
        });
        initialData.forEach((data, index) => {
          axios
            .get(employeeUrl + data.employee_id)
            .then(({ data: employeeData }) => {
              initialData[index]["employeeName"] = employeeData.username;
              setState(initialData);
            });
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleImage = (attachment, title) => {
    switch (attachment) {
      case "undefined":
        return <img src={NoImg} alt={title} className="img-fluid" />;
      case "null":
        return <img src={NoImg} alt={title} className="img-fluid" />;
      default:
        return (
          <img src={`/image/${attachment}`} alt={title} className="img-fluid" />
        );
    }
  };

  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Author</th>
          <th scope="col">Destination Instance</th>
          <th scope="col">Attachment</th>
        </tr>
      </thead>
      <tbody>
        {state &&
          state.map((data, index) => {
            return (
              <tr key={index}>
                <th scope="row" className="col-1">
                  {index + 1}
                </th>
                <td className="col-2">{data.title}</td>
                <td className="col-2">{data.description}</td>
                <td className="col-1">{data.author.username}</td>
                <td className="col-2">{data.destInstance}</td>
                <td className="col-1">
                  {handleImage(data.attachment, data._id)}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
