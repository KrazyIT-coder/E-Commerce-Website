//====================================
//Dashboard JavaScript Functionalities
//====================================

//  Declaration of arrays that will be reassigned to specific bar chart components later on
let products = ["Kadena Upcycled Graphic Tee", "Haraya Linen Trousers", "Inabel Top", "Bayanihan Upcycled Cargo Pants", "Abaca Sole Platform Mules"];
let productData = [117, 82, 113, 102, 86];
let backgroundcolor = ['rgb(217, 88, 74)', 'rgb(217, 133, 74)', 'rgb(217, 193, 74)', 'rgb(71, 158, 84)', 'rgb(81, 168, 214)'];

// Tells the website what kind of data should be included within the chart
const data = {
    labels: products,
    datasets: [{
        data: productData,
        backgroundColor: backgroundcolor
    }]
};

// Primary configurations for the type of chart it's displayed as, alongside it's data and text colors
const config = {
    type: 'bar',
    data: data,
    options: { // Directly adjusts the chart's behavior and appearance (Besides chart data and background color)
        plugins: { // Provides additional customizability to chart behavior
            legend: {
                display: false
            },

            title: {
                display: true,
                text: "Top 5 Best Selling Products",
                color: '#ffffff'
            },

            tooltip: {
                color: '#ffffff'
            },
        },

        // Controls the displayed values on the x & y axis of the bar chart
        scales: {
            x: {
                ticks: { // Labels displayed on the x axis of the bar chart
                    color: '#ffffff'
                }
            },
            
            y: {
                ticks: { // Labels displayed on the y axis of the bar chart
                    color: '#ffffff'
                }
            }
        }
    }
};

// Used to link the chart to an element within the main HTML code
const chart = new Chart( 
    document.getElementById('salesChart'), // Connects the chart to an HTML element in the main HTML body
    config
);

//------------------------------------------------------------------------------------------
//  Declaration of arrays that will be reassigned to specific pie chart components later on
let employees = ["Apparel Designers", "Production & Manufacturing", "Quality Control", "Marketing", "Customer Service"];
let employeenumber = [7, 7, 4, 2, 5];
let backgroundcolor2 = ['rgb(236, 111, 255)', 'rgb(165, 74, 217)', 'rgb(74, 86, 217)', 'rgb(84, 148, 190)', 'rgb(147, 217, 255)'];

// Tells the website what kind of data should be included within the chart
const data2 = {
    labels: employees,
    datasets: [{
        data: employeenumber,
        backgroundColor: backgroundcolor2
    }]
};

// Primary configurations for the type of chart it's displayed as, alongside it's data and text colors
const config2 = {
    type: 'pie',
    data: data2,
    options: { // Directly adjusts the chart's behavior and appearance (Besides chart data and background color)
        plugins: { // Provides additional customizability to chart behavior
            legend: {
                display: false
            },

            title: {
                display: true,
                text: "Employee Numbers by Division",
                color: '#ffffff'
            },

            tooltip: {
                color: '#ffffff'
            },
        },

        // Controls the displayed values on the x & y axis of the pie chart
        scales: {
            x: {
                ticks: { // Labels displayed on the x axis of the pie chart
                    display: false
                }
            },
            
            y: {
                ticks: { // Labels displayed on the y axis of the pie chart
                    display: false
                }
            }
        }
    }
};

// Used to link the chart to an element within the main HTML code
const chart2 = new Chart( 
    document.getElementById('employeeChart'), // Connects the chart to an HTML element in the main HTML body
    config2
);
