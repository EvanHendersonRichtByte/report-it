export default function LoadingScreen({ show = false, customId = "loading" }) {
  return (
    <div
      id={customId}
      className={`loading-screen vh-100 position-absolute w-100 d-flex justify-content-center align-items-center ${
        !show && "d-none"
      }`}
    >
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
        <h3 className="ms-3 text-light fw-light">Loading</h3>
      </div>
    </div>
  );
}
