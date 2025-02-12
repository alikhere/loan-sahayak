# Loan Sahayak

Loan Sahayak is a web application developed to predict whether a person is eligible for a loan based on user input. It uses machine learning models and follows a multi-step process involving data collection, preprocessing, model building, backend API development, and frontend development. This project is designed to assist users in determining their loan eligibility quickly and efficiently.

## Features
- Predict loan approval status (approved or denied) based on user input.
- Machine learning models (Logistic Regression, SVC, Random Forest) to predict loan eligibility.
- Backend API built with FastAPI to handle requests and interact with the machine learning model.
- Frontend built with React to collect user data and display results.

## Project Structure
The project is divided into five main parts:
1. **Data Collection**: Collection of the loan application dataset.
2. **Data Preprocessing**: Cleaning and preparing the data for model training.
3. **Model Building**: Training machine learning models to predict loan approval.
4. **Backend API Development**: Creating an API to connect the frontend with the model.
5. **Frontend Development**: Building the user interface to interact with the backend and display predictions.

## Technologies Used
- **Machine Learning**: Python, scikit-learn
- **Backend**: FastAPI, Python
- **Frontend**: React.js, JavaScript
- **Model Deployment**: joblib (for saving the model)
- **Data Handling**: pandas, numpy
- **Web Framework**: React.js, FastAPI
- **Version Control**: Git, GitHub

 ## Data Preprocessing
The dataset contains 600 rows and 13 columns, including features such as Gender, Married, Dependents, Education, ApplicantIncome, CoApplicantIncome, LoanAmount, CreditHistory, and LoanStatus. The target column is LoanStatus, indicating loan approval (1) or denial (0).

### Steps taken for data preprocessing:
1. **Handling Missing Values**:
   - Dropped rows with less than 5% missing values.
   - Filled missing numerical values (ApplicantIncome, CoApplicantIncome) with column means.
   - Filled missing categorical values (SelfEmployed) with the most frequent category.

2. **Converting Categorical Data**:
   - Categorical variables like 'Married', 'SelfEmployed', and 'Education' were converted to numerical values using the `map()` function.

3. **Feature Scaling**:
   - Applied feature scaling to numerical columns (ApplicantIncome, CoApplicantIncome, LoanAmount, LoanAmountTerm) for model efficiency.

## Model Building
The data was split into features (X) and target (Y). The following models were trained and evaluated:
- **Logistic Regression**: 83% accuracy
- **Support Vector Classifier (SVC)**: 82% accuracy
- **Random Forest Classifier**: 82% accuracy

### Hyperparameter Tuning:
The Logistic Regression model showed the best performance. After tuning, its accuracy improved to 85%, making it the final choice for deployment.

### Model Saving:
The trained model was saved using `joblib.dump()` in a `.pkl` file (`model.pkl`), which was later used for predictions in the backend.


## Backend Development (FastAPI)
- **FastAPI** is used to create the backend API.
- The API receives user input from the frontend, preprocesses it, and passes it to the trained machine learning model for prediction.
- The model predicts whether the loan will be approved (1) or denied (0), and the prediction is returned to the frontend in JSON format.

### API Flow:
1. **Form Submission**: The frontend collects user input (e.g., income, loan amount).
2. **API Request**: The frontend sends the user data to the backend API.
3. **Prediction**: The backend processes the data, runs the model, and predicts the loan status.
4. **Response**: The prediction is sent back to the frontend in a JSON response.

## Frontend Development (React)
The frontend is built using **React.js** and allows users to input their loan details into a form.

### Flow:
1. **Form Submission**: Users fill out their loan details.
2. **API Request**: The frontend sends the form data to the backend.
3. **Display Results**: Once the backend sends the prediction, the frontend displays whether the loan is approved or denied.

## Screenshot


![Screenshot from 2025-02-13 03-22-58](https://github.com/user-attachments/assets/5b46d2c5-9e27-4440-bcc4-a8eb5429fc85)

## Live Application

You can try the live version of the application here: [Live Demo ](https://loan-sahayak-z5n7.onrender.com/)

## How to Run the Project

### Prerequisites
- Python 3.8+
- Node.js (for React frontend)
- FastAPI
- scikit-learn
- pandas, numpy

### Installation Steps

#### Backend:
1. Clone the repository.
   ```bash
   git clone https://github.com/your-username/loan-sahayak.git
   cd loan-sahayak
