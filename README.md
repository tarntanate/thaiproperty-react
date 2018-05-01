## FOR TESTING AND DEMO OF REACT + .NET CORE ONLY!!

### THIS REPOS DOES NOT ALLOW TO REPRODUCE AND PLEASE USE WITH CONFIDENTIALLY!!

### This application demonstrate of listing condominium projects on a Google Map (as Marker & MarkerClusterer). User allow to filter the price based on average price/sqm. via slider or filter by project name with a "**real-time**" re-rendering on a map.

Note: Filter only either criteria only, cannot combine search critera for easy user usage.

Note2: Performance may be drop on slow machine with a lot of markers (eg. more than 200 projects list on a map).

---

### API Url configuration location

http://localhost:5000/api/***

or via https with port 5001

https://localhost:5001/api/***

---

### Project structure

Client-side (React App and also node_modules) located inside 'ClientApp' folder.

---

### To run project (in development)

You can run both server and client app together with just '**dotnet run**' or '**dotnet watch run**'

OR run server and client seperately by

* First run '**dotnet run**' to serve backend api
* Then go inside folder 'ClientApp' and run '**npm start**'

---

### For client-side (React) testing

Go into 'ClientApp' folder and run '**npm test**'.
