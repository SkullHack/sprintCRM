import React from "react";

const EditProject = () => {
  return (
    <div>
      <div className="my-2">
        <div className="row">
          <div className="col-12">
            <form noValidate>
              <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                  <div className="text-secondary">Project Name</div>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control"
                      name="projectName"
                      placeholder="Project Name"
                    />
                  </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3">
                  <div className="text-secondary">Project Key</div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="projectKey"
                      placeholder="Key"
                    />
                  </div>
                </div>
                <div className="col-3">
                  <div className="text-secondary">Project Type</div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="projectType"
                      placeholder="Type"
                    />
                  </div>
                </div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-6">
                  <div className="text-secondary">Project Category</div>
                  <input
                    className="form-control "
                    list="datalistOptions"
                    name="projectCategory"
                    placeholder="Category"
                  />
                  <datalist id="datalistOptions">
                    <option value="Web App" />
                    <option value="Mobile App" />
                    <option value="Website" />
                    <option value="Windows Application" />
                    <option value="QA" />
                  </datalist>
                </div>
                <div className="col-3"></div>

                <div className="col-3"></div>
                <div className="col-3 my-5">
                  <button type="submit" className="btn btn-warning">
                    Update Project
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
