const iPhone11 = ['아이폰 11', '아이폰11']

const iPhone12 = ['아이폰 12', '아이폰12']

const iPhone13 = ['아이폰 13', '아이폰13']

const iPhone14 = ['아이폰 14', '아이폰14']

const iPhone15 = ['아이폰 15', '아이폰15']

const iPhoneSE = ['아이폰 SE', '아이폰SE', '아이폰 se', '아이폰se']

const mini = [ 'mini', 'MINI', 'Mini', '미니' ]

const pro = [ 'pro', 'PRO', '프로' ]

const max = [ 'max', 'MAX', '맥스' ]

const plus = [ 'plus', 'PLUS', '플러스' ]





//모델 넘버링 필터링
//모델 넘버링 필터링

exports.iPhoneSEFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhoneSE.some(keyword => 
            item.title.toLowerCase().includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts
}



exports.iPhone11Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone11.some(keyword => 
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts
}



exports.iPhone12Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone12.some(keyword => 
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts
}



exports.iPhone13Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone13.some(keyword => 
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts
}



exports.iPhone14Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone14.some(keyword => 
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts
}



exports.iPhone15Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone15.some(keyword => 
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts
}






//맥스 필터링
exports.maxFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = max.some(keyword =>
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts;
}



//프로 필터링
exports.proFiltering = function (data) {

    const filterMax = data.filter(item => {
        const shouldExclude = max.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });

    const filteredProducts = filterMax.filter(item => {
        const shouldInclude = pro.some(keyword =>
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts;
}



//플러스 필터링
exports.plusFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = plus.some(keyword =>
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts;
}



//미니 필터링
exports.miniFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = mini.some(keyword =>
            item.title.includes(keyword)
        );
        return shouldInclude;
    });
    return filteredProducts;
}


//노멀 필터링
exports.normalFiltering = function (data) {
    const maxFiltering = data.filter(item => {
        const shouldExclude = max.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const proFiltering = maxFiltering.filter(item => {
        const shouldExclude = pro.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    const miniFiltering = proFiltering.filter(item => {
        const shouldExclude = mini.some(keyword => 
            item.title.includes(keyword)
        );
        return !shouldExclude;
    });
    return miniFiltering;
}
