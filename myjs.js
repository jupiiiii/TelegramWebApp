let tg = window.Telegram.WebApp;
let shop_now = document.getElementById('shop_now');
const menuIcon = document.getElementById('menu_icon');
const iconsContainer = document.getElementById('icons');
const menuContainer = document.getElementById('menu_icons');
const tag = document.getElementById('tag');


document.getElementById('main').style.display = 'block';
document.getElementById('items-list').style.display = 'none';
tag.style.display = 'flex'

shop_now.addEventListener('click', () => {
    tg.expand();
    document.getElementById('video-background').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    document.getElementById('items-list').style.display = 'flex';
    menuContainer.style.display = 'flex';
    iconsContainer.style.display = 'flex';
    tag.style.display = 'none'

});
let isExpanded = true;  // Track the state of the icons (expanded or collapsed)


        document.addEventListener('DOMContentLoaded', function() {
            let itemCounter = {}; // Object to track count for each item
            const placeOrderButton = document.getElementById('place-order-button');
            const items = document.querySelectorAll('.item img');
            const modal = document.getElementById('imageModal');
            const modalImage = document.getElementById('modalImage');
            const closeModal = document.getElementById('closeModal');
            const close_summary = document.getElementById('bottom-buttons');
            const cart = document.getElementById('cart_icon');
            const about = document.getElementById('about_icon');
            const contact = document.getElementById('contact_icon');
            const form_container = document.getElementById('form')
            const about_section = document.getElementById('about')
            const about_back = document.getElementById('about_back')




            // const checkout = document.getElementById('checkout')
            // Attach event listener to menu icon
            menuContainer.addEventListener('click', toggleIconMovement);

            // Array to keep track of selected items
            const selectedItems = [];

            // Function to handle the cool bounce effect on scroll
            function handleScroll() {
                const items = document.querySelectorAll('.item');
                items.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        item.classList.add('bounce');
                    }
                });
            }

            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);

            // Trigger the bounce effect on page load as well
            handleScroll();

            // Function to update the "Place Order" button visibility
            function updatePlaceOrderButtonVisibility() {
                const totalItems = Object.values(itemCounter).reduce((sum, count) => sum + count, 0);
                // placeOrderButton.style.display = totalItems > 0 ? 'block' : 'none';
                //hideIconsTwo();
                // iconsContainer.style.display = 'flex'
                if (!isExpanded) {
                    toggleIconMovement();
                }

            }

            // Function to toggle icon movement
            function toggleIconMovement() {
                if (isExpanded) {
                    iconsContainer.classList.toggle('move-to-bottom-left');

                } else {
                    iconsContainer.classList.toggle('move-to-bottom-left');
                }
                isExpanded = !isExpanded;

            }


            // Function to hide icons with sliding effect
            function hideIcons() {
                // Add the slide-out class to start the animation
                //iconsContainer.classList.add('slide-out');
                iconsContainer.classList.add('move-to-bottom-left');

                // Wait for the animation to complete before hiding the icons
                setTimeout(() => {
                    iconsContainer.style.display = 'none';
                }, 500); // Match the timeout duration to the CSS transition duration (0.5s in this case)
            }

            function hideIconsTwo() {
                // Add the slide-out class to start the animation
                iconsContainer.classList.add('slide-out');
                //iconsContainer.classList.add('move-to-bottom-left');

                // Wait for the animation to complete before hiding the icons
                setTimeout(() => {
                    iconsContainer.style.display = 'none';
                }, 500); // Match the timeout duration to the CSS transition duration (0.5s in this case)
            }


            // Adding click event to the "ADD" button
            document.querySelectorAll('.item-button').forEach(button => {

                button.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item-id');
                    const controls = this.nextElementSibling;
                    const itemName = this.parentElement.querySelector('.item-name').innerText;
                    const itemPrice = this.parentElement.querySelector('.item-price').innerText;
                    const itemImgSrc = this.parentElement.querySelector('img').src;
                    const item = selectedItems.find(item => item.id === itemId);

                    if (!item) {
                        selectedItems.push({ id: itemId, name: itemName, price: itemPrice, imgSrc: itemImgSrc, quantity: 1 });
                    }

                    //updateOrderSummary(); // Update order summary when an item is added

                    // Hide the "ADD" button and show the controls
                    this.style.display = 'none';
                    controls.style.display = 'flex';

                    if (!itemCounter[itemId]) itemCounter[itemId] = 0;
                    itemCounter[itemId]++;
                    updatePlaceOrderButtonVisibility();


                });
            });

            // Incrementing item count
            document.querySelectorAll('.quantity-button.plus').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item-id');
                    const counter = document.getElementById(`counter-${itemId}`);
                    let count = parseInt(counter.textContent);
                    const item = selectedItems.find(item => item.id === itemId);

                    if (item) {
                        item.quantity += 1;
                    }
                    //updateOrderSummary();

                    // Increment the counter value
                    count += 1;
                    counter.textContent = count;

                    itemCounter[itemId]++;
                    updatePlaceOrderButtonVisibility();
                });
            });

            // Decrementing item count
            document.querySelectorAll('.quantity-button.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.getAttribute('data-item-id');
                    const counter = document.getElementById(`counter-${itemId}`);
                    let count = parseInt(counter.textContent);
                    const item = selectedItems.find(item => item.id === itemId);

                    if (item && item.quantity > 0) {
                        item.quantity -= 1;
                    }

                    if (item.quantity === 0) {
                        selectedItems.splice(selectedItems.indexOf(item), 1); // Remove item from selectedItems if quantity is 0
                    }

                    //updateOrderSummary();

                    // Decrement the counter value
                    count -= 1;
                    counter.textContent = count;

                    itemCounter[itemId]--;
                    if (itemCounter[itemId] === 0) {
                        delete itemCounter[itemId]; // Remove item from counter
                        // Hide the controls and show the "ADD" button
                        const itemControls = this.parentElement;
                        itemControls.style.display = 'none';
                        itemControls.previousElementSibling.style.display = 'block';
                        let isExpanded = false;  // Track the state of the icons (expanded or collapsed)
                        counter.textContent = 1; // Reset counter for next addition

                    }
                    updatePlaceOrderButtonVisibility();

                });
            });

            function updateOrderSummary() {
                const orderSummary = document.getElementById('orderSummary');
                orderSummary.innerHTML = ''; // Clear previous summary

                let grandTotal = 0; // Initialize grand total

                selectedItems.forEach(item => {
                    const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                    const itemTotal = item.quantity * itemPrice; // Calculate total price for the item
                    grandTotal += itemTotal; // Add to grand total

                    const listItem = document.createElement('div');
                    listItem.className = 'order-summary-item';
                    listItem.innerHTML = `
                        <img src="${item.imgSrc}" alt="${item.name}" class="order-summary-img">
                        <span class="order-summary-name">${item.name}</span>
                        <span class="order-summary-quantity">x${item.quantity}</span>
                        <span class="order-summary-price">$${itemTotal.toFixed(2)}</span>
                    `;
                    orderSummary.appendChild(listItem);
                });

                // Display grand total
                const totalElement = document.createElement('div');
                totalElement.className = 'order-summary-total';
                totalElement.innerHTML = `
                    <span>Total:</span>
                    <span class="order-summary-total-price">$${grandTotal.toFixed(2)}</span>
                `;
                orderSummary.appendChild(totalElement);

                const modal = document.getElementById('orderSummaryModal');
                modal.style.display = selectedItems.length >= 0 ? 'flex' : 'none'; // Show or hide the modal based on the selection
            }

            // Script for handling the modal for image enlargement
            document.querySelectorAll('.item img').forEach(image => {
                image.addEventListener('click', () => {
                const src = image.getAttribute('src');
                modalImage.setAttribute('src', src);
                modal.style.display = 'flex';
                placeOrderButton.style.display = 'none';
                menuContainer.style.display = 'none';
                if (isExpanded) {
                    toggleIconMovement();
                }
                });
            });

            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                menuContainer.style.display = 'flex';
                updatePlaceOrderButtonVisibility();
            });

            modal.addEventListener('click', (e) => {
                if (e.target !== modalImage && e.target !== closeModal) {
                modal.style.display = 'none';
                menuContainer.style.display = 'flex';
                updatePlaceOrderButtonVisibility();
                }
            });


            // Event listener for the "Place Order" button to show the order summary modal
            document.getElementById('cart_icon').addEventListener('click', () => {
                // Disable body scroll
                document.body.style.overflow = 'hidden';
                updateOrderSummary(); // Update and show the order summary modal
                // placeOrderButton.style.display = 'none'
                close_summary.style.display = 'inline-block';
                //iconsContainer.style.display = 'none'
                // if (isExpanded) {
                //     toggleIconMovement();
                // }
                iconsContainer.style.display = 'none'
                menuContainer.style.display = 'none'
            });

            // Event listener for closing the order summary modal
            document.getElementById('closeOrderSummary').addEventListener('click', () => {
                const modal = document.getElementById('orderSummaryModal');
                // Re-enable body scroll
                document.body.style.overflow = 'auto';
                modal.style.display = 'none'; // Hide the order summary modal
                close_summary.style.display = 'none';
                //iconsContainer.style.display = 'none'
                //isExpanded = !isExpanded;
                // if (isExpanded) {
                //     toggleIconMovement();
                // }
                menuContainer.style.display = 'flex'
                iconsContainer.style.display = 'flex'
            });

            // Event listener for checking out the order summary modal
            document.getElementById('checkout').addEventListener('click', () => {
                if (selectedItems.length === 0) {
                    showError("No items selected. Please add items to your order before checking out.");
                } else {
                    sendOrderToTelegram();
                }

            });

            // Function to show an error message
            function showError(message) {
                alert(message);
            }

            function sendOrderToTelegram() {
                const orderData = selectedItems.map(item => {
                    const itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
                    const itemTotal = item.quantity * itemPrice;
                    return {
                        name: item.name,
                        quantity: item.quantity,
                        totalPrice: itemTotal.toFixed(2)
                    };
                });

                const grandTotal = orderData.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0).toFixed(2);

                const orderSummary = {
                    items: orderData,
                    grandTotal: grandTotal
                };

                tg.sendData(JSON.stringify(orderSummary));
                tg.close();
            }

            // Event listener for the "Contact" button to show the order summary modal
            document.getElementById('contact_icon').addEventListener('click', () => {

                document.getElementById('items-list').style.display = 'none';
                // document.body.style.overflow = 'hidden';
                iconsContainer.style.display = 'none'
                menuContainer.style.display = 'none'
                const form = document.getElementById('form')
                const submit_butts = document.getElementById('submit-buttons')
                form.style.display = 'flex'
                submit_butts.style.display = 'inline-block'
            });

            document.getElementById('back').addEventListener('click', () =>{
                event.preventDefault();
                // document.body.style.overflow = 'auto';
                document.getElementById('items-list').style.display = 'flex';
                iconsContainer.style.display = 'flex'
                menuContainer.style.display = 'flex'
                const form = document.getElementById('form')
                const submit_butts = document.getElementById('submit-buttons')
                form.style.display = 'none'
                submit_butts.style.display = 'none'
            });

            // Event listener for the "About" button to show the order summary modal
            document.getElementById('about_icon').addEventListener('click', () => {

                document.getElementById('items-list').style.display = 'none';
                // document.body.style.overflow = 'hidden';
                iconsContainer.style.display = 'none'
                menuContainer.style.display = 'none'
                about_section.style.display = 'flex'
            });

            // Event listener for the "About back" button to show the order summary modal
            document.getElementById('about_back').addEventListener('click', () => {

                document.getElementById('items-list').style.display = 'flex';
                // document.body.style.overflow = 'hidden';
                iconsContainer.style.display = 'flex'
                menuContainer.style.display = 'flex'
                about_section.style.display = 'none'
            });

            document.getElementById('submit').addEventListener('click', () => {
                event.preventDefault();
                document.getElementById('error').innerText = ' ';
                let name = document.getElementById('user_name').value;
                let email = document.getElementById('user_email').value;
                let phone = document.getElementById('user_phone').value;
                let message = document.getElementById('message').value;

                if (name.length < 3) {
                    document.getElementById('error').innerText = 'Please enter your name';
                    return;
                }

                if (email.length < 5) {
                    document.getElementById('error').innerText = 'Please enter your correct email';
                    return;
                }

                if (phone.length < 5) {
                    document.getElementById('error').innerText = 'Please enter your phone number';
                    return;
                }

                if (message.length < 5) {
                    document.getElementById('error').innerText = 'Message cannot be empty!';
                    return;
                }

                let complaint = {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                }
                tg.sendData(JSON.stringify(complaint));
                tg.close();
            });

            form_container.addEventListener('click', function(event) {
                // Check if the clicked element is not an input field or textarea
                if (!event.target.closest('input') && !event.target.closest('textarea')) {
                    // Find all input and textarea elements
                    const inputs = document.querySelectorAll('input, textarea');
                    inputs.forEach(input => {
                        input.blur(); // Remove focus from the input to hide the keyboard
                    });
                }
            });





        });

