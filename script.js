// Initialize items array
let items = [];
let serialNumber = 1;

// Restore input data from localStorage
document.addEventListener('DOMContentLoaded', function() {
  const storedItems = localStorage.getItem('storedItems');
  if (storedItems) {
    items = JSON.parse(storedItems);
    renderItems();
  }
});

// Function to add item
function addItem() {
  const itemName = document.getElementById('itemName').value;
  const unitPrice = parseFloat(document.getElementById('unitPrice').value);
  const quantity = parseInt(document.getElementById('quantity').value);

  if (!itemName || isNaN(unitPrice) || isNaN(quantity) || quantity <= 0 || unitPrice <= 0) {
    alert('Please fill out all fields correctly.');
    return;
  }

  const totalPrice = unitPrice * quantity;

  const item = {
    serial: serialNumber++,
    itemName,
    unitPrice,
    quantity,
    totalPrice
  };

  items.push(item);
  renderItems();

  // Save items to localStorage
  localStorage.setItem('storedItems', JSON.stringify(items));
}

// Function to handle form submission
document.getElementById('groceryForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  addItem(); // Call the addItem function
});

// Function to render items in the table
function renderItems() {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = '';

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.serial}</td>
      <td>${item.itemName}</td>
      <td>$${item.unitPrice.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${item.totalPrice.toFixed(2)}</td>
      <td><button onclick="deleteItem(${item.serial})">Delete</button></td>
    `;
    itemList.appendChild(tr);
  });
}

// Function to delete item
function deleteItem(serial) {
  items = items.filter(item => item.serial !== serial);
  renderItems();

  // Save updated items to localStorage
  localStorage.setItem('storedItems', JSON.stringify(items));
}

// Function to generate receipt
function generateReceipt() {
  const totalItems = items.length;
  const totalBill = items.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  const currentDate = new Date();
  const date = currentDate.toDateString();
  const day = currentDate.toLocaleDateString('en-US', { weekday: 'long' });




  
  // Storing the receipt data in sessionStorage with items included
  sessionStorage.setItem('receiptData', JSON.stringify({ date, day, totalItems, totalBill, items }));
  
  window.open('receipt.html', '_blank');
}