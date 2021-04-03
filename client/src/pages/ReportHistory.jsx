import axios from "axios";
import { useEffect, useState } from "react";
import NoImg from "../assets/img/ImgUnavailable.jpg";
import pageAuth from "../handler/pageAuth";
export default function ReportHistory() {
  const [state, setState] = useState({
    userId: JSON.parse(sessionStorage.getItem("id")),
    complaints: [],
  });
  useEffect(() => {
    pageAuth("User");
    const userComplaintUrl = `/user/${state.userId}/complaint`;
    axios
      .get(userComplaintUrl)
      .then(({ data: complaints }) => {
        complaints = complaints.filter((data) => data.finished);
        setState((state) => ({ ...state, complaints }));
      })
      .catch((err) => console.log(err));
  }, [state.userId]);

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
          <th scope="col">Status</th>
          <th scope="col">Destination Instance</th>
          <th scope="col">Attachment</th>
        </tr>
      </thead>
      <tbody>
        {state &&
          state.complaints.map((data, index) => {
            return (
              <tr key={index}>
                <th scope="row" className="col-1">
                  {index + 1}
                </th>
                <td className="col-2">{data.title}</td>
                <td className="col-2">{data.description}</td>
                <td className="col-1">{data.status}</td>
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
