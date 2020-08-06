mapper = (data) => {
    
    let objects = [];

    if(!data)
        throw("Something went wrong, probably your free request volume has been reached, otherwise please contact support.");

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