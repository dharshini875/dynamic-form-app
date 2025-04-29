// Function to display the success message
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.textContent = "Form Submitted Successfully!";
    successMessage.style.color = 'green';
    successMessage.style.fontWeight = 'bold';
    successMessage.style.fontSize = '20px';
    successMessage.style.marginTop = '20px';
    
    // Appending the success message to the body or a specific element
    document.body.appendChild(successMessage);
  }
  
  // Trigger this function when form is successfully submitted
  // You can call this inside the form submit handler in your React code (after successful submission)
  