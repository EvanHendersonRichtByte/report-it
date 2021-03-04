export default function Report() {
  return (
    <div className="container-fluid pt-4 min-vh-100">
      <div className="row">
        <div className="col-md-2 border-end">
          <h5 className="text-center border-bottom pb-3">Reports</h5>
          <div className="row">
            <button className="btn btn-transparent d-flex justify-content-between">
              <p className="d-inline-block">Report List</p>
              <span className="d-inline-block ms-auto">{">"}</span>
            </button>
          </div>
        </div>
        <div className="col-md-10">
          <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="d-inline mb-0">
                Air Kran Mati{" "}
                <span className="badge bg-primary ms-2">In Progress</span>
              </p>
              <a href="/detail/" className="btn btn-sm btn-outline-primary">
                Detail
              </a>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="d-inline mb-0">
                Air Kran Mati{" "}
                <span className="badge bg-success ms-2">Approved</span>
              </p>
              <a href="/detail/" className="btn btn-sm btn-outline-primary">
                Detail
              </a>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body d-flex justify-content-between align-items-center">
              <p className="d-inline mb-0">
                Air Kran Mati{" "}
                <span className="badge bg-danger ms-2">Disapproved</span>
              </p>
              <a href="/detail/" className="btn btn-sm btn-outline-primary">
                Detail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
