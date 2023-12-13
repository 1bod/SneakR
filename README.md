# SneakR

## Description

SneakR is a web application that allows users to browse and create collections and wishlists of sneakers. Users can create an account, browse sneakers, add sneakers to their wishlist, and to their collection. Users can also update their account information.

## Installation

First of all, you need to clone this repository to your local machine:

```bash
git clone https://github.com/1bod/SneakR.git
```

Then, you need to install all the dependencies:

```bash
npm install
```

You will now get the data from the api using the following commands:

```bash
cd api
python3 apitojson.py
python3 jsontocsv.py data.json data.tsv
cd ..
```

You then need to create a supabase project at [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects), create a table called "sneakers" and import the data.tsv file into it.

Finally, you need to create a .env file in the root directory and add the keys such as those in the .env.example file.

## Usage

To build the application, run the following command:

```bash
npm build
```

For more ways of running the application, check the scripts in the package.json file.
