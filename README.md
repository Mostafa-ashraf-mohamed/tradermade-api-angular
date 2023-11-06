# FX Rate Comparison Web Application

This responsive web application allows users to compare historical and current exchange rates for various currency pairs. It integrates the TraderMade API for real-time data and utilizes a user-friendly interface with interactive charts and dropdown menus for easy comparison. The app is designed with a mobile-first approach, ensuring seamless usage across different devices.

## Features

- Real-time and historical exchange rate comparisons
- Interactive charts and graphs for data visualization
- Dynamic dropdown menus for selecting currency pairs and exchanges
- Responsive design optimized for both desktop and mobile viewing
- unit testing for components and services

## Technologies Used

- Frontend: Angular
- Charting Library: Chart.js
- API Integration: TraderMade REST API

## Setup Instructions

1. Clone the repository to your local machine.
```
git clone https://github.com/Mostafa-ashraf-mohamed/tradermade-api-angular.git
```
2. Navigate to the project directory.
```
cd tradermade-api-angular
```
3. Install the necessary dependencies.
```
npm install
```
4. Run the application.
```
ng serve
```
or
 ```
 npm start
 ```
5. Open your web browser and go to `http://localhost:4200/` to view the application.

## API Integration

The application utilizes the TraderMade API, enabling access to real-time and historical exchange rate data for various currency pairs. With a free account, the application can make up to 1000 REST API calls per month and utilize the streaming capabilities for up to 14 days.

## important note
after creating your free account and get your api key dont forget to change the api key in currency.service.ts

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) License.

Enjoy using FX Rate Comparison 😃
