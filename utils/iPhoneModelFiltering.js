const iPhone11 = ['아이폰 11', '아이폰11']

const iPhone12 = ['아이폰 12', '아이폰12']

const iPhone13 = ['아이폰 13', '아이폰13']

const iPhone14 = ['아이폰 14', '아이폰14']

const iPhone15 = ['아이폰 15', '아이폰15']

const iPhoneSE1 = ['아이폰se1', '아이폰se 1', '아이폰 se1', '아이폰 se 1']

const iPhoneSE2 = ['아이폰se2', '아이폰se 2', '아이폰 se2', '아이폰 se 2']

const iPhoneSE3 = ['아이폰se3', '아이폰se 3', '아이폰 se3', '아이폰 se 3']

const mini = [ 'mini', 'MINI', 'Mini', '미니' ]

const pro = [ 'pro', 'PRO', '프로' ]

const max = [ 'max', 'MAX', '맥스' ]

const plus = [ 'plus', 'PLUS', '플러스' ]






//모델 넘버링 필터링
//모델 넘버링 필터링

const iPhoneSE1Filtering = (data) => {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhoneSE1.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone SE 1'
        }
        return shouldInclude;
    });
    return filteredProducts
}

const iPhoneSE2Filtering = (data) => {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhoneSE2.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone SE 2'
        }
        return shouldInclude;
    });
    return filteredProducts
}


const iPhoneSE3Filtering = (data) => {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhoneSE3.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone SE 3'
        }
        return shouldInclude;
    });
    return filteredProducts
}



const iPhone11Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone11.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone 11'
        }
        return shouldInclude;
    });
    return filteredProducts
}



const iPhone12Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone12.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone 12'
        }
        return shouldInclude;
    });
    return filteredProducts
}



const iPhone13Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone13.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone 13'
        }
        return shouldInclude;
    });
    return filteredProducts
}



const iPhone14Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone14.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone 14'
        }
        return shouldInclude;
    });
    return filteredProducts
}



const iPhone15Filtering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = iPhone15.some(keyword => 
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = 'Apple iPhone 15'
        }
        return shouldInclude;
    });
    return filteredProducts
}






//맥스 필터링
const maxFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = max.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Pro Max'
        }
        return shouldInclude;
    });
    return filteredProducts;
}



//프로 필터링
const proFiltering = function (data) {

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
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Pro'
        }
        return shouldInclude;
    });
    return filteredProducts;
}



//플러스 필터링
const plusFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = plus.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Plus'
        }
        return shouldInclude;
    });
    return filteredProducts;
}



//미니 필터링
const miniFiltering = function (data) {
    const filteredProducts = data.filter(item => {
        const shouldInclude = mini.some(keyword =>
            item.title.includes(keyword)
        );
        if(shouldInclude === true) {
            item.assetName = item.assetName + ' Mini'
        }
        return shouldInclude;
    });
    return filteredProducts;
}


//노멀 필터링
const normalFiltering = function (data) {
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



exports.iPhoneSEFiltering = function (data) {
    const iPhoneSE1List = iPhoneSE1Filtering(data);
    const iPhoneSE2List = iPhoneSE2Filtering(data);
    const iPhoneSE3List = iPhoneSE3Filtering(data);

    const filteredList = [];
    const combinedList = filteredList.concat(
        iPhoneSE1List, iPhoneSE2List, iPhoneSE3List
    );
    const dataList = combinedList.filter(item => item !== null);
    return dataList;
}


exports.iPhone11Filtering = function (data) {
    const iPhone11List = iPhone11Filtering(data);
    const iPhone11MaxList = maxFiltering(iPhone11List);
    const iPhone11ProList = proFiltering(iPhone11List);
    const iPhone11NormalList = normalFiltering(iPhone11List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        iPhone11MaxList, iPhone11ProList, iPhone11NormalList
    );
    const dataList = combinedList.filter(item => item !== null);
    return dataList;
}


exports.iPhone12Filtering = function (data) {
    const iPhone12List = iPhone12Filtering(data);
    const iPhone12MaxList = maxFiltering(iPhone12List);
    const iPhone12ProList = proFiltering(iPhone12List);
    const iPhone12MiniList = miniFiltering(iPhone12List);
    const iPhone12NormalList = normalFiltering(iPhone12List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        iPhone12MaxList, iPhone12ProList, iPhone12MiniList, iPhone12NormalList
    );
    const dataList = combinedList.filter(item => item !== null);
    return dataList;
}


exports.iPhone13Filtering = function (data) {
    const iPhone13List = iPhone13Filtering(data);
    const iPhone13MaxList = maxFiltering(iPhone13List);
    const iPhone13ProList = proFiltering(iPhone13List);
    const iPhone13MiniList = miniFiltering(iPhone13List);
    const iPhone13NormalList = normalFiltering(iPhone13List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        iPhone13MaxList, iPhone13ProList, iPhone13MiniList, iPhone13NormalList
    );
    const dataList = combinedList.filter(item => item !== null);
    return dataList;
}


exports.iPhone14Filtering = function (data) {
    const iPhone14List = iPhone14Filtering(data);
    const iPhone14MaxList = maxFiltering(iPhone14List);
    const iPhone14ProList = proFiltering(iPhone14List);
    const iPhone14PlusList = plusFiltering(iPhone14List);
    const iPhone14NormalList = normalFiltering(iPhone14List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        iPhone14MaxList, iPhone14ProList, iPhone14PlusList, iPhone14NormalList
    );
    const dataList = combinedList.filter(item => item !== null);
    return dataList;
}


exports.iPhone15Filtering = function (data) {
    const iPhone15List = iPhone15Filtering(data);
    const iPhone15MaxList = maxFiltering(iPhone15List);
    const iPhone15ProList = proFiltering(iPhone15List);
    const iPhone15PlusList = plusFiltering(iPhone15List);
    const iPhone15NormalList = normalFiltering(iPhone15List);

    const filteredList = [];
    const combinedList = filteredList.concat(
        iPhone15MaxList, iPhone15ProList, iPhone15PlusList, iPhone15NormalList
    );
    const dataList = combinedList.filter(item => item !== null);
    return dataList;
}