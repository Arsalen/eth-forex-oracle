mapper = (data) => {
    
    let objects = [];

    if(!data)
        throw("No data");

    let keys = Object.keys(data);

    keys.map(key => {

        let value = data[key];

        objects.push({
            [key]: value
        })
    })

    return objects;
}


module.exports = {
    mapper
}