// Stepper.js
import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ProgressBar,
  Nav,
  Spinner,
  Alert,
} from "react-bootstrap";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import "./Stepper.css";
const steps = [
  "Data Ingestion",
  "Data Processing",
  "Data Modalling",
  "Final Step",
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      setErrorMessage('Please upload a valid CSV file.');
      return;
    }
    if (acceptedFiles.length > 0) {
      setCsvFile(acceptedFiles[0]);
      setCsvData(null); // Reset any previously loaded data
      setSuccessMessage('');
      setErrorMessage('');
    }
  }, []);

  const handleFileUpload = (event) => {
    setCsvFile(event.target.files[0]);
    setCsvData(null); // Reset any previously loaded data
    setSuccessMessage("");
  };

  const handleStartClick = () => {
    setLoading(true);
    setTimeout(() => {
      Papa.parse(csvFile, {
        complete: (result) => {
          setCsvData(result.data);
          setLoading(false);
          setSuccessMessage("CSV file loaded successfully!");
        },
        header: true,
      });
    }, 300);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "text/csv,application/vnd.ms-excel",
    multiple: false,
  });

  return (
    <Container>
      <Row>
        <Col>
          <ProgressBar now={((currentStep + 1) / steps.length) * 100} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav justify variant="underline" defaultActiveKey={currentStep}>
            {steps.map((step, index) => (
              <Nav.Item key={index}>
                <Nav.Link active={index === currentStep}>{step}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>{steps[currentStep]}</h3>
          {currentStep === 0 && (
            <>
              {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload CSV file</Form.Label>
                <Form.Control
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                />
              </Form.Group> */}
              <div
                {...getRootProps()}
                className="dropzone p-5 border border-secondary text-center"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop a CSV file here, or click to select one</p>
                )}
              </div>
              {csvFile && (
                <Button
                  className="mt-3"
                  size="sm"
                  variant="primary"
                  onClick={handleStartClick}
                >
                  Start
                </Button>
              )}
              {errorMessage && (
                <Alert variant="danger" className="mt-3">
                  {errorMessage}
                </Alert>
              )}
              {loading && (
                <div className="d-flex justify-content-center mt-3">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
              {csvData && (
                <div className="mt-3">
                  <h5>CSV Data:</h5>
                  <pre>{JSON.stringify(csvData, null, 2)}</pre>
                  {/* <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div> */}
                  <Alert variant="success">{successMessage}</Alert>
                </div>
              )}
            </>
          )}
          {currentStep !== 0 && <p>Content for {steps[currentStep]}</p>}
        </Col>
      </Row>
      <div className="mt-4 d-flex justify-content-end">
        <Button
          variant="secondary"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          className="ms-2"
          variant="primary"
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Stepper;
