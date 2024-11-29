#desc: this program does various calculations for The One Stop Insurance Company
#author: Brandon Pike
#date: november 23 2024

import datetime

# Constants (loaded from the Const.dat file)
def load_constants():
    with open('Const.dat', 'r') as file:
        constants = file.readlines()
    return {
        'next_policy_number': int(constants[0].split(' = ')[1].strip()),
        'basic_premium': float(constants[1].split(' = ')[1].strip()),
        'discount_for_additional_cars': float(constants[2].split(' = ')[1].strip()),
        'extra_liability_cost': float(constants[3].split(' = ')[1].strip()),
        'glass_coverage_cost': float(constants[4].split(' = ')[1].strip()),
        'loaner_car_coverage_cost': float(constants[5].split(' = ')[1].strip()),
        'hst_rate': float(constants[6].split(' = ')[1].strip()),
        'monthly_payment_processing_fee': float(constants[7].split(' = ')[1].strip())
    }

# Function to validate the province
def is_valid_province(province):
    valid_provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 
                       'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan']
    return province.title() in valid_provinces

# Function to validate payment method
def is_valid_payment_method(payment_method):
    valid_payment_methods = ['Full', 'Monthly', 'Down Pay']
    return payment_method.title() in valid_payment_methods

# Function to get a list of previous claims
def get_claims():
    claims = []
    while True:
        claim_number = input("Enter claim number (or type 'done' to finish): ")
        if claim_number.lower() == 'done':
            break
        claim_date = input("Enter claim date (YYYY-MM-DD): ")
        claim_amount = float(input("Enter claim amount: "))
        claims.append((claim_number, claim_date, claim_amount))
    return claims

# Function to calculate the premium
def calculate_premium(num_cars, options, constants):
    premium = constants['basic_premium']
    
    # Discount for additional cars
    if num_cars > 1:
        premium += (num_cars - 1) * constants['basic_premium'] * (1 - constants['discount_for_additional_cars'])
    
    # Add costs for options (Extra Liability, Glass Coverage, Loaner Car Coverage)
    total_extra_cost = 0
    if options['extra_liability'] == 'Y':
        total_extra_cost += num_cars * constants['extra_liability_cost']
    if options['glass_coverage'] == 'Y':
        total_extra_cost += num_cars * constants['glass_coverage_cost']
    if options['loaner_car'] == 'Y':
        total_extra_cost += num_cars * constants['loaner_car_coverage_cost']
    
    # Total insurance premium
    total_premium = premium + total_extra_cost
    return total_premium

# Function to calculate the HST and total cost
def calculate_hst_and_total_cost(total_premium, constants):
    hst = total_premium * constants['hst_rate']
    total_cost = total_premium + hst
    return hst, total_cost

# Function to calculate monthly payment
def calculate_monthly_payment(total_cost, payment_method, down_payment, constants):
    if payment_method == 'Monthly':
        total_to_pay = total_cost + constants['monthly_payment_processing_fee']
        monthly_payment = total_to_pay / 8
        return monthly_payment
    elif payment_method == 'Down Pay':
        total_to_pay = total_cost - down_payment + constants['monthly_payment_processing_fee']
        monthly_payment = total_to_pay / 8
        return monthly_payment
    else:  # Full payment
        return total_cost

# Function to display a receipt
def display_receipt(customer, premium, hst, total_cost, monthly_payment, claims):
    # Displaying the customer information
    print(f"\n{'='*40}")
    print(f"Insurance Policy Receipt")
    print(f"{'='*40}")
    print(f"Customer Name: {customer['first_name']} {customer['last_name']}")
    print(f"Address: {customer['address']}")
    print(f"City: {customer['city']}")
    print(f"Province: {customer['province']}")
    print(f"Postal Code: {customer['postal_code']}")
    print(f"Phone Number: {customer['phone_number']}")
    print(f"\n{'='*40}")
    
    # Displaying the premium details
    print(f"Number of Cars Insured: {customer['num_cars']}")
    print(f"Basic Premium: ${premium:.2f}")
    print(f"HST (15%): ${hst:.2f}")
    print(f"Total Premium (with HST): ${total_cost:.2f}")
    
    if customer['payment_method'] == 'Monthly' or customer['payment_method'] == 'Down Pay':
        print(f"Monthly Payment (with processing fee): ${monthly_payment:.2f}")
    else:
        print(f"Full Payment: ${total_cost:.2f}")
    
    # Displaying previous claims
    if claims:
        print(f"\nPrevious Claims:")
        for claim in claims:
            print(f"Claim Number: {claim[0]}, Date: {claim[1]}, Amount: ${claim[2]:.2f}")
    
    print(f"\n{'='*40}")
    print(f"Thank you for choosing One Stop Insurance!")
    print(f"{'='*40}")

def main():
    # Load constants from file
    constants = load_constants()

    # Loop to allow entering multiple customers
    while True:
        customer = {}

        # Input customer information
        customer['first_name'] = input("Enter first name: ").title()
        customer['last_name'] = input("Enter last name: ").title()
        customer['address'] = input("Enter address: ")
        customer['city'] = input("Enter city: ").title()
        while True:
            province = input("Enter province: ").title()
            if is_valid_province(province):
                customer['province'] = province
                break
            else:
                print("Invalid province. Please enter a valid province.")

        customer['postal_code'] = input("Enter postal code: ")
        customer['phone_number'] = input("Enter phone number: ")

        # Input insurance details
        customer['num_cars'] = int(input("Enter number of cars being insured: "))
        
        customer['extra_liability'] = input("Extra Liability Coverage (Y/N): ").upper()
        customer['glass_coverage'] = input("Glass Coverage (Y/N): ").upper()
        customer['loaner_car'] = input("Loaner Car Coverage (Y/N): ").upper()

        # Input payment method
        while True:
            payment_method = input("Payment method (Full, Monthly, Down Pay): ").title()
            if is_valid_payment_method(payment_method):
                customer['payment_method'] = payment_method
                break
            else:
                print("Invalid payment method. Please enter a valid option.")
        
        down_payment = 0
        if payment_method == 'Down Pay':
            down_payment = float(input("Enter down payment amount: "))

        # Get claims data
        claims = get_claims()

        # Calculate premiums
        options = {
            'extra_liability': customer['extra_liability'],
            'glass_coverage': customer['glass_coverage'],
            'loaner_car': customer['loaner_car']
        }
        premium = calculate_premium(customer['num_cars'], options, constants)
        hst, total_cost = calculate_hst_and_total_cost(premium, constants)
        monthly_payment = calculate_monthly_payment(total_cost, customer['payment_method'], down_payment, constants)
        
        # Display the receipt
        display_receipt(customer, premium, hst, total_cost, monthly_payment, claims)
        
        # Ask if the user wants to continue
        again = input("\nDo you want to enter another customer? (Y/N): ").upper()
        if again != 'Y':
            break

if __name__ == "__main__":
    main()
