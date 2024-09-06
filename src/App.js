import './App.css';
import { useState } from 'react';
import { WebApimanager } from './WebApIManager';

function App() {
  const [drawingFileNameError, setDrawingFileNameError] = useState("");
  const [drawingFileName, setDrawingFileName] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false); 
  let webApi = new WebApimanager();

  const handleChange = (e) => {
    const { files } = e.target;
    setDrawingFileName(files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const { files } = e.dataTransfer;
    setDrawingFileName(files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!drawingFileName) {
      setDrawingFileNameError("Please upload a file.");
      return;
    }

    // Clear any existing error
    setDrawingFileNameError("");
    setLoading(true);

    const drawingFile = new FormData();
    drawingFile.append("image", drawingFileName);

    try {
      await webApi.imagePost(`api/scan/image`, drawingFile);
    } catch (error) {
      console.error("File upload failed", error);
    }

    // Stop loading after the response
    setLoading(false);

  };

  return (
    <div className="App">
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="upload-area">
          <label className="fs-10 fw-bold text-start py-2">
            Upload content
            <span style={{ color: "red" }}>*</span>
          </label>

          <div
            className={`drop-zone ${dragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>Drag and drop files</p>
            <p>or click to select files</p>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              id="drawingFileName"
              name="drawingFileName"
              onChange={handleChange}
              className="file-input"
            />
          </div>

          {drawingFileName && <p className="file-name">File: {drawingFileName.name}</p>}
          {drawingFileNameError && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {drawingFileNameError}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default App;
