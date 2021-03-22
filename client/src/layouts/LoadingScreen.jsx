export default function LoadingScreen({ show }) {
  if (show === true) {
    return (
      <div className="loading-screen vh-100 position-fixed w-100 d-flex justify-content-center align-items-center">
        <div className="col-md-2 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
          <h3 className="ms-3 text-light fw-light">Loading</h3>
        </div>
      </div>
    );
  } else {
    return " ";
  }
}
