/* Global Variables */
//personal API Key for weathermap Api,And I Used Metric To Get Celsius Temperature
const apiKey = "&appid=e819ee42fabd0a898e7fb1f20c4ee023&units=metric";

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate)

    /* Function called by event listener 
 Event listener to add function to existing HTML DOM element
 When User Click The Input That Called(generate) I Will The Value That He Add Then I Sending It To Api*/
document.getElementById('generate').addEventListener('click', () => {
        const zipCode = document.getElementById("zip").value;
        const feelings = document.getElementById("feelings").value;
        //Weather Site(URL) To Get Information Through(APIKEY).
        const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
        
// here When External API Send Request To Client And convert Data To(Json)To make it easier to read
// Then I send Him Request Data Throug(Post) Through URL  
getweatherData(baseURL,zipCode,apiKey).then((data) => {
            console.log(data)
           postData('/storData', {
            date: newDate,
            temp: `${data}`,
            content: feelings,
          }).then(() => updateUI());
        })
    
});

/* Function to GET Web API Data 
There I Will Send Request To The External API.
And I Used (try   catch , Because If the promise is fulfilled, But If No It Send For Me Massege In My Console*/
const getweatherData = async (baseURL,zipCode,apiKey)=>{
    try {
        const res = await fetch(`${baseURL}${zipCode}${apiKey}`)
        const Data = await res.json();
        const temp = (Math.ceil(Data.main.temp));
         return temp 
    }  catch(error) {
      console.log("error Is", error);
      // appropriately handle the error
    }
  //I am checking if the data has been preserved or not.  
    const getResulte = await fetch('/getData')
    const finallData = await getResulte.json();
    console.log(finallData);
  }

// /* Function to POST data */
const postData = async (url='', data= {})=>{
    const response = await fetch(url, {// Fetch The Default Value Is Get , So I Used Method To Know Him I used POST 
    method: 'POST',  
    headers: {
        'Content-Type': 'application/json',//In This I Specify Type Data That I sended The Server.
    },
    body: JSON.stringify(data),
        
      // body data type must match "Content-Type" header 
            
  });
} 
// Function To get Project Data Through Variable (updateUI)
// I Write updated data to DOM elements Throug(URL=>(get)).
const updateUI = async () =>{
    const respons = await fetch('/getData');
    try{
        const allData = await respons.json();
         document.getElementById('date').innerHTML = allData.date;
         document.getElementById('temp').innerHTML = allData.temp;
         document.getElementById('content').innerHTML = allData.content;
     console.log(allData);
     console.log(allData.temp);
       }catch(error){
           console.log("Error Is", error)
      }
}
