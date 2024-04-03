const galaxyS20 = ['갤럭시s20', '갤럭시 s20']

const galaxyS21 = ['갤럭시s21', '갤럭시 s21']

const galaxyS22 = ['갤럭시s22', '갤럭시 s22']

const galaxyS23 = ['갤럭시s23', '갤럭시 s23']

const galaxyS24 = ['갤럭시s24', '갤럭시 s24']

const ultra = ['울트라', 'ultra']

const plus = ['플러스', 'plus', '+']

const fe = ['fe']




//모델별 필터링
//모델별 필터링
const galaxyS20Filtering =  function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyS20.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = '갤럭시 S20'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const galaxyS21Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyS21.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = '갤럭시 S21'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


const galaxyS22Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyS22.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = '갤럭시 S22'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const galaxyS23Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyS23.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = '갤럭시 S23'
        }
        return shouldInclude;
    })
    return filteredProducts;
}


const galaxyS24Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = galaxyS24.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = '갤럭시 S24'
        }
        return shouldInclude;
    })
    return filteredProducts;
}





//울트라 필터링
//울트라 필터링
const ultraFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = ultra.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' 울트라'
        }
        return shouldInclude;
    })
    return filteredProducts
}



//플러스 필터링
//플러스 필터링
const plusFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = plus.some(keyword => 
            item.title.includes(keyword)
        )
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' 플러스'
        }
        return shouldInclude;
    })
    return filteredProducts;
}



//FE 필터링
//FE 필터링
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



const normalFiltering = function (data) {
    const filterMax = data.filter(item => {
        const shouldExclude = ultra.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    })
    const filterPlus = filterMax.filter(item => {
        const shouldExclude = plus.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    })
    const filterFe = filterPlus.filter(item => {
        const shouldExclude = fe.some(keyword =>
            item.title.includes(keyword)
        );
        return !shouldExclude;
    })

    return filterFe;

}



exports.galaxyS20Filtering = function (data) {

    const galaxyS20List = galaxyS20Filtering(data);
    const galaxyS20feList = feFiltering(galaxyS20List);
    const galaxyS20PlusList = plusFiltering(galaxyS20List);
    const galaxyS20UltraList = ultraFiltering(galaxyS20List);

    const list = [
        galaxyS20feList, galaxyS20PlusList, galaxyS20UltraList
    ]

    return list;

}

exports.galaxyS21Filtering = function (data) {

    const galaxyS21List = galaxyS21Filtering(data);
    const galaxyS21PlusList = plusFiltering(galaxyS21List);
    const galaxyS21UltraList = ultraFiltering(galaxyS21List);
    const galaxyS21NormalList = normalFiltering(galaxyS21List);

    const list = [
        galaxyS21PlusList, galaxyS21UltraList, galaxyS21NormalList
    ]

    return list

}

exports.galaxyS22Filtering = function (data) {

    const galaxyS22List = galaxyS22Filtering(data);
    const galaxyS22PlusList = plusFiltering(galaxyS22List);
    const galaxyS22UltraList = ultraFiltering(galaxyS22List);
    const galaxyS22NormalList = normalFiltering(galaxyS22List);

    const list = [
        galaxyS22PlusList, galaxyS22UltraList, galaxyS22NormalList
    ]

    return list;

}

exports.galaxyS23Filtering = function (data) {

    const galaxyS23List = galaxyS23Filtering(data);
    const galaxyS23PlusList = plusFiltering(galaxyS23List);
    const galaxyS23UltraList = ultraFiltering(galaxyS23List);

    const list = [
        galaxyS23PlusList, galaxyS23UltraList
    ]

    return list;

}

exports.galaxyS24Filtering = function (data) {

    const galaxyS24List = galaxyS24Filtering(data);
    const galaxyS24PlusList = plusFiltering(galaxyS24List);
    const galaxyS24UltraList = ultraFiltering(galaxyS24List);

    const list = [
        galaxyS24PlusList, galaxyS24UltraList
    ]

    return list;

}