## FOR TESTING AND DEMO OF REACT + .NET CORE ONLY!!

### THIS REPO DOES NOT ALLOW TO REPRODUCE AND PLEASE USE WITH CONFIDENTIALLY!!

### This application demonstrate of listing condominium projects on a Google Map (as Marker & MarkerClusterer). User allow to filter the price based on average price/sqm. via slider or filter by project name with a "**real-time**" re-rendering on a map.

### Data sources were based on www.thaiproperty.in.th (dev DB not production DB)

Note: Filter only either criteria only, cannot combine search critera for easy user usage.

Note2: Performance may be drop on slow machine with a lot of markers (eg. more than 200 projects list on a map).

---

### See a real demo app at http://react.thaiproperty.in.th/

### See a raw json response from API at http://react.thaiproperty.in.th/api/projects/withAvgPrice

---

### What you should look into this repo?

* 'React App' in '/ClientApp/src/' folder
* 'Testing for React App' in '/ClientApp/src/tests/' folder
* 'Backend Api Controller as C#.NET' in '/Controllers/' folder

---

### API Url configuration location

In development: http://localhost:5000/api/

In production: http://react.thaiproperty.in.th/api

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

---

## How to deploy to production server.

To deploy with windows IIS

* Run "dotnet publish --configuration Release --runtime win10-x64 --verbosity normal"
