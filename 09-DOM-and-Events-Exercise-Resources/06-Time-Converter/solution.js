function attachEventsListeners() {
    // Conversion factors
    const daysToHours = 24;
    const hoursToMinutes = 60;
    const minutesToSeconds = 60;
    const daysToMinutes = daysToHours * hoursToMinutes;
    const daysToSeconds = daysToMinutes * minutesToSeconds;
    const hoursToSeconds = hoursToMinutes * minutesToSeconds;

    // Function to convert from a given time unit to all others
    function convert(value, unit) {
        let days, hours, minutes, seconds;

        switch (unit) {
            case 'days':
                days = value;
                hours = value * daysToHours;
                minutes = value * daysToMinutes;
                seconds = value * daysToSeconds;
                break;
            case 'hours':
                days = value / daysToHours;
                hours = value;
                minutes = value * hoursToMinutes;
                seconds = value * hoursToSeconds;
                break;
            case 'minutes':
                days = value / daysToMinutes;
                hours = value / hoursToMinutes;
                minutes = value;
                seconds = value * minutesToSeconds;
                break;
            case 'seconds':
                days = value / daysToSeconds;
                hours = value / hoursToSeconds;
                minutes = value / minutesToSeconds;
                seconds = value;
                break;
        }

        // Update the input fields with the converted values
        document.getElementById('days').value = days;
        document.getElementById('hours').value = hours;
        document.getElementById('minutes').value = minutes;
        document.getElementById('seconds').value = seconds;
    }

    // Attach event listeners to buttons
    document.getElementById('daysBtn').addEventListener('click', function () {
        let value = parseFloat(document.getElementById('days').value); //Getting the Input Value:
        if (!isNaN(value)) { // checks if the value is a valid number.
            //isNaN(value) returns true if the value is NaN (Not-a-Number) and false otherwise.
            //!isNaN(value) therefore checks if the value is a number. If it is, the condition inside the if statement is executed.
            convert(value, 'days'); //calls the convert function, passing two arguments
        }
    });

    //document.getElementById('daysBtn') selects the HTML element with the ID daysBtn, which is the "Convert" button next to the "Days" input field.
    //.addEventListener('click', function() { ... }) attaches a click event listener to the daysBtn button. This means that whenever the button is clicked, the specified function (callback) will be executed.
    //document.getElementById('days') selects the HTML element with the ID days, which is the input field for days.
    //.value retrieves the current value of the input field as a string.
    //parseFloat(...) converts the string value to a floating-point number. This is important because the value entered in the input field is initially a string, and we need it to be a number to perform mathematical operations.

    document.getElementById('hoursBtn').addEventListener('click', function () {
        let value = parseFloat(document.getElementById('hours').value);
        if (!isNaN(value)) {
            convert(value, 'hours');
        }
    });

    document.getElementById('minutesBtn').addEventListener('click', function () {
        let value = parseFloat(document.getElementById('minutes').value);
        if (!isNaN(value)) {
            convert(value, 'minutes');
        }
    });

    document.getElementById('secondsBtn').addEventListener('click', function () {
        let value = parseFloat(document.getElementById('seconds').value);
        if (!isNaN(value)) {
            convert(value, 'seconds');
        }
    });

    //Adds click event listeners to each "Convert" button.
    //When a button is clicked, it reads the value from the corresponding input field, checks if it is a valid number, and calls the convert function with the value and unit.
}
