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
import "react-tiny-fab/dist/styles.css";
import csvFilePath from "../../constants/Credit_Card_Data_cleaned.csv"; // Import CSV file

const steps = [
  "Data Ingestion",
  "Data Processing",
  "Explorative Data Analytics",
  "Model Development",
  "Model Validation",
  "Usecase Output"
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
  const [csvFileData, setCsvFileData] = useState(null);

  async function  fileGet(){
    
const res = await fetch("https://api.escuelajs.co/api/v1/files/ba73.csv");
console.log(await res.json())
  }

  const handleLoadCsvClick = async () => {
    setLoading(true);
    setErrorMessage("");
    try {

      const response = await fetch(csvFilePath, { responseType: "blob" });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        Papa.parse(event.target.result, {
          header: true,
          complete: (results) => {
            setCsvData(results.data);
            setLoading(false);
            setSuccessMessage("Data loaded successfully!");
          },
          error: (error) => {
            setLoading(false);
            setErrorMessage(`Error parsing CSV data: ${error.message}`);
          },
        });
      };
      const blob = await response.blob();
      console.log(blob);
      reader.readAsText(blob);
      setCsvFileData(blob);
    } catch (error) {
      setLoading(false);
      setErrorMessage(`Error loading CSV data: ${error.message}`);
    }
  };

  const handleNewUserMessage = (newMessage) => {
    // Handle chatbot messages here
    console.log(`New message incoming! ${newMessage}`);
    addResponseMessage("This is a response from the bot.");
  };

  const nextStep = () => {
    if (currentStep === 0 && csvData) {
      // Send data to API before moving to the next step
      // sendDataToApi(csvFileData)
      //   .then(() => {
          setCurrentStep(currentStep + 1);
        // })

        // .catch((error) => {
        //   setErrorMessage("Failed to send data to the API.");
        //   console.error("Error sending data to the API:", error);
        // });
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
    if (csvFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", csvFile);
  
      fetch("http://localhost:3001/data_processing", {
        method: "POST",
        body: formData,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          setCsvData(data);
          setLoading(false);
          setSuccessMessage("CSV file loaded and processed successfully!");
        })
        .catch(error => {
          setLoading(false);
          setErrorMessage(`Error uploading file: ${error.message}`);
        });
    } else {
      setErrorMessage("Please select a CSV file to upload.");
    }
  };
  

  // const handleStartClick = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     Papa.parse(csvFile, {
  //       complete: (result) => {
  //         setCsvData(result.data);
  //         setLoading(false);
  //         setSuccessMessage("CSV file loaded successfully!");
  //       },
  //       header: true,
  //     });
  //   }, 300);
  // };

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
    const res = await fetch("https://api.escuelajs.co/api/v1/files/ba73.csv");
// console.log(await res.text())
// fetch("https://orion-http.gw.postman.co/v1/request", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjljMDg4OTFjLWQ0MGMtNDM2OS1hMDJiLTRkNmIyMWVlOTU1OCIsInVzZXJJZCI6MjEwMzA0NjcsInRlYW1JZCI6MCwiaXYiOiJtWHV1WVZlS2tLOWJVbmREb1pJZS93PT0iLCJhbGdvIjoiYWVzLTEyOCIsImlhdCI6MTcyMTY3NDYzMywiZXhwIjoxNzIxNjc2NDMzfQ.MyXfJruZd2uEkRIGxrniZPGqbmNyq_3HUBZSOjTT0gw",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundarye7tVA5KgHy3pH0Vz",
//     "pm-h0": "User-Agent=PostmanRuntime/7.40.0, Accept=*/*, Cache-Control=no-cache, Postman-Token=15e06fa2-92e6-4b58-bed5-d7e83113d66b, Host=65.2.162.222:5000, Accept-Encoding=gzip%2C deflate%2C br, Connection=keep-alive",
//     "pm-o0": "method=GET, timings=true, timeout=180000, rejectUnauthorized=false",
//     "pm-u": "http://65.2.162.222:5000/data_processing",
//     "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site"
//   },
//   "referrer": "https://web.postman.co/workspace/My-Workspace~dafadaf4-82d9-4624-8174-c5032543fbde/request/21030467-6d7b5023-49a4-4899-a74e-1195f608cb0c?tab=body",
//   "referrerPolicy": "no-referrer-when-downgrade",
//   "body": "------WebKitFormBoundarye7tVA5KgHy3pH0Vz\r\nContent-Disposition: form-data; name=\"file\"; filename=\"Credit_Card_Data_cleaned.csv\"\r\nContent-Type: text/csv\r\n\r\n\r\n------WebKitFormBoundarye7tVA5KgHy3pH0Vz--\r\n",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
// fetch("http://localhost:3001/data_processing", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "multipart/form-data;",
//     "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Microsoft Edge\";v=\"126\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-site"
//   },
//   "referrer": "http://localhost:3000/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "------WebKitFormBoundarynbHWJziaooltcm9y\r\nContent-Disposition: form-data; name=\"file\"; filename=\"blob\"\r\nContent-Type: text/csv\r\n\r\n---------content---------\r\n\r\n------WebKitFormBoundarynbHWJziaooltcm9y--\r\n",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });
    let formData = new FormData();
    const blob =await res.blob()
    const file = new File([blob], "Credit_Card_Data_cleaned.csv",{type:"text/csv"})
    formData.append("file", file,);
    const response = await fetch("http://65.2.162.222:5000/data_processing", {
      method: "POST",
      headers:{
        "content-type": "multipart/form-data;",
      },
      body: formData,
      // referrer: 'https://your-website.com/', // Change the referrer
      referrerPolicy: 'no-referrer', // Modify the referrer policy

      // body: data,
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
    {/* <button onClick={()=>fileGet()}>File get</button>
    <form
            action=""
            onSubmit={async (e, ...rest) => {
              e.preventDefault();
              let formData = new FormData(e.target);
              const response = await fetch("http://localhost:3001/data_processing", {
                method: "POST",
                headers:{
                  "content-type": "multipart/form-data;",
                },
                body: formData,
          
          
                // body: data,
              });
              console.log(e, rest);
            }}
          >
            <input type="file" name="file" id="" />
            <input type="submit" />
          </form> */}
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
          <div className="d-flex justify-content-between align-items-center">
            <h3>{steps[currentStep]}</h3>
            {currentStep === 0 && <Button onClick={handleLoadCsvClick} className="mt-3">
              Load CSV Data
            </Button>}
          </div>
          {currentStep === 0 && (
            <>
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
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="Chat Widget"
        subtitle="Ask me anything"
      />
    </Container>
  );
};

export default Stepper;
