/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '7b030e3c8b810f38043c4d9a6d3d5ab2';
const zipCode = document.getElementById('zip');
const feelings= document.querySelector('#feelings');
const country = document.getElementById("country");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

//get request To API
const getData= async(baseUrl,zipcode,APIKey)=>{
    const request= await fetch(baseUrl+zipcode+','+country.value+'&apikey='+APIKey);
    try{
        const data=await request.json();
        return data;
    }
    catch(error){
        console.log("error ",error);
    }
};

//add event listener to generate
document.querySelector('#generate').addEventListener('click',function(event){
    getData(baseUrl,zipCode.value,APIKey)
    .then(function(data){
        postData('/data/new',{temperature:data.main.temp, date:newDate,userInput:feelings.value});
    })
    .then(function(){
        updateUI()
    })
});

//post Data to my server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),     
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//updating UI of the website
const updateUI= async () =>{
    const request=await fetch('/data');
    try{
        const data= await request.json();
        document.querySelector('#date').innerHTML='Date : '+data.date;
        document.querySelector('#temp').innerHTML='Temperature : '+data.temperature+' K';
        document.querySelector('#content').innerHTML='Mood : '+data.userInput;
    }catch(error){
        console.log("error ",error);
    }

};