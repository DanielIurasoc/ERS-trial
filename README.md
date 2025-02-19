## Hi, I'm Daniel, a wannabe React Native developer.

I started this app as a side project for helping a family member with his employees time & money tracking, and it's been in active use for about 3 months now.

The purpose of this app is to let an administrator manage his employees (add or delete employees), and to track the worked hours for each one in a simple and intuitive way. Below I've inserted a few screenshots from the app, do keep in mind that it is still under development and the design is not yet perfected.

| The loading screen with a company logo as splash art | Main screen, where the user can see all to-date clocking entries, and filter them for ease of use |
| :---: | :---: |
| <img alt="Loading screen with a company logo as splash art" src="https://github.com/user-attachments/assets/cb7235c9-ee4b-4eb3-9334-b37e8cf504ec" width="300" height="650"> | <img src="https://github.com/user-attachments/assets/f1895c04-328f-4aba-a16a-cd27c604a8d0" width="300" height="650"> |
|  <b>Clocking details screen</b> | <b>Edit clocking details or delete entry</b> |
| <img src="https://github.com/user-attachments/assets/acc07e71-8c2e-4d2c-990e-2a51f63d69bc" width="300" height="650"> | <img src="https://github.com/user-attachments/assets/e480c0b6-9c8e-4d08-b2bb-21c43763415f" width="300" height="650"> |
| <b> Add new clocking screen </b> | <b> Manage employees and generate Excel report </b> |
| <img src="https://github.com/user-attachments/assets/42efae68-f4cb-49c2-811d-93a8f7f9741b" width="300" height="650"> | <img src="https://github.com/user-attachments/assets/b3684bd8-82a0-447c-8446-fd4305975f61" width="300" height="650"> |


The data is compiled automatically into an excel spreadsheet by pressing the "Generate Excel File button" and the user will be prompted to choose where to save it.<br/>
The report will first list all available entries without any processing:<br/>
![image](https://github.com/user-attachments/assets/3ddb0147-4a13-4266-9d32-e60edaf4a1ac)<br/>
Then, for each employee a separate sheet will be created with his corresponding entries and a total row with formulas that calculate all worked hours and advance payments received:<br/>
![image](https://github.com/user-attachments/assets/9c2e3568-3635-4fdf-b364-3f2b8c31cfd7)

The generated excel file: [clockings_report.xlsx](https://github.com/user-attachments/files/18874967/clockings_report.xlsx)

