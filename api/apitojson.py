import os
import json
import requests
import os
from dotenv import load_dotenv

# Get the API URL from the environment variable

# Load environment variables from .env file
load_dotenv()

# Get the API URL from the environment variable
api_url = os.getenv('SNEAKER_API') + 'sneakers'

# Initialize an empty list to store all the data
all_data = []

# Make requests until there are no more items on the page
page = 1
while True:
    # Make a GET request to the API with the page parameter
    response = requests.get(api_url, params={'pagination[page]': page, 'pagination[pageSize]': 100})
    print("requesting from ", api_url, " with params ", {'pagination[page]': page, 'pagination[pageSize]': 100})
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the response JSON data
        data = response.json()

        # Check if there are no more items on the page
        if len(data['data']) == 0:
            break

        # Append the data to the list
        all_data.extend(data['data'])

        # Increment the page number
        page += 1
    else:
        print(response)
        print('Failed to retrieve data from the API')
        break

# Save the data to a JSON file
with open('data.json', 'w') as file:
    json.dump(all_data, file)
