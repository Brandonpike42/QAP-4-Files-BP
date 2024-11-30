//desc:this is a program to do up a receipt for the Yacht club
//author:brandon pike
//date: november 25 2024


// Function to collect member data and calculate fees
function collectMemberData() {
    // Get current date
    const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Collect member information
    const siteNumber = parseInt(prompt("Enter Site Number (1-100):"));
    const memberName = prompt("Enter Member Name:");
    const streetAddress = prompt("Enter Street Address:");
    const city = prompt("Enter City:");
    const province = prompt("Enter Province:");
    const postalCode = prompt("Enter Postal Code:");
    const phoneNumber = prompt("Enter Phone Number:");
    const cellNumber = prompt("Enter Cell Number:");

    // Membership Type (Standard or Executive)
    let membershipType = prompt("Enter Membership Type (S for Standard, E for Executive):").toUpperCase();
    while (membershipType !== "S" && membershipType !== "E") {
        membershipType = prompt("Invalid input. Enter Membership Type (S for Standard, E for Executive):").toUpperCase();
    }

    // Additional Options
    const alternateMembers = parseInt(prompt("Enter the number of alternate members (family/friends):"));
    const weeklySiteCleaning = prompt("Weekly Site Cleaning (Y for Yes, N for No):").toUpperCase();
    const videoSurveillance = prompt("Video Surveillance (Y for Yes, N for No):").toUpperCase();

    // Calculate site charges
    let siteCharge = siteNumber % 2 === 0 ? 80.00 : 120.00; // Even sites cost $80, odd sites cost $120
    const alternateMemberCharge = alternateMembers * 5.00; // $5 per alternate member
    siteCharge += alternateMemberCharge;

    // Calculate extra charges (Weekly site cleaning and Video surveillance)
    let extraCharges = 0;
    if (weeklySiteCleaning === 'Y') extraCharges += 50.00; // Weekly cleaning charge
    if (videoSurveillance === 'Y') extraCharges += 35.00; // Video surveillance charge

    // Subtotal (Site charge + Extra charges)
    const subtotal = siteCharge + extraCharges;

    // Tax calculation (15%)
    const tax = subtotal * 0.15;

    // Total Monthly Charge (Site charge + Extra charges + Tax)
    const totalMonthlyCharge = subtotal + tax;

    // Monthly Dues (Standard: $75, Executive: $150)
    const monthlyDues = membershipType === 'S' ? 75.00 : 150.00;

    // Total Monthly Fees (Total Monthly Charge + Monthly Dues)
    const totalMonthlyFees = totalMonthlyCharge + monthlyDues;

    // Yearly Fees (Total Monthly Fees * 12)
    const yearlyFees = totalMonthlyFees * 12;

    // Monthly Payment (Yearly Fees + Processing Fee / 12)
    const processingFee = 59.99;
    const monthlyPayment = (yearlyFees + processingFee) / 12;

    // Cancellation Fee (60% of Yearly Site Charges)
    const cancellationFee = 0.60 * (siteCharge * 12);

    // Display the receipt
    displayReceipt({
        currentDate,
        siteNumber,
        memberName,
        streetAddress,
        city,
        province,
        postalCode,
        phoneNumber,
        cellNumber,
        membershipType: membershipType === 'S' ? 'Standard' : 'Executive',
        alternateMembers,
        weeklySiteCleaning: weeklySiteCleaning === 'Y' ? 'Yes' : 'No',
        videoSurveillance: videoSurveillance === 'Y' ? 'Yes' : 'No',
        siteCharge,
        alternateMemberCharge,
        extraCharges,
        subtotal,
        tax,
        totalMonthlyCharge,
        monthlyDues,
        totalMonthlyFees,
        yearlyFees,
        monthlyPayment,
        cancellationFee
    });
}

// Function to display the receipt
function displayReceipt(data) {
    // Formatting the receipt
    const receipt = `
        ================================
        St. John's Marina & Yacht Club
        ================================
        Invoice Date: ${data.currentDate}
        Member Name: ${data.memberName}
        Site Number: ${data.siteNumber}
        Address: ${data.streetAddress}, ${data.city}, ${data.province}, ${data.postalCode}
        Phone Number: ${data.phoneNumber}
        Cell Number: ${data.cellNumber}
        
        Membership Type: ${data.membershipType}
        Alternate Members: ${data.alternateMembers}
        Weekly Site Cleaning: ${data.weeklySiteCleaning}
        Video Surveillance: ${data.videoSurveillance}

        Site Charge: $${data.siteCharge.toFixed(2)}
        Alternate Members Charge: $${data.alternateMemberCharge.toFixed(2)}
        Extra Charges (Cleaning + Surveillance): $${data.extraCharges.toFixed(2)}

        Subtotal: $${data.subtotal.toFixed(2)}
        Tax (15%): $${data.tax.toFixed(2)}
        Total Monthly Charge: $${data.totalMonthlyCharge.toFixed(2)}

        Monthly Dues: $${data.monthlyDues.toFixed(2)}
        Total Monthly Fees: $${data.totalMonthlyFees.toFixed(2)}

        Yearly Fees: $${data.yearlyFees.toFixed(2)}
        Monthly Payment (Including Processing Fee): $${data.monthlyPayment.toFixed(2)}

        Cancellation Fee: $${data.cancellationFee.toFixed(2)}

        ================================
        Thank you for choosing St. John's Marina & Yacht Club!
        ================================
    `;

    // Output the receipt in the console (or you can display it in HTML)
    console.log(receipt);
    
    document.getElementById("client-name").innerHTML = `${data.memberName}<br />${data.streetAddress}<br />${data.city}, ${data.province} ${data.postalCode}`;
    document.getElementById("home-phone").innerText = data.phoneNumber;
    document.getElementById("cell-phone").innerText = data.cellNumber;
    document.getElementById("site-number").innerText = data.siteNumber;
    document.getElementById("member-type").innerText = data.membershipType;
    document.getElementById("alternate-members").innerText = data.alternateMembers;
    document.getElementById("weekly-site-cleaning").innerText = data.weeklySiteCleaning;
    document.getElementById("video-surveillance").innerText = data.videoSurveillance;
    document.getElementById("site-charges").innerText = '$' + data.siteCharge.toFixed(2);
    document.getElementById("extra-charges").innerText = '$' + data.extraCharges.toFixed(2);
    document.getElementById("sub-total").innerText = '$' + data.subtotal.toFixed(2);
    document.getElementById("sales-tax").innerText = '$' + data.tax.toFixed(2);
    document.getElementById("total-monthly-charges").innerText = '$' + data.totalMonthlyCharge.toFixed(2);
    document.getElementById("monthly-dues").innerText = '$' + data.totalMonthlyFees.toFixed(2);
    document.getElementById("monthly-fees").innerText = '$' + data.monthlyPayment.toFixed(2);
    document.getElementById("yearly-fees").innerText = '$' + data.yearlyFees.toFixed(2);
    document.getElementById("monthly-payment").innerText = '$' + data.monthlyPayment.toFixed(2);
    document.getElementById("issued").innerText = data.currentDate;
    document.getElementById("cancellation-fee").innerText = '$' + data.cancellationFee.toFixed(2);
}

//Call the function to collect member data and generate receipt
collectMemberData();
