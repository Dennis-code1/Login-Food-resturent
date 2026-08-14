document.addEventListener("DOMContentLoaded", function () {

    // --------------------------------
    // ELEMENTS
    // --------------------------------

    const cartItems = document.querySelectorAll(".cart-item");

    const subtotalElement = document.getElementById("subtotal");
    const deliveryElement = document.getElementById("delivery");
    const totalElement = document.getElementById("total");

    const checkoutForm = document.getElementById("checkoutForm");

    const paymentMethods = document.querySelectorAll(
        'input[name="payment"]'
    );


    // --------------------------------
    // UPDATE CART TOTAL
    // --------------------------------

    function updateCartTotal() {

        let subtotal = 0;

        document.querySelectorAll(".cart-item").forEach(function (item) {

            const priceElement = item.querySelector(".item-price");
            const quantityElement = item.querySelector(".quantity");

            if (!priceElement || !quantityElement) {
                return;
            }

            const price = parseFloat(
                priceElement.dataset.price
            );

            const quantity = parseInt(
                quantityElement.textContent
            );

            subtotal += price * quantity;
        });


        // Delivery fee
        let deliveryFee = subtotal > 0 ? 20 : 0;

        let total = subtotal + deliveryFee;


        // Display values
        if (subtotalElement) {
            subtotalElement.textContent =
                `GH₵ ${subtotal.toFixed(2)}`;
        }

        if (deliveryElement) {
            deliveryElement.textContent =
                `GH₵ ${deliveryFee.toFixed(2)}`;
        }

        if (totalElement) {
            totalElement.textContent =
                `GH₵ ${total.toFixed(2)}`;
        }
    }


    // --------------------------------
    // QUANTITY BUTTONS
    // --------------------------------

    document.querySelectorAll(".increase-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const cartItem = button.closest(".cart-item");

            const quantityElement =
                cartItem.querySelector(".quantity");

            let quantity =
                parseInt(quantityElement.textContent);

            quantity++;

            quantityElement.textContent = quantity;

            updateCartTotal();
        });

    });


    document.querySelectorAll(".decrease-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const cartItem = button.closest(".cart-item");

            const quantityElement =
                cartItem.querySelector(".quantity");

            let quantity =
                parseInt(quantityElement.textContent);

            if (quantity > 1) {
                quantity--;

                quantityElement.textContent = quantity;

                updateCartTotal();
            }

        });

    });


    // --------------------------------
    // REMOVE ITEM
    // --------------------------------

    document.querySelectorAll(".remove-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const cartItem =
                button.closest(".cart-item");

            if (!cartItem) {
                return;
            }

            const confirmRemove =
                confirm("Remove this item from your order?");

            if (confirmRemove) {

                cartItem.remove();

                updateCartTotal();
            }

        });

    });


    // --------------------------------
    // PAYMENT METHOD
    // --------------------------------

    paymentMethods.forEach(function (method) {

        method.addEventListener("change", function () {

            const paymentBoxes =
                document.querySelectorAll(".payment-option");

            paymentBoxes.forEach(function (box) {
                box.classList.remove("selected");
            });


            const selectedBox =
                method.closest(".payment-option");

            if (selectedBox) {
                selectedBox.classList.add("selected");
            }

        });

    });


    // --------------------------------
    // FORM SUBMISSION
    // --------------------------------

    if (checkoutForm) {

        checkoutForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // Get customer information
            const fullName =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const address =
                document.getElementById("address").value.trim();


            // --------------------------------
            // VALIDATION
            // --------------------------------

            if (fullName === "") {

                alert("Please enter your full name.");

                return;
            }


            if (email === "") {

                alert("Please enter your email address.");

                return;
            }


            if (!email.includes("@")) {

                alert("Please enter a valid email address.");

                return;
            }


            if (phone === "") {

                alert("Please enter your phone number.");

                return;
            }


            if (address === "") {

                alert("Please enter your delivery address.");

                return;
            }


            // --------------------------------
            // CHECK PAYMENT
            // --------------------------------

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (!selectedPayment) {

                alert("Please select a payment method.");

                return;
            }


            // --------------------------------
            // GENERATE ORDER NUMBER
            // --------------------------------

            const orderNumber =
                "AD-" +
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );


            // --------------------------------
            // GET TOTAL
            // --------------------------------

            const orderTotal =
                totalElement
                    ? totalElement.textContent
                    : "GH₵ 0.00";


            // --------------------------------
            // SUCCESS MESSAGE
            // --------------------------------

            alert(
                "🎉 Order Successful!\n\n" +

                "Thank you, " + fullName + "!\n\n" +

                "Order Number: " +
                orderNumber + "\n" +

                "Total: " +
                orderTotal + "\n\n" +

                "Your order has been received by " +
                "A.D World Best Food.\n\n" +

                "We will contact you shortly."
            );


            // --------------------------------
            // CLEAR FORM
            // --------------------------------

            checkoutForm.reset();


            // Remove selected payment style
            document
                .querySelectorAll(".payment-option")
                .forEach(function (box) {

                    box.classList.remove("selected");

                });

        });

    }


    // --------------------------------
    // INITIAL TOTAL
    // --------------------------------

    updateCartTotal();

});