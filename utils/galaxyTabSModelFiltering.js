const s6 = ['s6', 's 6']

const s7 = ['s7', 's 7']

const s8 = ['s8', 's 8']

const s9 = ['s9', 's 9']

const plus = ['플러스', 'plus', '+']

const ultra = ['울트라', 'ultra']

const fe = ['fe']

const lite = ['lite', '라이트']




const galaxyTabS6Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = s6.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Tab S6'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const galaxyTabS7Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = s7.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Tab S7'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const galaxyTabS8Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = s8.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Tab S8'
        }
        return shouldInclude;
    })
    return filteredProducts;
}

const galaxyTabS9Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = s9.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = 'Galaxy Tab S9'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const feFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = fe.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' FE'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const liteFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = lite.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Lite'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const plusFiltering = function (data) {
    const filterFe = data.filter(item => {
        const shouldExclude = fe.some(keyword => 
            item.title.includes(keyword)
        )
        return !shouldExclude
    })
    const filteredProducts = filterFe.filter(item => {
        const shouldInclude = plus.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Plus'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const fePlusFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = fe.some(keyword => 
            item.title.includes(keyword)
        )
        return shouldInclude;
    });
    const filterPlus = filteredProducts.filter(item => {
        const shouldInclude = plus.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' FE Plus'
        }
        return shouldInclude;
    })
    return filterPlus;
}


const ultraFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = ultra.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Ultra'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const normalFiltering = function (data) {
    const filterFe = data.filter(item => {
        const shouldExclude = fe.some(keyword => 
            item.title.includes(keyword)
        )
        return !shouldExclude;
    })
    const filterLite = filterFe.filter(item => {
        const shouldExclude = lite.some(keyword => 
            item.title.includes(keyword)
        )
        return !shouldExclude;
    })
    const filterPlus = filterLite.filter(item => {
        const shouldExclude = plus.some(keyword => 
            item.title.includes(keyword)
        )
        return !shouldExclude;
    })
    const filterUltra = filterPlus.filter(item => {
        const shouldExclude = ultra.some(keyword => 
            item.title.includes(keyword)
        )
        return !shouldExclude;
    })
    return filterUltra;
}



exports.galaxyTabS6Filtering = function (data) {
    const galaxyTabS6List = galaxyTabS6Filtering(data);

    const galaxyTabS6LiteList = liteFiltering(galaxyTabS6List);
    const galaxyTabS6NormalList = normalFiltering(galaxyTabS6List);

    const filteredList = [];

    const combinedList = filteredList.concat(
        galaxyTabS6LiteList, galaxyTabS6NormalList
    )
    const dataList = combinedList.filter(item => item !== null)

    return dataList;
}


exports.galaxyTabS7Filtering = function (data) {
    const galaxyTabS7List = galaxyTabS7Filtering(data);

    const galaxyTabS7PlusList = plusFiltering(galaxyTabS7List);
    const galaxyTabS7FeList = feFiltering(galaxyTabS7List);
    const galaxyTabS7NormalList = normalFiltering(galaxyTabS7List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        galaxyTabS7PlusList, galaxyTabS7FeList, galaxyTabS7NormalList
    )
    const dataList = combinedList.filter(item => item !== null)

    return dataList;
}


exports.galaxyTabS8Filtering = function (data) {
    const galaxyTabS8List = galaxyTabS8Filtering(data);

    const galaxyS8UltraList = ultraFiltering(galaxyTabS8List);
    const galaxyS8PlusList = plusFiltering(galaxyTabS8List);
    const galaxyS8NormalList = normalFiltering(galaxyTabS8List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        galaxyS8UltraList, galaxyS8PlusList, galaxyS8NormalList
    )
    const dataList = combinedList.filter(item => item !== null)

    return dataList;
}


exports.galaxyTabS9Filtering = function (data) {
    const galaxyTabS9List = galaxyTabS9Filtering(data);

    const glaxyS9UltraList = ultraFiltering(galaxyTabS9List);
    const glaxyS9PlusList = plusFiltering(galaxyTabS9List);
    const galaxyS9feList = feFiltering(galaxyTabS9List);
    const galaxyS9FePlusList = fePlusFiltering(galaxyTabS9List);
    const galaxyS9NormalList = normalFiltering(galaxyTabS9List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        glaxyS9UltraList, glaxyS9PlusList, galaxyS9feList, galaxyS9FePlusList, galaxyS9NormalList
    )
    const dataList = combinedList.filter(item => item !== null)

    return dataList;
}