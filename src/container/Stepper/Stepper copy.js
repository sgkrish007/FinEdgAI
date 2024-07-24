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
  Table,
  Pagination,
  Form,
} from "react-bootstrap";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

const steps = [
  "Data Ingestion",
  "Data Processing",
  "Explorative Data Analytics",
  "Model Development",
  "Final Step",
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [csvFile, setCsvFile] = useState(null);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleNewUserMessage = (newMessage) => {
    // Handle chatbot messages here
    console.log(`New message incoming! ${newMessage}`);
    addResponseMessage("This is a response from the bot.");
  };

  // const nextStep = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };
  const nextStep = () => {
    if (currentStep === 0 && csvData) {
      // Send data to API before moving to the next step
      sendDataToApi(csvData)
        .then(() => {
          setCurrentStep(currentStep + 1);
        })

        .catch((error) => {
          setErrorMessage("Failed to send data to the API.");
          console.error("Error sending data to the API:", error);
        });
    } else if (currentStep < steps.length - 1) {
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
      setErrorMessage("Please upload a valid CSV file.");
      return;
    }
    if (acceptedFiles.length > 0) {
      setCsvFile(acceptedFiles[0]);
      setCsvFileName(acceptedFiles[0].name);
      setCsvData(null); // Reset any previously loaded data
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, []);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const sendDataToApi = async (data) => {
    const response = await fetch("http://localhost:3001/api/data_processing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // console.log("sendDataToApi", response);
    return response.json();
  };

  const renderPaginationItems = () => {
    const pageCount = Math.ceil(csvData.length / rowsPerPage);
    const items = [];

    if (pageCount <= 5) {
      for (let i = 1; i <= pageCount; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      if (currentPage > 3) {
        items.push(
          <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
            1
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(pageCount, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < pageCount - 2) {
        items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        items.push(
          <Pagination.Item
            key={pageCount}
            onClick={() => handlePageChange(pageCount)}
          >
            {pageCount}
          </Pagination.Item>
        );
      }
    }

    return items;
  };

  const paginatedData = csvData
    ? csvData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : [];

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
              <div {...getRootProps()} className="dropzone p-5 text-center">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop a CSV file here, or click to select one</p>
                )}
              </div>
              {csvFileName && (
                <div className="mt-3">
                  <strong>Selected file:</strong> {csvFileName}
                </div>
              )}
              {csvFile && (
                <Button
                  variant="primary"
                  onClick={handleStartClick}
                  className="mt-3"
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
                  <div className="overflow-auto">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          {Object.keys(csvData[0]).map((header, index) => (
                            <th className="text-nowrap" key={index}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.values(row).map((cell, cellIndex) => (
                              <td key={cellIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <Form.Group
                      controlId="rowsPerPage"
                      className="d-flex align-items-center"
                    >
                      <Form.Label className="text-nowrap me-2">
                        Rows per page:
                      </Form.Label>
                      <Form.Control
                        as="select"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                      >
                        {[10, 20, 30, 40, 50].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Pagination className="mb-0">
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      {renderPaginationItems()}
                      <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(csvData.length / rowsPerPage)
                        }
                      />
                      <Pagination.Last
                        onClick={() =>
                          handlePageChange(
                            Math.ceil(csvData.length / rowsPerPage)
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(csvData.length / rowsPerPage)
                        }
                      />
                    </Pagination>
                  </div>
                  <Alert variant="success">{successMessage}</Alert>
                  <div className="mt-3">
                    <p>Total Data Rows: {csvData.length - 1}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </Col>
      </Row>
      {/* <Fab
        mainButtonStyles={{ backgroundColor: 'red' }}
        icon={<i className="fas fa-comment"></i>}
        onClick={() => console.log('FAB clicked!')}
      /> */}
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat Widget"
        subtitle="Ask me anything"
      />
    </Container>
  );
};

export default Stepper;
