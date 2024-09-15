# REST Booking API Performance Testing using JMeter

This repository contains the performance testing of the **REST Booking API** using **Apache JMeter**. The project demonstrates the process of setting up and running performance tests on a RESTful API, generating reports, and analyzing the results to evaluate API scalability and performance under various load conditions.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Running the Tests](#running-the-tests)
- [Generating Reports](#generating-reports)
- [Test Scenarios](#test-scenarios)
- [Performance Test Techniques](#performance-test-techniques)
- [Summary and Findings](#summary-and-findings)
- [Contact](#contact)
- [License](#license)

---

## Overview

This project involves performance testing of the **REST Booking API**, hosted on `restful-booker.herokuapp.com`. The testing simulates different levels of concurrent user requests to evaluate the API’s performance metrics, such as response time, throughput, and error rates.

Key Metrics Evaluated:
- Concurrent requests ranging from **2700** to **3100**.
- Average Transactions per Second (TPS) across different load levels.
- Total concurrent API requests executed.
- Error rates and performance degradation at higher loads.

---

## Prerequisites

Before running the tests, ensure that the following software is installed on your system:

- **Apache JMeter**: Version 5.4.1 or later.
- **Java JDK**: JDK 8 or later, as JMeter requires Java.

---

## Installation

### Step 1: Download and Install Apache JMeter
1. Download the latest version of Apache JMeter from the official website: [Download JMeter](https://jmeter.apache.org/download_jmeter.cgi).
2. Extract the downloaded archive and add the JMeter `bin` directory to your system's PATH variable.

### Step 2: Verify Java Installation
Ensure that Java is installed correctly. You can verify it by running:
```bash
java -version
```
If Java is not installed, download and install it from: Oracle Java.

### Step 3: Verify JMeter Installation
You can verify JMeter installation by running the following command in the terminal:

```bash
jmeter -v
```
### Project Setup
- Place the JMX file in the JMeter bin directory: Copy your JMX file (bookapi_t2700.jmx) into the JMeter bin directory.

- Create a Report Folder: Inside the bin directory, create a folder called report to store the test results.
```bash
mkdir report
```
### Running the Tests
To execute the performance tests, follow these steps:

### 1. Run the JMeter test in Non-GUI Mode: Run the following command to execute the performance test and generate the .jtl report file:
```bash
jmeter -n -t bookapi_t2700.jmx -l report/bookapi_t2700.jtl

```
### 2. Generate HTML Report: Once the test is complete, generate an HTML report using the .jtl file:
```bash
jmeter -g report/bookapi_t2700.jtl -o report/bookapi_t2700.html

```
### 3. View the Report: Open the generated HTML report in a web browser to view detailed performance metrics:
```bash
open report/bookapi_t2700.html

```
### **Test Scenarios**
The performance test was executed with the following scenarios:

# 1. 2700 Concurrent Requests with 10 Loop Count:

- Avg TPS: ~178
- Total Requests: 16,200
# 2. 2800 Concurrent Requests with 10 Loop Count:

- Avg TPS: ~274
- Total Requests: 16,800
# 3. 3000 Concurrent Requests with 10 Loop Count:

- Avg TPS: ~222
- Total Requests: 18,000
# 4. 3100 Concurrent Requests with 10 Loop Count:

- Avg TPS: ~167
- Total Requests: 18,600
- Error Rate: 0.02% (4 requests resulted in connection timeout)

### Generating Reports
The generated report includes various key performance indicators such as:

- APDEX (Application Performance Index): Measures user satisfaction based on response times.
- Throughput: Shows how many requests were handled per second.
- Response Time: Distribution of response times for each request.
- Error Rate: Number of failed requests out of the total requests sent.
- Top Errors by Sampler: Lists the most common errors encountered during the test.

### Performance Test Techniques
The performance testing process involved evaluating the following aspects:

- Concurrent Users: Load tested with up to 3100 concurrent users to simulate real-world scenarios.
- Transactions per Second (TPS): Monitored to assess how many requests the server can handle per second.
- Response Time: Measured at each load level to evaluate server performance and responsiveness.
- Error Monitoring: Connection timeouts and other errors were monitored. At higher loads (3100 concurrent requests), a small error rate of 0.02% was observed due to connection timeouts.

### _Screenshots of result_
![image](https://github.com/user-attachments/assets/7fdb0a83-db73-4343-beb8-837d4c53d80e)
![image](https://github.com/user-attachments/assets/998f61eb-d998-4d28-ba43-6f2428bc485b)
![image](https://github.com/user-attachments/assets/e5afe041-06a2-4e2e-8e4d-151ed95d87e8)
![image](https://github.com/user-attachments/assets/2fc45e31-095e-4b86-966e-85763b9084d8)
![image](https://github.com/user-attachments/assets/83fa354a-2ff2-4630-b15e-1d88fc707922)
![image](https://github.com/user-attachments/assets/ab2e77cd-d16a-4a7f-bed4-c4aa33caed2d)


### Summary and Findings
- The REST Booking API can handle up to 2900 concurrent requests without any significant degradation in performance or errors.
- At 3100 concurrent requests, the server showed a slight increase in error rate (0.02%) due to connection timeouts.
- Optimal Load: Based on the results, the API can efficiently manage up to 2800 concurrent requests with an average TPS of 274 and minimal error rates.

## Authors

- [@abutalha](https://github.com/md-abutalha)


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/md-abutalha)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abu-talha1/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/abu_talha0x)
