/*
http://gbfs.citibikenyc.com/gbfs/gbfs.json
https://gbfs.citibikenyc.com/gbfs/es/station_information.json
https://gbfs.citibikenyc.com/gbfs/es/station_status.json
*/

const stationInfoURL = 'https://gbfs.citibikenyc.com/gbfs/es/station_information.json'
const stationStatusURL = 'https://gbfs.citibikenyc.com/gbfs/es/station_status.json'
let weatherURL = "http:/api.weatherunlocked.com/api/forecast/${coordinates}?app_id=4587f2bb&app_key=2f013f171ccece5da55f4ab5076898ad"
let stationData = []

fetch(stationInfoURL).then(response => {
  return response.json();
}).then(stationInfoRawData => {

  const stationInfoArray = stationInfoRawData.data.stations

  for (stationInfoCounter = 0; stationInfoCounter < stationInfoArray.length; stationInfoCounter++ ){
  stationData.push({"station_id": stationInfoArray[stationInfoCounter].station_id});
  stationData[stationInfoCounter].name = stationInfoArray[stationInfoCounter].name
  stationData[stationInfoCounter].stationCoords = stationInfoArray[stationInfoCounter].lat + "," + stationInfoArray[stationInfoCounter].lon
  
  };
  
  //makes a second api call from the same source for additional information about the station
  pullStationInfo()
  
  
}).catch(err => {
    alert('Error at station information fetch')
});


function pullStationInfo () {
  fetch(stationStatusURL).then(response => {
    return response.json();
  }).then(stationStatusRawData => {
    
    const stationStatusArray = stationStatusRawData.data.stations

    stationStatusArray.forEach(function matchAndAdd(station){
      for (stationEntryCounter = 0; stationEntryCounter < stationData.length; stationEntryCounter++){
        if (station.station_id == stationData[stationEntryCounter].station_id) {
          stationData[stationEntryCounter].num_docks_available = station.num_docks_available
          stationData[stationEntryCounter].num_bikes_available = station.num_bikes_available
          
        }
      }
    })
    
    addStationsToTable()
    
  }).catch(err => {
      alert('Error at station status fetch')
  });
}


function addStationsToTable(){
  
  document.getElementById("stationBody").insertRow(1)

  let refrenceTableElement = document.getElementById("stationBody")
  let currentTableElement = null
  let currentStation = null
  
  for (addStationCounter = 1; addStationCounter < stationData.length; addStationCounter++){
    
    currentStation = stationData[addStationCounter]
    
    currentTableElement = refrenceTableElement.insertRow(addStationCounter)
    currentTableElement.id = currentStation.stationCoords
    currentTableElement.insertCell(0).innerHTML = currentStation.name
    currentTableElement.insertCell(1).innerHTML = currentStation.num_bikes_available
    currentTableElement.insertCell(2).innerHTML = currentStation.num_docks_available
    
  }
}

function pullCurrentWeather(station){
  
  
  fetch(weatherURL).then(response => {
    return response.json();
  }).then(weatherURLRawData => {
  
  
    
  }).catch(err => {
      alert('Error at station information fetch')
  });
}
