
var CMUDict = require('../lib/cmudict').CMUDict;

var c = new CMUDict();
var phoneme_str = c.get('china');
let _data = "welcome to china wel"
let interval_info = ''
_data.split(" ").forEach((val,ind)=>{
    interval_info = c.get(val) ? c.get(val).replace(/[0-9]+/g,'') : undefined
    console.log(ind+1,interval_info)
})
