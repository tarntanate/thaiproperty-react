### FOR TESTING AND DEMO OF REACT + .NET CORE ONLY!!
#### This repo is not including all of source code, (NOT INCLUDED MODELS, REPOSITORES AND ANY DATABASE RELATED)
#### So, you cannot clone and just run it, it will throw an errors!!

### THIS REPO DOES NOT ALLOW TO REPRODUCE AND PLEASE USE WITH CONFIDENTIALLY!!

### This application demonstrate of listing condominium projects on a Google Map (as Marker & MarkerClusterer). User allow to filter the price based on average price/sqm. via slider or filter by project name with a "**real-time**" re-rendering on a map.

### Data sources were sampled from www.thaiproperty.in.th (development DB not production DB)

---

### Real demo at https://www.thaiproperty.in.th/projects/map

### Source data (json) from API at https://www.thaiproperty.in.th/api/projects/withAvgPrice

---

### What you should look into this repo?

* 'React App' in '/ClientApp/src/' folder,
* '
* 'Testing for React App' in '/ClientApp/src/tests/' folder
* 'Backend Api Controller as C#.NET' in '/Controllers/' folder

---

### API Url configuration location

In development: http://localhost:5000/api/

or via https with port 5001

In development: https://localhost:5001/api/

---

### Project structure

Client-side (React App) located inside 'ClientApp' folder.

---

### To run project (in development)

You can run both server and client app together with just '**dotnet run**' or '**dotnet watch run**'

OR run server and client seperately by

* First run '**dotnet run**' to serve backend api
* Then go inside folder 'ClientApp' and run '**npm start**'

---

### For client-side (React) testing

Go into 'ClientApp' folder and run '**npm test**'.
