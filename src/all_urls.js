import { tagMappings } from "./utilities/constants";


// URL Object = {
//  tag1: {searchStations(tag1)},
//  tag2: {searchStations(tag2)}
//}
//store 


const get_URLS =() => { 


    const tags = Object.keys(tagMappings)

}


const waiting_stations = (
    await api.searchStations({
      tag: tags,
      limit: 50,
      offset: 0, // this is the default - can be omited
    })
)