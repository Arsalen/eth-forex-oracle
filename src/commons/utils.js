mapper = (data) => {
    
    let objects = [];
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