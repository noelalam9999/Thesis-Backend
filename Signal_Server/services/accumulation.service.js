const { newAccumulations, getLastAccumulation, updateAccumulation, updateAccumulationTime, getAccumulationTime } = require("../model/accumulation.model");
const { getAllDevicesRuid } = require("../model/devices.model");
const {getSignalsByTimeBrackets, getLastSignal} = require("../model/signal.model");
const _ = require('lodash');
const Distance = require('geo-distance');

async function formAccumulations(){
    // console.log(await getLastAccumulation())
  console.log("data accumulation started")
    try{
      const lastAccumulatedValue = await getLastAccumulation();   
      const lastSignal = await getLastSignal();  
      const deviceRuids = await getAllDevicesRuid();
      const signalsByTimeBrackets = await getSignalsByTimeBrackets([lastAccumulatedValue[0].time, lastSignal[0].time], deviceRuids);
      const accumulatedData = await accumulateData(signalsByTimeBrackets[0].categorizedByDeviceRUid); 
      await updateAccumulationTime(lastSignal[0].time);
      return accumulatedData
    }
    catch(e){
      console.log(e);
    }
}

async function accumulateData(devicesData){

let accData = [];
    try{
        devicesData.forEach(async (device)=>{
            let totalTime = ( new Date(device.times[device.times.length-1]) - new Date(device.times[0]) )/(1000 * 60 * 60); // calculate travel time in hours
            let totalDistance = device.coordinates.length > 1 ? findTotalDistance(device.coordinates) : 0;
            let totalHorns = Number(_.countBy(device.horns)["1"]);
            let updatedAccumulation = await updateAccumulation({
                  deviceRUid : device._id,
                  totalTime,
                  totalDistance,
                  totalHorns
              })
              accData.push(updatedAccumulation)
            
        });
        return accData
    }
    catch(e){
      console.log(e)
    }

return accData;
}

function findTotalDistance(arrayOfCoordinates){
    let totalDistance = 0;
    for (let i = 1; i < arrayOfCoordinates.length ; i++){
        totalDistance = totalDistance + Distance.between(
          {
            lat : arrayOfCoordinates[i].split(':')[0],
            long : arrayOfCoordinates[i].split(':')[1]
          },
          {
            lat : arrayOfCoordinates[i-1].split(':')[0],
            long : arrayOfCoordinates[i-1].split(':')[1]
          }
         );  
      };
    return totalDistance;
}
module.exports = {formAccumulations}